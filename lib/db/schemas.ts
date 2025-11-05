import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamp = {
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
};

export const user = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .default(false)
    .notNull(),
  image: text("image"),
  ...timestamp,
});

export const hanzis = sqliteTable("hanzis", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  authorId: text("author_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  character: text("character").notNull(),
  pinyin: text("pinyin").notNull(),
  meaning: text("meaning"),
  category: text("category"),
  ...timestamp,
});
