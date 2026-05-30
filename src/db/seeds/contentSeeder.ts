import { db } from "../client";
import { contents } from "../schema";
import { eq } from "drizzle-orm";

// is_downloaded: 0 → fetched from GitHub on first install
// is_downloaded: 1 → bundled locally, available immediately
const contentList = [
  // Supplications — fetched from GitHub
  { id: 'dua_ahd', category_id: 'supplications', title_ur: 'دعائے عہد', title_en: 'Dua-e-Ahd', is_downloaded: 0 },
  { id: 'munajat_imam_ali', category_id: 'supplications', title_ur: 'مناجات امیر المؤمنینؑ', title_en: 'Munajat of Imam Ali (as)', is_downloaded: 0 },
  { id: 'dua_tassul_imam_zamana', category_id: 'supplications', title_ur: 'دعائے سلامتی امام زمانہؑ', title_en: 'Dua-e-Salamati Imam Zamana (aj)', is_downloaded: 0 },
  { id: 'dua_ramadan', category_id: 'supplications', title_ur: 'دعائے ماہِ رمضان', title_en: 'Dua of Month of Ramadan', is_downloaded: 0 },
  { id: 'dua_wahdat', category_id: 'supplications', title_ur: 'دعائے وحدت', title_en: 'Dua-e-Wahdat', is_downloaded: 0 },
  { id: 'dua_mutalia', category_id: 'supplications', title_ur: 'دعائے مطالعہ', title_en: 'Dua-e-Mutalia', is_downloaded: 0 },
  { id: 'dua_kumayl', category_id: 'supplications', title_ur: 'دعائے کمیل', title_en: 'Dua-e-Kumayl', is_downloaded: 0 },
  { id: 'dua_nudba', category_id: 'supplications', title_ur: 'دعائے ندبہ', title_en: 'Dua-e-Nudba', is_downloaded: 0 },
  { id: 'dua_tawassul', category_id: 'supplications', title_ur: 'دعائے توسل', title_en: 'Dua-e-Tawassul', is_downloaded: 0 },
  { id: 'hadith_kisa', category_id: 'supplications', title_ur: 'حدیثِ کساء', title_en: 'Hadith-e-Kisa', is_downloaded: 0 },

  // Ziyarat — fetched from GitHub
  { id: 'ziyarat_rasool', category_id: 'ziyarat', title_ur: 'زیارتِ رسولِ خداؐ', title_en: 'Ziyarat of Holy Prophet (saw)', is_downloaded: 0 },
  { id: 'ziyarat_imam_hussain', category_id: 'ziyarat', title_ur: 'زیارتِ امام حسینؑ', title_en: 'Ziyarat of Imam Hussain (as)', is_downloaded: 0 },
  { id: 'ziyarat_imam_reza', category_id: 'ziyarat', title_ur: 'زیارتِ امام رضاؑ', title_en: 'Ziyarat of Imam Reza (as)', is_downloaded: 0 },
  { id: 'ziyarat_imam_mahdi', category_id: 'ziyarat', title_ur: 'زیارتِ امام مہدی (عج)', title_en: 'Ziyarat of Imam Mahdi (aj)', is_downloaded: 0 },

  // Namaz — bundled locally, available immediately
  { id: 'namaz_ghafilah', category_id: 'namaz', title_ur: 'نمازِ غفیلہ', title_en: 'Namaz-e-Ghafilah', is_downloaded: 1 },
  { id: 'namaz_tahajjud', category_id: 'namaz', title_ur: 'نمازِ تہجد', title_en: 'Namaz-e-Tahajjud', is_downloaded: 1 },
  { id: 'namaz_wahshat', category_id: 'namaz', title_ur: 'نمازِ وحشت', title_en: 'Namaz-e-Wahshat', is_downloaded: 1 },
  { id: 'namaz_ayat', category_id: 'namaz', title_ur: 'نمازِ آیات', title_en: 'Namaz-e-Ayat', is_downloaded: 1 },
  { id: 'namaz_janazah', category_id: 'namaz', title_ur: 'نمازِ جنازہ', title_en: 'Namaz-e-Janazah', is_downloaded: 1 },
];

export const seedContents = async () => {
  try {
    console.log("Checking and seeding contents metadata...");

    for (const item of contentList) {
      const existing = await db.select().from(contents).where(eq(contents.id, item.id));
      if (existing.length === 0) {
        await db.insert(contents).values({
          id: item.id,
          category_id: item.category_id,
          title_ur: item.title_ur,
          title_en: item.title_en,
          is_downloaded: 1, // Seeding local packaged files
        });
        console.log(`Seeded content metadata: ${item.id}`);
      }
    }

    console.log("Contents metadata seeding check completed successfully!");
  } catch (error) {
    console.error("Seeding contents error:", error);
    throw error;
  }
};
