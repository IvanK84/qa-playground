import Database from "better-sqlite3";
import type { Booking } from "../api/testData";

export class BookingDB {
  private readonly db = new Database(":memory:");

  constructor() {
    this.db.exec(`CREATE TABLE bookings (
      id INTEGER PRIMARY KEY,
      firstname TEXT, lastname TEXT,
      totalprice INTEGER, depositpaid INTEGER,
      checkin TEXT, checkout TEXT
    )`);
  }

  insert(id: number, booking: Booking) {
    this.db
      .prepare(
        `INSERT INTO bookings (id, firstname, lastname, totalprice, depositpaid, checkin, checkout) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        id,
        booking.firstname,
        booking.lastname,
        booking.totalprice,
        booking.depositpaid ? 1 : 0,
        booking.bookingdates.checkin,
        booking.bookingdates.checkout,
      );
  }

  query<T>(sql: string, ...params: unknown[]): T[] {
    return this.db.prepare(sql).all(...params) as T[];
  }

  findInvalidDates() {
    return this.query<{ id: number }>(
      "SELECT id FROM bookings WHERE checkout <= checkin",
    );
  }

  findNonPositivePrices() {
    return this.query<{ id: number }>(
      "SELECT id FROM bookings WHERE totalprice <= 0",
    );
  }

  findDuplicates() {
    return this.query<{
      firstname: string;
      lastname: string;
      checkin: string;
    }>(
      "SELECT firstname, lastname, checkin, COUNT(*) AS n FROM bookings GROUP BY firstname, lastname, checkin HAVING n > 1",
    );
  }

  close() {
    this.db.close();
  }
}
