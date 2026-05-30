import { db } from '../client';
import { contents, content_items, content_item_explanations, content_item_translations } from '../schema';
import { eq, and } from 'drizzle-orm';
import { githubContentUrls } from './githubUrls';

const fetchAndSeedContent = async (contentId: string): Promise<void> => {
  const url = githubContentUrls[contentId];
  if (!url) {
    console.warn(`No GitHub URL found for: ${contentId}`);
    return;
  }

  console.log(`Fetching: ${contentId}...`);
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Failed to fetch ${contentId}: ${response.status}`);
    return;
  }

  const data = await response.json();

  // 1. Seed content_items
  for (const item of data.content_items) {
    const existing = await db.select().from(content_items).where(
      and(
        eq(content_items.content_id, contentId),
        eq(content_items.sequence_number, item.sequence_number),
      ),
    );

    if (existing.length === 0) {
      await db.insert(content_items).values({
        content_id: contentId,
        sequence_number: item.sequence_number,
        arabic_text: item.arabic_text ?? '',
      });
    }
  }

  // 2. Seed explanations (keyed by sequence_number → db item id)
  if (data.content_item_explanations?.length > 0) {
    for (const exp of data.content_item_explanations) {
      const matchedItems = await db.select().from(content_items).where(
        and(
          eq(content_items.content_id, contentId),
          eq(content_items.sequence_number, exp.sequence_number),
        ),
      );

      if (matchedItems.length > 0) {
        const itemId = matchedItems[0].id;
        const existingExp = await db.select().from(content_item_explanations).where(
          and(
            eq(content_item_explanations.item_id, itemId),
            eq(content_item_explanations.position, exp.position),
            eq(content_item_explanations.sequence_number, exp.sequence_number_exp),
          ),
        );

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
  }

  // 3. Seed translations
  if (data.content_item_translations?.length > 0) {
    for (const trans of data.content_item_translations) {
      const matchedItems = await db.select().from(content_items).where(
        and(
          eq(content_items.content_id, contentId),
          eq(content_items.sequence_number, trans.sequence_number),
        ),
      );

      if (matchedItems.length > 0) {
        const itemId = matchedItems[0].id;
        const existingTrans = await db.select().from(content_item_translations).where(
          and(
            eq(content_item_translations.item_id, itemId),
            eq(content_item_translations.language, trans.language),
          ),
        );

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
  }

  // 4. Mark as downloaded
  await db.update(contents)
    .set({ is_downloaded: 1 })
    .where(eq(contents.id, contentId));

  console.log(`✅ Seeded: ${contentId}`);
};

export const seedAllFromGitHub = async (): Promise<void> => {
  try {
    const pendingContents = await db.select().from(contents)
      .where(eq(contents.is_downloaded, 0));

    if (pendingContents.length === 0) {
      console.log('All content already downloaded.');
      return;
    }

    console.log(`Seeding ${pendingContents.length} content(s) from GitHub...`);

    for (const content of pendingContents) {
      if (githubContentUrls[content.id]) {
        await fetchAndSeedContent(content.id);
      }
    }

    console.log('GitHub seeding completed successfully!');
  } catch (error) {
    console.error('GitHub seeding error:', error);
    throw error;
  }
};
