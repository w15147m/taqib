import { db } from "../client";
import { categories } from "../schema";

const categoryMapping = [
  { id: 'prayers', title_ur: 'تعقیباتِ نماز', title_en: 'Taqeebat' },
  { id: 'surahs', title_ur: 'سورتیں', title_en: 'Surahs' },
  { id: 'supplications', title_ur: 'دعائیں اور مناجات', title_en: 'Supplications' },
  { id: 'ziyarat', title_ur: 'زیارات', title_en: 'Ziyarat' },
  { id: 'namaz', title_ur: 'نمازیں', title_en: 'Namaz' },
];

export const seedCategories = async () => {
  try {
    const existingCats = await db.select().from(categories);
    if (existingCats.length > 0) {
      console.log("Categories already seeded");
      return;
    }

    console.log("Seeding categories...");

    for (const info of categoryMapping) {
      await db.insert(categories).values({
        id: info.id,
        title_ur: info.title_ur,
        title_en: info.title_en,
      });
    }

    console.log("Categories seeded successfully!");
  } catch (error) {
    console.error("Seeding categories error:", error);
    throw error;
  }
};
