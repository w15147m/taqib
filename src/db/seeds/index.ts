import { seedCategories } from "./categorySeeder";
import { seedContents } from "./contentSeeder";
import { seedAllFromGitHub } from "./githubSeeder";

export const seedEssentialData = async () => {
  try {
    // 1. Seed categories
    await seedCategories();

    // 2. Seed content metadata
    await seedContents();

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
