CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`profile_image` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`title_ur` text NOT NULL,
	`title_en` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `content_item_translations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`item_id` integer NOT NULL,
	`language` text NOT NULL,
	`translation_text` text NOT NULL,
	`transliteration` text,
	FOREIGN KEY (`item_id`) REFERENCES `content_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_translations_lookup` ON `content_item_translations` (`item_id`,`language`);--> statement-breakpoint
CREATE UNIQUE INDEX `unq_item_lang` ON `content_item_translations` (`item_id`,`language`);--> statement-breakpoint
CREATE TABLE `content_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content_id` text NOT NULL,
	`sequence_number` integer NOT NULL,
	`arabic_text` text NOT NULL,
	FOREIGN KEY (`content_id`) REFERENCES `contents`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_content_items_lookup` ON `content_items` (`content_id`,`sequence_number`);--> statement-breakpoint
CREATE TABLE `contents` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` text NOT NULL,
	`title_ur` text NOT NULL,
	`title_en` text NOT NULL,
	`reference` text,
	`benefits_ur` text,
	`is_downloaded` integer DEFAULT 0,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE cascade ON DELETE restrict
);
