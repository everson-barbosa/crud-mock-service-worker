import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
// import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest'
// import { server } from "./src/mocks/node";

/*
beforeAll(() => {
    server.listen()
})

beforeEach(() => {
    server.resetHandlers()
})
*/

afterEach(() => {
    cleanup()
})

/*
afterAll(() => {
    server.close()
})
*/
