import test, { expect } from "@playwright/test";
import type { OrderDetails } from "../../src/xata";

test('Get all order_details records', async ({ request }) => {

    const response = await request.get('/api/order-details/all')
    const responseBody: OrderDetails[] = await response.json()

    expect(Array.isArray(responseBody)).toBe(true);
    expect(response.status()).toBe(200)

    for (const orderDetails of responseBody as OrderDetails[]) {
        expect(orderDetails).toHaveProperty('units');
        expect(orderDetails).toHaveProperty('unitPrice');
        expect(orderDetails).toHaveProperty('subtotal');
        expect(orderDetails).toHaveProperty('clientName');
        expect(orderDetails).toHaveProperty('clientEmail');
        expect(orderDetails).toHaveProperty('garmentCode');
        expect(orderDetails).toHaveProperty('garmentType');
        expect(orderDetails).toHaveProperty('garmentBrand');
        expect(orderDetails).toHaveProperty('garmentColor');
        expect(orderDetails).toHaveProperty('orders');
        expect(orderDetails).toHaveProperty('xata');

        expect(typeof orderDetails.units).toBe('number')
        expect(typeof orderDetails.unitPrice).toBe('number')
        expect(typeof orderDetails.subtotal).toBe('number')
        expect(typeof orderDetails.clientName).toBe('string')
        expect(typeof orderDetails.clientEmail).toBe('string')
        expect(typeof orderDetails.garmentCode).toBe('string')
        expect(typeof orderDetails.garmentType).toBe('string')
        expect(typeof orderDetails.garmentBrand).toBe('string')
        expect(typeof orderDetails.garmentColor).toBe('string')
        // orders linked field is an object containing the order's id, so we test for an object
        expect(typeof orderDetails.orders).toBe('object')
    }
});
