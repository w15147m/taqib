import { seedCategories } from "./categorySeeder";
import { seedContents } from "./contentSeeder";
import { db } from "../client";
import { content_items, content_item_explanations, content_item_translations } from "../schema";
import { eq, and } from "drizzle-orm";

// Imports for prayers
import { prayersContentItems } from "./contentItems/contentItems/prayers";
import { prayersExplanations } from "./contentItems/information/prayers";
import { prayersTranslations } from "./contentItems/translations/prayers";

// Imports for surahs
import { surahsContentItems } from "./contentItems/contentItems/surahs";
import { surahsExplanations } from "./contentItems/information/surahs";
import { surahsTranslations } from "./contentItems/translations/surahs";

// Imports for supplications
import { supplicationsContentItems } from "./contentItems/contentItems/supplications";
import { supplicationsExplanations } from "./contentItems/information/supplications";
import { supplicationsTranslations } from "./contentItems/translations/supplications";

// Imports for ziyarat
import { ziyaratContentItems } from "./contentItems/contentItems/ziyarat";
import { ziyaratExplanations } from "./contentItems/information/ziyarat";
import { ziyaratTranslations } from "./contentItems/translations/ziyarat";

// Imports for namaz
import { namazContentItems } from "./contentItems/contentItems/namaz";
import { namazExplanations } from "./contentItems/information/namaz";
import { namazTranslations } from "./contentItems/translations/namaz";

export const seedEssentialData = async () => {
  try {
    // 1. Seed categories
    await seedCategories();
    
    // 2. Seed content metadata
    await seedContents();

    // 3. Seed Content Items for prayers
    console.log("Seeding prayers content items...");
    for (const item of prayersContentItems) {
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
      const matchedItems = await db.select().from(content_items)
        .where(and(eq(content_items.content_id, exp.content_id), eq(content_items.sequence_number, exp.sequence_number)));
      
      if (matchedItems.length > 0) {
        const itemId = matchedItems[0].id;
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

    // 6. Seed Content Items for namaz
    console.log("Seeding namaz content items...");
    for (const item of namazContentItems) {
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

    // 7. Seed Explanations for namaz
    console.log("Seeding namaz explanations...");
    for (const exp of namazExplanations) {
      const matchedItems = await db.select().from(content_items)
        .where(and(eq(content_items.content_id, exp.content_id), eq(content_items.sequence_number, exp.sequence_number)));

      if (matchedItems.length > 0) {
        const itemId = matchedItems[0].id;
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

    // 8. Seed Translations for namaz
    console.log("Seeding namaz translations...");
    for (const trans of namazTranslations) {
      // Future-proofing
    }

    console.log("Essential database seeding completed successfully!");
  } catch (error) {
    console.error("Essential database seeding error:", error);
    throw error;
  }
};

export const seedBackgroundData = async () => {
  try {
    // 1. Seed Content Items for surahs
    console.log("Seeding surahs content items...");
    for (const item of surahsContentItems) {
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

    // 2. Seed Explanations for surahs
    console.log("Seeding surahs explanations...");
    for (const exp of surahsExplanations) {
      // Future-proofing
    }

    // 3. Seed Translations for surahs
    console.log("Seeding surahs translations...");
    for (const trans of surahsTranslations) {
      // Future-proofing
    }

    // 4. Seed Content Items for supplications
    console.log("Seeding supplications content items...");
    for (const item of supplicationsContentItems) {
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

    // 5. Seed Explanations for supplications
    console.log("Seeding supplications explanations...");
    for (const exp of supplicationsExplanations) {
      const matchedItems = await db.select().from(content_items)
        .where(and(eq(content_items.content_id, exp.content_id), eq(content_items.sequence_number, exp.sequence_number)));

      if (matchedItems.length > 0) {
        const itemId = matchedItems[0].id;
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

    // 6. Seed Translations for supplications
    console.log("Seeding supplications translations...");
    for (const trans of supplicationsTranslations) {
      const matchedItems = await db.select().from(content_items)
        .where(and(eq(content_items.content_id, trans.content_id), eq(content_items.sequence_number, trans.sequence_number)));
      
      if (matchedItems.length > 0) {
        const itemId = matchedItems[0].id;
        const existingTrans = await db.select().from(content_item_translations)
          .where(and(
            eq(content_item_translations.item_id, itemId),
            eq(content_item_translations.language, trans.language)
          ));

        if (existingTrans.length === 0) {
          await db.insert(content_item_translations).values({
            item_id: itemId,
            language: trans.language,
            translation_text: trans.translation_text,
            transliteration: trans.transliteration,
          });
        }
      }
    }

    // 7. Seed Content Items for ziyarat
    console.log("Seeding ziyarat content items...");
    for (const item of ziyaratContentItems) {
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

    // 8. Seed Explanations for ziyarat
    console.log("Seeding ziyarat explanations...");
    for (const exp of ziyaratExplanations) {
      const matchedItems = await db.select().from(content_items)
        .where(and(eq(content_items.content_id, exp.content_id), eq(content_items.sequence_number, exp.sequence_number)));

      if (matchedItems.length > 0) {
        const itemId = matchedItems[0].id;
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

    // 9. Seed Translations for ziyarat
    console.log("Seeding ziyarat translations...");
    for (const trans of ziyaratTranslations) {
      // Future-proofing
    }

    console.log("Background database seeding completed successfully!");
  } catch (error) {
    console.error("Background database seeding error:", error);
    throw error;
  }
};

