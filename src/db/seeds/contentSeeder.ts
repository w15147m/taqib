import { db } from "../client";
import { contents } from "../schema";
import { eq } from "drizzle-orm";

const contentList = [
  // Prayers
  { id: 'dua_fajr', category_id: 'prayers', title_ur: 'دعا بعد از نماز فجر', title_en: 'Dua after Fajr Prayer' },
  { id: 'dua_dhuhr', category_id: 'prayers', title_ur: 'دعا بعد از نماز ظہر', title_en: 'Dua after Dhuhr Prayer' },
  { id: 'dua_asr', category_id: 'prayers', title_ur: 'دعا after نماز عصر', title_en: 'Dua after Asr Prayer' }, // Wait, check title_ur from previous file, it was: 'دعا بعد از نماز عصر'
  { id: 'dua_maghrib', category_id: 'prayers', title_ur: 'دعا بعد از نماز مغرب', title_en: 'Dua after Maghrib Prayer' },
  { id: 'dua_isha', category_id: 'prayers', title_ur: 'دعا بعد از نماز عشاء', title_en: 'Dua after Isha Prayer' },
  
  // Surahs
  { id: 'ayat_al_kursi', category_id: 'surahs', title_ur: 'آيَةُ الْكُرْسِی', title_en: 'Ayat al-Kursi' },
  { id: 'surah_al_kafirun', category_id: 'surahs', title_ur: 'سُوْرَةُ الْكَافِرُوْن', title_en: 'Surah Al-Kafirun' },
  { id: 'surah_al_ikhlas', category_id: 'surahs', title_ur: 'سُوْرَةُ الْاِخْلَاص', title_en: 'Surah Al-Ikhlas' },
  { id: 'surah_al_falaq', category_id: 'surahs', title_ur: 'سُوْرَةُ الْفَلَق', title_en: 'Surah Al-Falaq' },
  { id: 'surah_an_nas', category_id: 'surahs', title_ur: 'سُوْرَةُ النَّاس', title_en: 'Surah An-Nas' },
  { id: 'surah_al_jumuah', category_id: 'surahs', title_ur: 'سُوْرَةُ الْجُمُعَه', title_en: 'Surah Al-Jumuah' },
  { id: 'surah_al_munafiqun', category_id: 'surahs', title_ur: 'سُوْرَةُ الْمُنَافِقُوْن', title_en: 'Surah Al-Munafiqun' },
  { id: 'surah_al_qadr', category_id: 'surahs', title_ur: 'سُوْرَةُ الْقَدْر', title_en: 'Surah Al-Qadr' },

  // Supplications
  { id: 'dua_ahd', category_id: 'supplications', title_ur: 'دعائے عہد', title_en: 'Dua-e-Ahd' },
  { id: 'munajat_imam_ali', category_id: 'supplications', title_ur: 'مناجات امیر المؤمنینؑ', title_en: 'Munajat of Imam Ali (as)' },
  { id: 'dua_tassul_imam_zamana', category_id: 'supplications', title_ur: 'دعائے سلامتی امام زمانہؑ', title_en: 'Dua-e-Salamati Imam Zamana (aj)' },
  { id: 'dua_ramadan', category_id: 'supplications', title_ur: 'دعائے ماہِ رمضان', title_en: 'Dua of Month of Ramadan' },
  { id: 'dua_wahdat', category_id: 'supplications', title_ur: 'دعائے وحدت', title_en: 'Dua-e-Wahdat' },
  { id: 'dua_mutalia', category_id: 'supplications', title_ur: 'دعائے مطالعہ', title_en: 'Dua-e-Mutalia' },

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
