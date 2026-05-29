import { sqliteTable, text, integer, index, unique } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  title_ur: text("title_ur").notNull(),
  title_en: text("title_en").notNull(),
});

export const contents = sqliteTable("contents", {
  id: text("id").primaryKey(),
  category_id: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict", onUpdate: "cascade" }),
  title_ur: text("title_ur").notNull(),
  title_en: text("title_en").notNull(),
  reference: text("reference"),
  benefits_ur: text("benefits_ur"),
  is_downloaded: integer("is_downloaded").default(0),
});

export const content_items = sqliteTable("content_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content_id: text("content_id")
    .notNull()
    .references(() => contents.id, { onDelete: "cascade" }),
  sequence_number: integer("sequence_number").notNull(),
  arabic_text: text("arabic_text").notNull(),
}, (table) => ({
  contentIdx: index("idx_content_items_lookup").on(table.content_id, table.sequence_number),
}));

export const content_item_translations = sqliteTable("content_item_translations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  item_id: integer("item_id")
    .notNull()
    .references(() => content_items.id, { onDelete: "cascade" }),
  language: text("language").notNull(),
  translation_text: text("translation_text").notNull(),
  transliteration: text("transliteration"),
}, (table) => ({
  unq: unique("unq_item_lang").on(table.item_id, table.language),
  itemLangIdx: index("idx_translations_lookup").on(table.item_id, table.language),
}));

export const content_item_explanations = sqliteTable("content_item_explanations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  item_id: integer("item_id")
    .notNull()
    .references(() => content_items.id, { onDelete: "cascade" }),
  explanation_text: text("explanation_text").notNull(),
  language: text("language").notNull().default("ur"),
  position: text("position").notNull(), // 'before' | 'after'
  sequence_number: integer("sequence_number").notNull().default(1),
}, (table) => ({
  itemExplIdx: index("idx_explanations_lookup").on(table.item_id, table.position),
}));
