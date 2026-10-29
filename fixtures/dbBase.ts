import { test as base } from "@playwright/test";
import { BookingDB } from "../db/bookingDb";

export const test = base.extend<{ bookingDB: BookingDB }>({
  bookingDB: async ({}, use) => {
    const db = new BookingDB();
    await use(db);
    db.close();
  },
});

export { expect } from "@playwright/test";
