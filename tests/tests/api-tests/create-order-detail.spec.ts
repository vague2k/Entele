import test, { expect } from "@playwright/test";
import { testClient, testOrderDetail_1 } from "../mock-data";

test("Create a new testOrderDetail_1 record, then delete by record ID", async ({ request }) => {

    // we need to create this client before the test starts as to make sure it's name and email exists
    // so that the order-details endpoint can properly check if that client exists

    const testClient_Response = await request.post('/api/clients/create', { data: testClient })
    const testClientResponse_Body = await testClient_Response.json()
    const clientID = testClientResponse_Body.newClient.id;

    expect(testClient_Response.status()).toBe(201)
    expect(typeof clientID).toBe('string');

    const response = await request.post('/api/order-details/create', { data: testOrderDetail_1 })
    const responseBody = await response.json()
    const testOrderDetail_1_ID = responseBody.newOrderDetail.id

    expect(response.status()).toBe(201)
    expect(typeof testOrderDetail_1_ID).toBe('string')

    // check if the response has the following properties
    expect(responseBody).toHaveProperty('newOrderDetail')
    expect(responseBody).toHaveProperty('message')
    expect(responseBody).toHaveProperty('newOrderDetail.units')
    expect(responseBody).toHaveProperty('newOrderDetail.unitPrice')
    expect(responseBody).toHaveProperty('newOrderDetail.subtotal')
    expect(responseBody).toHaveProperty('newOrderDetail.clientName')
    expect(responseBody).toHaveProperty('newOrderDetail.clientEmail')
    expect(responseBody).toHaveProperty('newOrderDetail.garmentCode')
    expect(responseBody).toHaveProperty('newOrderDetail.garmentBrand')
    expect(responseBody).toHaveProperty('newOrderDetail.garmentColor')
    expect(responseBody).toHaveProperty('newOrderDetail.garmentType')
    expect(responseBody).toHaveProperty('newOrderDetail.orders')

    // check if the response props are the same values as the <testOrderDetail> props
    expect(responseBody.newOrderDetail.units).toBe(testOrderDetail_1.units)
    expect(responseBody.newOrderDetail.unitPrice).toBe(testOrderDetail_1.unitPrice)
    expect(responseBody.newOrderDetail.subtotal).toBe(testOrderDetail_1.units * testOrderDetail_1.unitPrice)
    expect(responseBody.newOrderDetail.clientName).toBe(testOrderDetail_1.clientName)
    expect(responseBody.newOrderDetail.clientEmail).toBe(testOrderDetail_1.clientEmail)
    expect(responseBody.newOrderDetail.garmentCode).toBe(testOrderDetail_1.garmentCode)
    expect(responseBody.newOrderDetail.garmentBrand).toBe(testOrderDetail_1.garmentBrand)
    expect(responseBody.newOrderDetail.garmentColor).toBe(testOrderDetail_1.garmentColor)
    expect(responseBody.newOrderDetail.garmentType).toBe(testOrderDetail_1.garmentType)

    // check if the response props are the same primitive types as the <testOrderDetail> props
    expect(typeof responseBody.newOrderDetail.units).toBe('number')
    expect(typeof responseBody.newOrderDetail.unitPrice).toBe('number')
    expect(typeof responseBody.newOrderDetail.subtotal).toBe('number')
    expect(typeof responseBody.newOrderDetail.clientName).toBe('string')
    expect(typeof responseBody.newOrderDetail.clientEmail).toBe('string')
    expect(typeof responseBody.newOrderDetail.garmentCode).toBe('string')
    expect(typeof responseBody.newOrderDetail.garmentType).toBe('string')
    expect(typeof responseBody.newOrderDetail.garmentBrand).toBe('string')
    // orders linked field is an object containing the order's id, so we test for an object
    expect(typeof responseBody.newOrderDetail.orders).toBe('object')

    // finally delete the created testOrderDetail_1 as a form of teardown
    const deleteOrderDetail_1_Response = await request.delete(`api/order-details/${testOrderDetail_1_ID}/delete`)
    expect(deleteOrderDetail_1_Response.status()).toBe(200)

    // finally delete the created client as a form of teardown
    const clientDeletedResponse = await request.delete(`/api/clients/${clientID}/delete`)
    expect(clientDeletedResponse.status()).toBe(200)
})
