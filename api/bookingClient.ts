import type { APIRequestContext, APIResponse } from "@playwright/test";
import type { Booking } from "./testData";

export class BookingClient {
  constructor(private readonly request: APIRequestContext) {}

  async create(booking: Booking): Promise<APIResponse> {
    return this.request.post("booking", { data: booking });
  }

  async get(id: number): Promise<APIResponse> {
    return this.request.get(`booking/${id}`);
  }

  async update(
    id: number,
    booking: Booking,
    token: string,
  ): Promise<APIResponse> {
    return this.request.put(`booking/${id}`, {
      data: booking,
      headers: { Cookie: `token=${token}` },
    });
  }

  async remove(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`booking/${id}`, {
      headers: { Cookie: `token=${token}` },
    });
  }
}
