import { drizzle } from "drizzle-orm/sqlite-proxy";
import SQLite from "react-native-sqlite-storage";
import * as schema from "./schema";
import migrations from "../../drizzle/migrations";

// Open the database
const sqlite = SQLite.openDatabase({
  name: "MyData_v5.db", // Fresh start with cleaned migrations
  location: "default",
});

// Helper to extract column names from SQL queries
const getColumnNames = (sql: string): string[] | null => {
  // Handle SELECT queries
  const selectMatch = sql.match(/select\s+(.*?)\s+from/i);
  if (selectMatch) {
    const columnPart = selectMatch[1];
    return columnPart.split(',').map(col => {
      const parts = col.trim().split(/\s+as\s+/i);
      const target = parts[parts.length - 1]; // Get the alias if exists, else the column
      return target.replace(/"/g, '').replace(/`/g, '').split('.').pop() || '';
    });
  }

  // Handle RETURNING clauses (for INSERT/UPDATE)
  const returningMatch = sql.match(/returning\s+(.*)$/i);
  if (returningMatch) {
    return returningMatch[1].split(',').map(col =>
      col.trim().replace(/"/g, '').replace(/`/g, '').split('.').pop() || ''
    );
  }

  return null;
};

// Create a callback function for the proxy driver
const callback = async (sql: string, params: any[], method: "all" | "run" | "get" | "values") => {
  try {
    const results = await new Promise<any[]>((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(sql, params, (_, res) => {
          const rows: any[] = [];
          for (let i = 0; i < res.rows.length; i++) {
            rows.push(res.rows.item(i));
          }
          resolve(rows);
        }, (_, err) => {
          reject(err);
          return false;
        });
      });
    });

    const columnNames = getColumnNames(sql);

    if (columnNames && columnNames.length > 0) {
      // Map objects to arrays based on the parsed column order
      const data = results.map(row => columnNames.map(col => row[col]));
      if (method === "get") {
        return { rows: data[0] || [] };
      }
      return { rows: data };
    }

    // Default for metadata queries or queries where column extraction fails
    const defaultData = results.map(row => Object.values(row));
    if (method === "get") {
      return { rows: defaultData[0] || [] };
    }
    return { rows: defaultData };
  } catch (e) {
    console.error("Drizzle Proxy Error:", e);
    throw e;
  }
};

// Initialize Drizzle with the proxy
export const db = drizzle(callback, { schema });

// Migration runner
export const runMigrations = async () => {
  try {
    const execute = (sql: string, params: any[] = []) => new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(sql, params, (_, res) => resolve(res), (_, err) => {
          reject(err);
          return false;
        });
      });
    });

    // Create migrations table
    await execute(`
      CREATE TABLE IF NOT EXISTS __drizzle_migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        hash TEXT UNIQUE,
        created_at INTEGER NOT NULL
      );
    `);

    try {
      await execute(`ALTER TABLE __drizzle_migrations ADD COLUMN name TEXT UNIQUE`);
    } catch (e) { }

    if (!migrations || !migrations.migrations) {
      throw new Error("Migrations not properly loaded");
    }

    const migrationKeys = Object.keys(migrations.migrations).sort();

    for (const key of migrationKeys) {
      const res: any = await execute(
        `SELECT id FROM __drizzle_migrations WHERE name = ? OR hash = ?`,
        [key, key]
      );

      if (res.rows.length > 0) continue;

      const sql = (migrations.migrations as any)[key];
      if (!sql) throw new Error(`Migration SQL for ${key} is missing`);

      const statements = sql.split('--> statement-breakpoint');

      for (const statement of statements) {
        const trimmed = statement.trim();
        if (trimmed) {
          const finalSql = trimmed.replace(/CREATE TABLE (`?\w+`?)/i, 'CREATE TABLE IF NOT EXISTS $1');
          await execute(finalSql);
        }
      }

      await execute(
        `INSERT INTO __drizzle_migrations (name, hash, created_at) VALUES (?, ?, ?)`,
        [key, key, Date.now()]
      );
    }
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
};
