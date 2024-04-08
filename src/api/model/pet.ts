/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * Swagger Petstore
 * This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 * OpenAPI spec version: 1.0.7
 */
import type { Category } from "./category";
import type { PetStatus } from "./petStatus";
import type { Tag } from "./tag";

export interface Pet {
  category?: Category;
  id?: number;
  name: string;
  photoUrls: string[];
  /** pet status in the store */
  status?: PetStatus;
  tags?: Tag[];
}
