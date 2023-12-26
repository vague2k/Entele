import test, { expect } from "@playwright/test";
import type { Orders } from "../../../src/xata";

test('Get all order records', async ({ request }) => {

    const response = await request.get('/api/orders/all')
    const responseBody: Orders[] = await response.json()

    expect(Array.isArray(responseBody)).toBe(true);
    expect(response.status()).toBe(200)

    for (const order of responseBody as Orders[]) {
        expect(order).toHaveProperty('totalAmount');
        expect(order).toHaveProperty('totalUnits');
        expect(order).toHaveProperty('averageUnitPrice');
        expect(order).toHaveProperty('clients');
        expect(order).toHaveProperty('complete');
        expect(order).toHaveProperty('orderDate');
        expect(order).toHaveProperty('xata');

        expect(typeof order.totalAmount).toBe('number')
        expect(typeof order.totalUnits).toBe('number')
        expect(typeof order.averageUnitPrice).toBe('number')
        // clients linked field is an object containing the client's id, so we test for an object
        expect(typeof order.clients).toBe('object')
        expect(typeof order.complete).toBe('boolean')
        // orderDate is a date string in the db, so we test for a string.
        expect(typeof order.orderDate).toBe('string')
    }
});
