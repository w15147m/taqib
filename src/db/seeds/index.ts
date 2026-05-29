import { seedCategories } from "./categorySeeder";
import { seedContents } from "./contentSeeder";
import { db } from "../client";
import { content_items, content_item_explanations, content_item_translations } from "../schema";
import { eq, and } from "drizzle-orm";

// Imports for prayers
import { prayersContentItems } from "./contentItems/contentItems/prayers";
import { prayersExplanations } from "./contentItems/information/prayers";
import { prayersTranslations } from "./contentItems/translations/prayers";

export const seedDatabase = async () => {
  try {
    // 1. Seed categories
    await seedCategories();
    
    // 2. Seed content metadata
    await seedContents();

    // 3. Seed Content Items for prayers
    console.log("Seeding prayers content items...");
    for (const item of prayersContentItems) {
      // Check if already exists
      const existing = await db.select().from(content_items)
        .where(and(eq(content_items.content_id, item.content_id), eq(content_items.sequence_number, item.sequence_number)));
      
      if (existing.length === 0) {
        await db.insert(content_items).values({
          content_id: item.content_id,
          sequence_number: item.sequence_number,
          arabic_text: item.arabic_text,
        });
      }
    }

    // 4. Seed Content Item Explanations for prayers
    console.log("Seeding prayers explanations...");
    for (const exp of prayersExplanations) {
      // Find the corresponding content_item.id
      const matchedItems = await db.select().from(content_items)
        .where(and(eq(content_items.content_id, exp.content_id), eq(content_items.sequence_number, exp.sequence_number)));
      
      if (matchedItems.length > 0) {
        const itemId = matchedItems[0].id;
        // Check if explanation already exists
        const existingExp = await db.select().from(content_item_explanations)
          .where(and(
            eq(content_item_explanations.item_id, itemId),
            eq(content_item_explanations.position, exp.position),
            eq(content_item_explanations.sequence_number, exp.sequence_number_exp)
          ));

        if (existingExp.length === 0) {
          await db.insert(content_item_explanations).values({
            item_id: itemId,
            explanation_text: exp.explanation_text,
            language: 'ur',
            position: exp.position,
            sequence_number: exp.sequence_number_exp,
          });
        }
      }
    }

    // 5. Seed Translations for prayers
    console.log("Seeding prayers translations...");
    for (const trans of prayersTranslations) {
      // Future-proofing
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Orchestrator seeding error:", error);
    throw error;
  }
};
