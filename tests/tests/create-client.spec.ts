import test, { expect } from "@playwright/test";

test("Create a new client record", async ({ request }) => {

    const testClient = { name: "Test name", email: "Test@email.com", amountOfOrders: 0 }
    const response = await request.post('/api/clients/create', { data: testClient })

    const responseBody = await response.json()
    expect(response.status()).toBe(201)

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
})

