export type Booking = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds?: string;
};

export function buildBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    firstname: "Ivan",
    lastname: `Test${Date.now()}`,
    totalprice: 100,
    depositpaid: true,
    bookingdates: { checkin: "2026-11-01", checkout: "2026-11-05" },
    additionalneeds: "Breakfast",
    ...overrides, // lets a test change just one field
  };
}
