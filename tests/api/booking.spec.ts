import { test, expect } from "../../fixtures/apiBase";

test(
  "Creates a booking and reads it back",
  { tag: "@api" },
  async ({ bookingClient, createdBooking }) => {
    const response = await bookingClient.get(createdBooking.id);

    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(createdBooking.booking);
  },
);

test(
  "Updates a booking and verifies the change",
  { tag: "@api" },
  async ({ bookingClient, createdBooking, authToken }) => {
    const updatedBooking = { ...createdBooking.booking, totalprice: 250 };

    const updatedResponse = await bookingClient.update(
      createdBooking.id,
      updatedBooking,
      authToken,
    );
    expect(updatedResponse.status()).toBe(200);

    const updateGetResponse = await bookingClient.get(createdBooking.id);
    expect(await updateGetResponse.json()).toMatchObject(updatedBooking);
  },
);

test(
  "Deletes a booking",
  { tag: "@api" },
  async ({ bookingClient, createdBooking, authToken }) => {
    const deleteResponse = await bookingClient.remove(
      createdBooking.id,
      authToken,
    );
    // Restful-booker returns 201 on delete (API quirk)
    expect(deleteResponse.status()).toBe(201);

    const getResponse = await bookingClient.get(createdBooking.id);
    expect(getResponse.status()).toBe(404);
  },
);

test(
  "Rejects an update with wrong token",
  { tag: "@api" },
  async ({ bookingClient, createdBooking }) => {
    const updatedBooking = { ...createdBooking.booking, totalprice: 250 };

    const updateResponse = await bookingClient.update(
      createdBooking.id,
      updatedBooking,
      "b4dTok3n",
    );
    expect(updateResponse.status()).toBe(403);
  },
);

test(
  "Returns a 404 for a non-existent booking",
  { tag: "@api" },
  async ({ bookingClient }) => {
    const response = await bookingClient.get(0);

    expect(response.status()).toBe(404);
  },
);
