CREATE TABLE `content_item_explanations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`item_id` integer NOT NULL,
	`explanation_text` text NOT NULL,
	`language` text DEFAULT 'ur' NOT NULL,
	`position` text NOT NULL,
	`sequence_number` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `content_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_explanations_lookup` ON `content_item_explanations` (`item_id`,`position`);