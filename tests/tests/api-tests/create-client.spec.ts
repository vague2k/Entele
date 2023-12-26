import test, { expect } from "@playwright/test";
import { testClient } from "../mock-data";

test("Create a new testClient record, then delete by record ID.", async ({ request }) => {

    const response = await request.post('/api/clients/create', { data: testClient })
    const responseBody = await response.json()
    const clientID = responseBody.newClient.id;

    expect(response.status()).toBe(201)
    expect(typeof clientID).toBe('string');

    // check if the response has the following properties
    expect(responseBody).toHaveProperty('newClient')
    expect(responseBody).toHaveProperty('message')
    expect(responseBody).toHaveProperty('newClient.name')
    expect(responseBody).toHaveProperty('newClient.email')
    expect(responseBody).toHaveProperty('newClient.amountOfOrders')

    // check if the response props are the same values as the <testClient> props
    expect(responseBody.newClient.name).toBe(testClient.name)
    expect(responseBody.newClient.email).toBe(testClient.email)
    expect(responseBody.newClient.amountOfOrders).toBe(testClient.amountOfOrders)

    // check if the response props are the same primitive types as the <testClient> props
    expect(typeof responseBody.newClient.name).toBe('string')
    expect(typeof responseBody.newClient.email).toBe('string')
    expect(typeof responseBody.newClient.amountOfOrders).toBe('number')

    // finally delete the created client as a form of teardown
    const clientDeletedResponse = await request.delete(`/api/clients/${clientID}/delete`)
    expect(clientDeletedResponse.status()).toBe(200)
})
