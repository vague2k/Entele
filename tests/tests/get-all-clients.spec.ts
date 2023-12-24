import test, { expect } from "@playwright/test";
import type { Clients } from "../../src/xata";

test('Get all client records', async ({ request }) => {

    const response = await request.get('/api/clients/all')
    const responseBody: Clients[] = await response.json()

    expect(Array.isArray(responseBody)).toBe(true);
    expect(response.status()).toBe(200)

    for (const client of responseBody as Clients[]) {
        expect(client).toHaveProperty('name');
        expect(client).toHaveProperty('email');
        expect(client).toHaveProperty('amountOfOrders');
        expect(client).toHaveProperty('xata');

        expect(typeof client.name).toBe('string')
        expect(typeof client.email).toBe('string')
        expect(typeof client.amountOfOrders).toBe('number')
    }
});
