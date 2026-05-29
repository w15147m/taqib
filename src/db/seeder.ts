import { db } from "./client";
import { categories, contents, content_items, content_item_translations, content_item_explanations } from "./schema";
import { contentList } from "../utils/contentData";

const categoryMapping: Record<string, { title_ur: string; title_en: string }> = {
  prayers: { title_ur: 'تعقیباتِ نماز', title_en: 'Taqeebat' },
  surahs: { title_ur: 'سورتیں', title_en: 'Surahs' },
  supplications: { title_ur: 'دعائیں اور مناجات', title_en: 'Supplications' },
  ziyarat: { title_ur: 'زیارات', title_en: 'Ziyarat' },
  namaz: { title_ur: 'نمازیں', title_en: 'Namaz' },
};

const contentEnglishTitles: Record<string, string> = {
  ayat_al_kursi: 'Ayat al-Kursi',
  surah_al_kafirun: 'Surah Al-Kafirun',
  surah_al_ikhlas: 'Surah Al-Ikhlas',
  surah_al_falaq: 'Surah Al-Falaq',
  surah_an_nas: 'Surah An-Nas',
  surah_al_jumuah: 'Surah Al-Jumuah',
  surah_al_munafiqun: 'Surah Al-Munafiqun',
  surah_al_qadr: 'Surah Al-Qadr',
  dua_fajr: 'Dua after Fajr Prayer',
  dua_dhuhr: 'Dua after Dhuhr Prayer',
  dua_asr: 'Dua after Asr Prayer',
  dua_maghrib: 'Dua after Maghrib Prayer',
  dua_isha: 'Dua after Isha Prayer',
  namaz_ghafilah: 'Namaz-e-Ghafilah',
  namaz_tahajjud: 'Namaz-e-Tahajjud',
  namaz_wahshat: 'Namaz-e-Wahshat',
  namaz_ayat: 'Namaz-e-Ayat',
  namaz_janazah: 'Namaz-e-Janazah',
  dua_ahd: 'Dua-e-Ahd',
  munajat_imam_ali: 'Munajat of Imam Ali (as)',
  dua_tassul_imam_zamana: 'Dua-e-Salamati Imam Zamana (aj)',
  dua_ramadan: 'Dua of Month of Ramadan',
  dua_wahdat: 'Dua-e-Wahdat',
  dua_mutalia: 'Dua-e-Mutalia',
  ziyarat_rasool: 'Ziyarat of Holy Prophet (saw)',
  ziyarat_imam_hussain: 'Ziyarat of Imam Hussain (as)',
  ziyarat_imam_reza: 'Ziyarat of Imam Reza (as)',
  ziyarat_imam_mahdi: 'Ziyarat of Imam Mahdi (aj)',
};

export const seedDatabase = async () => {
  try {
    // 1. Check if categories already exist
    const existingCats = await db.select().from(categories);
    if (existingCats.length > 0) {
      console.log("Database already seeded");
      return;
    }

    console.log("Seeding database...");

    // 2. Insert Categories
    for (const [catId, info] of Object.entries(categoryMapping)) {
      await db.insert(categories).values({
        id: catId,
        title_ur: info.title_ur,
        title_en: info.title_en,
      });
    }

    // 3. Insert Contents and child items
    for (const item of contentList) {
      const catId = item.category || 'namaz';
      const englishTitle = contentEnglishTitles[item.id] || item.title;

      await db.insert(contents).values({
        id: item.id,
        category_id: catId,
        title_ur: item.title,
        title_en: englishTitle,
        is_downloaded: 1, // Seeding local packaged files
      });

      // Parse text into items & explanations
      const rawText = item.text || '';
      const lines = rawText.split('\n');
      
      interface ParsedItem {
        arabic_text: string;
        beforeExplanations: string[];
        afterExplanations: string[];
      }
      
      const parsedItems: ParsedItem[] = [];
      let currentBefore: string[] = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const isExplanation = trimmed.startsWith('*(') && trimmed.endsWith(')*');
        if (isExplanation) {
          const clean = trimmed.replace(/[*()]/g, '').trim();
          currentBefore.push(clean);
        } else {
          parsedItems.push({
            arabic_text: trimmed,
            beforeExplanations: [...currentBefore],
            afterExplanations: [],
          });
          currentBefore = [];
        }
      }

      if (currentBefore.length > 0) {
        if (parsedItems.length > 0) {
          parsedItems[parsedItems.length - 1].afterExplanations.push(...currentBefore);
        } else {
          // Explanations only
          parsedItems.push({
            arabic_text: '',
            beforeExplanations: [...currentBefore],
            afterExplanations: [],
          });
        }
      }

      // Insert parsed items and their explanations
      let sequenceNum = 1;
      for (const pItem of parsedItems) {
        const insertedItem = await db.insert(content_items).values({
          content_id: item.id,
          sequence_number: sequenceNum++,
          arabic_text: pItem.arabic_text,
        }).returning({ id: content_items.id });

        const itemId = insertedItem[0].id;

        // Insert before explanations
        let beforeSeq = 1;
        for (const exp of pItem.beforeExplanations) {
          await db.insert(content_item_explanations).values({
            item_id: itemId,
            explanation_text: exp,
            language: 'ur',
            position: 'before',
            sequence_number: beforeSeq++,
          });
        }

        // Insert after explanations
        let afterSeq = 1;
        for (const exp of pItem.afterExplanations) {
          await db.insert(content_item_explanations).values({
            item_id: itemId,
            explanation_text: exp,
            language: 'ur',
            position: 'after',
            sequence_number: afterSeq++,
          });
        }
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
    throw error;
  }
};
