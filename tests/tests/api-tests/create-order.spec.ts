import test, { expect } from "@playwright/test";
import { testClient, testOrderDetail_1, testOrderDetail_2 } from "../mock-data";

test("Create new test order based on isolated mock data", async ({ request }) => {

    // create a new test client
    const testClient_Response = await request.post('/api/clients/create', { data: testClient })
    const testClient_Body = await testClient_Response.json()
    const clientID = testClient_Body.newClient.id

    expect(testClient_Response.status()).toBe(201)
    expect(typeof clientID).toBe('string');

    // create a new testOrderDetail_1
    const testOrderDetail_1_Response = await request.post('/api/order-details/create', { data: testOrderDetail_1 })
    const testOrderDetail_1_Body = await testOrderDetail_1_Response.json()
    const testOrderDetail_1_ID = testOrderDetail_1_Body.newOrderDetail.id

    expect(testOrderDetail_1_Response.status()).toBe(201)
    expect(typeof testOrderDetail_1_ID).toBe('string')

    // create a new testOrderDetail_2
    const testOrderDetail_2_Response = await request.post('/api/order-details/create', { data: testOrderDetail_2 })
    const testOrderDetail_2_Body = await testOrderDetail_2_Response.json()
    const testOrderDetail_2_ID = testOrderDetail_2_Body.newOrderDetail.id

    expect(testOrderDetail_2_Response.status()).toBe(201)
    expect(typeof testOrderDetail_2_ID).toBe('string')

    // test for a new order using the above client, and order details
    const response = await request.post(`/api/orders/${clientID}/create`)
    const responseBody = await response.json()
    expect(response.status()).toBe(201)

    // check if the response has the following properties
    expect(responseBody).toHaveProperty('newOrder')
    expect(responseBody).toHaveProperty('message')
    expect(responseBody).toHaveProperty('newOrder.totalAmount')
    expect(responseBody).toHaveProperty('newOrder.totalUnits')
    expect(responseBody).toHaveProperty('newOrder.averageUnitPrice')
    expect(responseBody).toHaveProperty('newOrder.orderDate')
    expect(responseBody).toHaveProperty('newOrder.complete')
    expect(responseBody).toHaveProperty('newOrder.clients')

    // check if the response props are the expected primitive types
    expect(typeof responseBody.newOrder.totalAmount).toBe('number')
    expect(typeof responseBody.newOrder.totalUnits).toBe('number')
    expect(typeof responseBody.newOrder.averageUnitPrice).toBe('number')
    expect(typeof responseBody.newOrder.orderDate).toBe('string')
    expect(typeof responseBody.newOrder.complete).toBe('boolean')
    // clients linked field is an object containing the clients's id, so we test for an object and if the id is a string
    expect(typeof responseBody.newOrder.clients).toBe('object')
    expect(typeof responseBody.newOrder.clients.id).toBe('string')
    // check if the id is the same id given to the endpoint
    expect(responseBody.newOrder.clients.id).toEqual(clientID)

    // finally delete the created client as a form of teardown
    const clientDeletedResponse = await request.delete(`/api/clients/${clientID}/delete`)
    expect(clientDeletedResponse.status()).toBe(200)

    // finally delete the created testOrderDetail_1 as a form of teardown
    const orderDetail_1_Response = await request.delete(`api/order-details/${testOrderDetail_1_ID}/delete`)
    expect(orderDetail_1_Response.status()).toBe(200)

    // finally delete the created testOrderDetail_2 as a form of teardown
    const orderDetail_2_Response = await request.delete(`api/order-details/${testOrderDetail_2_ID}/delete`)
    expect(orderDetail_2_Response.status()).toBe(200)

    // finally delete the created testOrderDetail_2 as a form of teardown
    const newOrderResponse = await request.delete(`api/orders/${responseBody.newOrder.id}/delete`)
    expect(newOrderResponse.status()).toBe(200)
})
