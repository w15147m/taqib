import { seedCategories } from "./categorySeeder";
import { seedContents } from "./contentSeeder";
import { db } from "../client";
import { content_items, content_item_explanations, content_item_translations } from "../schema";
import { eq, and } from "drizzle-orm";
import { seedAllFromGitHub } from "./githubSeeder";

// Namaz data — bundled locally, seeded immediately on first install
import { namazContentItems } from "./contentItems/contentItems/namaz";
import { namazExplanations } from "./contentItems/information/namaz";

export const seedEssentialData = async () => {
  try {
    // 1. Seed categories
    await seedCategories();

    // 2. Seed content metadata (supplications/ziyarat as is_downloaded=0, namaz as 1)
    await seedContents();

    // 3. Seed bundled namaz content items
    console.log("Seeding namaz content items...");
    for (const item of namazContentItems) {
      const existing = await db.select().from(content_items)
        .where(and(
          eq(content_items.content_id, item.content_id),
          eq(content_items.sequence_number, item.sequence_number),
        ));

      if (existing.length === 0) {
        await db.insert(content_items).values({
          content_id: item.content_id,
          sequence_number: item.sequence_number,
          arabic_text: item.arabic_text,
        });
      }
    }

    // 4. Seed bundled namaz explanations
    console.log("Seeding namaz explanations...");
    for (const exp of namazExplanations) {
      const matchedItems = await db.select().from(content_items)
        .where(and(
          eq(content_items.content_id, exp.content_id),
          eq(content_items.sequence_number, exp.sequence_number),
        ));

      if (matchedItems.length > 0) {
        const itemId = matchedItems[0].id;
        const existingExp = await db.select().from(content_item_explanations)
          .where(and(
            eq(content_item_explanations.item_id, itemId),
            eq(content_item_explanations.position, exp.position),
            eq(content_item_explanations.sequence_number, exp.sequence_number_exp),
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

    console.log("Essential database seeding completed successfully!");
  } catch (error) {
    console.error("Essential database seeding error:", error);
    throw error;
  }
};

export const seedBackgroundData = async () => {
  try {
    // Fetch and seed all content with is_downloaded = 0 from GitHub
    await seedAllFromGitHub();
  } catch (error) {
    console.error("Background database seeding error:", error);
    throw error;
  }
};
