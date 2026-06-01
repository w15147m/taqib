# Mafatih al-Janan Schema ERD

This folder contains the database schema model for the Mafatih al-Janan content structure.

## Database Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    chapters ||--o{ sections : "contains"
    sections ||--o{ section_contents : "groups"
    contents ||--o{ section_contents : "belongs to"
    contents ||--o{ content_items : "composed of"
    content_items ||--o{ content_item_translations : "has"
    content_items ||--o{ content_item_explanations : "contains"

    chapters {
        TEXT id PK
        TEXT title
    }

    sections {
        TEXT id PK
        TEXT chapter_id FK
        TEXT title
    }

    section_contents {
        TEXT section_id PK, FK
        TEXT content_id PK, FK
    }

    contents {
        TEXT id PK
        TEXT title_ur
        TEXT title_en
        TEXT reference
        TEXT benefits_ur
        INTEGER is_downloaded
    }

    content_items {
        INTEGER id PK
        TEXT content_id FK
        INTEGER sequence_number
        TEXT arabic_text
    }

    content_item_translations {
        INTEGER id PK
        INTEGER item_id FK
        TEXT language
        TEXT translation_text
        TEXT transliteration
    }

    content_item_explanations {
        INTEGER id PK
        INTEGER item_id FK
        TEXT explanation_text
        TEXT language
        TEXT position
        INTEGER sequence_number
    }
```

## Schema Definitions

### `chapters`
* `id`: Unique identifier for the chapter (e.g., `chapter_1`).
* `title`: Title of the chapter (e.g., `باب اول: ادعیه`).

### `sections`
* `id`: Unique identifier for the section (e.g., `section_1_1`).
* `chapter_id`: Foreign key referencing `chapters.id`.
* `title`: Title of the section (e.g., `فصل اول`).

### `section_contents` (Junction Table)
* `section_id`: Foreign key referencing `sections.id`.
* `content_id`: Foreign key referencing `contents.id`.
* *Primary Key*: Compound key `(section_id, content_id)`.

### `contents`
* `id`: Unique identifier of the specific supplication/content (e.g., `dua_kumayl`).
* `title_ur`: Urdu title.
* `title_en`: English title.
* `reference`: Source reference citation.
* `benefits_ur`: Virtues/benefits details in Urdu.
* `is_downloaded`: Flag indicating whether the full supplication is cached/downloaded offline.

### `content_items`
* `id`: Auto-incrementing primary key.
* `content_id`: Foreign key referencing `contents.id`.
* `sequence_number`: Ordering offset of the line inside the supplication.
* `arabic_text`: The Arabic text of the line.

### `content_item_translations`
* `id`: Auto-incrementing primary key.
* `item_id`: Foreign key referencing `content_items.id`.
* `language`: Language code (e.g., `en`, `ur`).
* `translation_text`: Translated text.
* `transliteration`: Romanized pronunciation text.

### `content_item_explanations`
* `id`: Auto-incrementing primary key.
* `item_id`: Foreign key referencing `content_items.id`.
* `explanation_text`: Explicative text (e.g., instructions on actions to take).
* `language`: Language code (default `ur`).
* `position`: When to render the explanation (`before` or `after` the item).
* `sequence_number`: Position ordering.
