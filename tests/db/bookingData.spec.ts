import { buildBooking } from "../../api/testData";
import { test, expect } from "../../fixtures/dbApiBase";

test(
  "Loads two bookings into DB and finds both",
  { tag: "@db" },
  async ({ bookingClient, createBooking, bookingDB }) => {
    const firstBooking = await createBooking();
    const secondBooking = await createBooking({
      totalprice: 250,
      firstname: "Joe",
    });

    for (const { id } of [firstBooking, secondBooking]) {
      const response = await bookingClient.get(id);
      expect(response.status()).toBe(200);
      bookingDB.insert(id, await response.json());
    }

    const rows = bookingDB.query<{ id: number }>(
      "SELECT id FROM bookings WHERE id IN (?, ?)",
      firstBooking.id,
      secondBooking.id,
    );
    expect(rows.map((r) => r.id).sort((a, b) => a - b)).toEqual(
      [firstBooking.id, secondBooking.id].sort((a, b) => a - b),
    );
  },
);

test(
  "Loads booking into DB and verifies its parameters",
  { tag: "@db" },
  async ({ bookingClient, createdBooking, bookingDB }) => {
    const response = await bookingClient.get(createdBooking.id);

    expect(response.status()).toBe(200);
    const booking = await response.json();

    bookingDB.insert(createdBooking.id, booking);

    const [row] = bookingDB.query<{
      id: number;
      firstname: string;
      lastname: string;
      totalprice: number;
      depositpaid: number;
      checkin: string;
      checkout: string;
    }>("SELECT * FROM bookings WHERE lastname = ?", booking.lastname);

    expect(row).toBeDefined();
    expect(row.id).toEqual(createdBooking.id);
    expect(row.firstname).toEqual(createdBooking.booking.firstname);
    expect(row.lastname).toEqual(createdBooking.booking.lastname);
    expect(row.totalprice).toEqual(createdBooking.booking.totalprice);
    expect(row.checkin).toEqual(createdBooking.booking.bookingdates.checkin);
    expect(row.checkout).toEqual(createdBooking.booking.bookingdates.checkout);
    expect(row.depositpaid).toBe(1);
  },
);

test(
  "Passes data-quality rules for valid data",
  { tag: "@db" },
  async ({ bookingClient, createBooking, createdBooking, bookingDB }) => {
    const response = await bookingClient.get(createdBooking.id);

    expect(response.status()).toBe(200);
    const booking = await response.json();

    bookingDB.insert(createdBooking.id, booking);

    // Create another booking
    const anotherResposeData = await createBooking({
      totalprice: 120,
      firstname: "Joe",
    });
    const anotherResponse = await bookingClient.get(anotherResposeData.id);

    expect(anotherResponse.status()).toBe(200);
    const anotherBooking = await anotherResponse.json();

    bookingDB.insert(anotherResposeData.id, anotherBooking);

    // Verify that checkout date is later than checkin date
    const dateCheckRows = bookingDB.findInvalidDates();

    expect(dateCheckRows).toEqual([]);

    // Verify that no duplicates occur in the DB
    const duplicatesCheckRows = bookingDB.findDuplicates();

    expect(duplicatesCheckRows).toEqual([]);

    // Verify that totalPrice is higher than zero
    const priceCheckRows = bookingDB.findNonPositivePrices();

    expect(priceCheckRows).toEqual([]);
  },
);

test(
  "Detects bad data with the quality rules",
  { tag: "@db" },
  async ({ bookingDB }) => {
    // Create duplicate booking and verify it gets caught
    const bookingData = buildBooking();
    bookingDB.insert(1, bookingData);
    bookingDB.insert(2, bookingData);

    const duplicatesCheckRows = bookingDB.findDuplicates();

    expect(duplicatesCheckRows).toHaveLength(1);

    // Create a booking with faulty price and add it to DB
    const faultyPriceBookingData = buildBooking({
      totalprice: 0,
    });

    bookingDB.insert(3, faultyPriceBookingData);

    const priceCheckRows = bookingDB.findNonPositivePrices();

    expect(priceCheckRows).toEqual([{ id: 3 }]);

    // Create booking with wrong checkin/checkout dates
    const faultyDatesBookingData = buildBooking({
      bookingdates: { checkin: "2026-11-10", checkout: "2026-11-05" },
    });

    bookingDB.insert(4, faultyDatesBookingData);

    const dateCheckRows = bookingDB.findInvalidDates();

    expect(dateCheckRows).toEqual([{ id: 4 }]);
  },
);
