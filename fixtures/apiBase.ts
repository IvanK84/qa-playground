import { test as base, expect } from "@playwright/test";
import { BookingClient } from "../api/bookingClient";
import { buildBooking, type Booking } from "../api/testData";

type ApiFixtures = {
  bookingClient: BookingClient;
  authToken: string;
  createdBooking: { id: number; booking: Booking };
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

  createdBooking: async ({ bookingClient, authToken }, use) => {
    const booking = buildBooking();
    const response = await bookingClient.create(booking);
    expect(response.status()).toBe(200);
    const { bookingid } = await response.json();

    await use({ id: bookingid, booking });

    await bookingClient.remove(bookingid, authToken);
  },
});

// Export the built-in expect wrapper so you don't have to import it from @playwright/test
export { expect } from "@playwright/test";
