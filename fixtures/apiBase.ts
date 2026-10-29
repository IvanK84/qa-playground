import { test as base, expect } from "@playwright/test";
import { BookingClient } from "../api/bookingClient";
import { buildBooking, type Booking } from "../api/testData";

type ApiFixtures = {
  bookingClient: BookingClient;
  authToken: string;
  createdBooking: { id: number; booking: Booking };
  createBooking: (
    overrides?: Partial<Booking>,
  ) => Promise<{ id: number; booking: Booking }>;
};

export const test = base.extend<ApiFixtures>({
  bookingClient: async ({ request }, use) => {
    await use(new BookingClient(request));
  },

  authToken: async ({ request }, use) => {
    const response = await request.post("auth", {
      data: { username: "admin", password: "password123" },
    });
    expect(response.ok()).toBeTruthy();
    const { token } = await response.json();
    await use(token);
  },

  createdBooking: async ({ createBooking }, use) => {
    await use(await createBooking());
  },

  createBooking: async ({ bookingClient, authToken }, use) => {
    const createdIds: number[] = [];

    // The test receives this function and can call it as often as it likes
    await use(async (overrides = {}) => {
      const booking = buildBooking(overrides);
      const response = await bookingClient.create(booking);
      expect(response.status()).toBe(200);
      const { bookingid } = await response.json();
      createdIds.push(bookingid);
      return { id: bookingid, booking };
    });

    // Teardown: runs after the test, even if the test failed
    for (const id of createdIds) {
      await bookingClient.remove(id, authToken);
    }
  },
});

// Export the built-in expect wrapper so you don't have to import it from @playwright/test
export { expect } from "@playwright/test";
