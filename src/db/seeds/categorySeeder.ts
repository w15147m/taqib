import { db } from "../client";
import { categories } from "../schema";
import { eq } from "drizzle-orm";

const categoryMapping = [
  { id: 'prayers', title_ur: 'تعقیباتِ نماز', title_en: 'Taqeebat' },
  { id: 'surahs', title_ur: 'سورتیں', title_en: 'Surahs' },
  { id: 'supplications', title_ur: 'دعائیں اور مناجات', title_en: 'Supplications' },
  { id: 'ziyarat', title_ur: 'زیارات', title_en: 'Ziyarat' },
  { id: 'namaz', title_ur: 'نمازیں', title_en: 'Namaz' },
];

export const seedCategories = async () => {
  try {
    console.log("Checking and seeding categories...");

    for (const info of categoryMapping) {
      const existing = await db.select().from(categories).where(eq(categories.id, info.id));
      if (existing.length === 0) {
        await db.insert(categories).values({
          id: info.id,
          title_ur: info.title_ur,
          title_en: info.title_en,
        });
        console.log(`Seeded category: ${info.id}`);
      }
    }

    console.log("Categories seeding check completed successfully!");
  } catch (error) {
    console.error("Seeding categories error:", error);
    throw error;
  }
};
