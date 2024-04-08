/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * Swagger Petstore
 * This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 * OpenAPI spec version: 1.0.7
 */

/**
 * pet status in the store
 */
export type PetStatus = typeof PetStatus[keyof typeof PetStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PetStatus = {
  available: "available",
  pending: "pending",
  sold: "sold",
} as const;
