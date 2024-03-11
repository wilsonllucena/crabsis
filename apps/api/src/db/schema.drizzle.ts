import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  numeric,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  stripeSubscriptionStatus: varchar("stripe_subscription_status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// generate relations
export const accountsRelations = relations(accounts, ({ many }) => ({
  products: many(products),
  services: many(services),
  clients: many(clients),
  users: many(users),
  schedules: many(schedules),
}));

export const users = pgTable("users", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  accountId: text("account_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  schedules: many(schedules),
}));

export const usersRelations = relations(users, ({ one }) => ({
  account: one(accounts, {
    fields: [users.accountId],
    references: [accounts.id],
  }),
}));

export const products = pgTable("products", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  accountId: text("account_id").notNull(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").default(0),
  description: text("description"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productsRelations = relations(products, ({ one }) => ({
  account: one(accounts, {
    fields: [products.accountId],
    references: [accounts.id],
  }),
}));

export const services = pgTable("services", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  accountId: text("account_id").notNull(),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const servicesRelations = relations(services, ({ one }) => ({
  account: one(accounts, {
    fields: [services.accountId],
    references: [accounts.id],
  }),
}));

export const clients = pgTable("clients", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  accountId: text("account_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const clientsRelations = relations(clients, ({ one }) => ({
  account: one(accounts, {
    fields: [clients.accountId],
    references: [accounts.id],
  }),
}));

export const schedules = pgTable("schedules", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  clientId: text("client_id").notNull(),
  serviceId: text("service_id").notNull(),
  accountId: text("account_id").notNull(),
  userId: text("user_id"),
  date: timestamp("date").notNull(),
  observation: text("observation"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const schedulesRelations = relations(schedules, ({ one }) => ({
  client: one(clients, {
    fields: [schedules.clientId],
    references: [clients.id],
  }),
  service: one(services, {
    fields: [schedules.serviceId],
    references: [services.id],
  }),
  account: one(accounts, {
    fields: [schedules.accountId],
    references: [accounts.id],
  }),
  user: one(users, {
    fields: [schedules.userId],
    references: [users.id],
  }),
}));
