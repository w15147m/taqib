import { db } from "../client";
import { contents } from "../schema";
import { eq } from "drizzle-orm";

const contentList = [
  // Supplications
  { id: 'dua_ahd', category_id: 'supplications', title_ur: 'دعائے عہد', title_en: 'Dua-e-Ahd' },
  { id: 'munajat_imam_ali', category_id: 'supplications', title_ur: 'مناجات امیر المؤمنینؑ', title_en: 'Munajat of Imam Ali (as)' },
  { id: 'dua_tassul_imam_zamana', category_id: 'supplications', title_ur: 'دعائے سلامتی امام زمانہؑ', title_en: 'Dua-e-Salamati Imam Zamana (aj)' },
  { id: 'dua_ramadan', category_id: 'supplications', title_ur: 'دعائے ماہِ رمضان', title_en: 'Dua of Month of Ramadan' },
  { id: 'dua_wahdat', category_id: 'supplications', title_ur: 'دعائے وحدت', title_en: 'Dua-e-Wahdat' },
  { id: 'dua_mutalia', category_id: 'supplications', title_ur: 'دعائے مطالعہ', title_en: 'Dua-e-Mutalia' },
  { id: 'dua_kumayl', category_id: 'supplications', title_ur: 'دعائے کمیل', title_en: 'Dua-e-Kumayl' },
  { id: 'dua_nudba', category_id: 'supplications', title_ur: 'دعائے ندبہ', title_en: 'Dua-e-Nudba' },
  { id: 'dua_tawassul', category_id: 'supplications', title_ur: 'دعائے توسل', title_en: 'Dua-e-Tawassul' },
  { id: 'hadith_kisa', category_id: 'supplications', title_ur: 'حدیثِ کساء', title_en: 'Hadith-e-Kisa' },

  // Ziyarat
  { id: 'ziyarat_rasool', category_id: 'ziyarat', title_ur: 'زیارتِ رسولِ خداؐ', title_en: 'Ziyarat of Holy Prophet (saw)' },
  { id: 'ziyarat_imam_hussain', category_id: 'ziyarat', title_ur: 'زیارتِ امام حسینؑ', title_en: 'Ziyarat of Imam Hussain (as)' },
  { id: 'ziyarat_imam_reza', category_id: 'ziyarat', title_ur: 'زیارتِ امام رضاؑ', title_en: 'Ziyarat of Imam Reza (as)' },
  { id: 'ziyarat_imam_mahdi', category_id: 'ziyarat', title_ur: 'زیارتِ امام مہدی (عج)', title_en: 'Ziyarat of Imam Mahdi (aj)' },

  // Namaz
  { id: 'namaz_ghafilah', category_id: 'namaz', title_ur: 'نمازِ غفیلہ', title_en: 'Namaz-e-Ghafilah' },
  { id: 'namaz_tahajjud', category_id: 'namaz', title_ur: 'نمازِ تہجد', title_en: 'Namaz-e-Tahajjud' },
  { id: 'namaz_wahshat', category_id: 'namaz', title_ur: 'نمازِ وحشت', title_en: 'Namaz-e-Wahshat' },
  { id: 'namaz_ayat', category_id: 'namaz', title_ur: 'نمازِ آیات', title_en: 'Namaz-e-Ayat' },
  { id: 'namaz_janazah', category_id: 'namaz', title_ur: 'نمازِ جنازہ', title_en: 'Namaz-e-Janazah' },
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
