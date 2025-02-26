import { faker } from '@faker-js/faker';
import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    output: {
      mode: 'split',
      target: './src/api/endpoints.ts',
      schemas: './src/api/model',
      client: 'react-query',
      mock: true,
      prettier: true,
      override: {
        mutator: {
          path: './src/api/http-client.ts',
          name: 'httpClient',
        },
        operations: {
          listPets: {
            mock: {
              properties: () => ({
                '[].id': () => faker.number.int({ min: 1, max: 99999 }),
              }),
            },
            query: {
              useQuery: true,
              useSuspenseQuery: true,
              useSuspenseInfiniteQuery: true,
              useInfinite: true,
              useInfiniteQueryParam: 'limit',
            },
          },
          showPetById: {
            mock: {
              data: () => ({
                id: faker.number.int({ min: 1, max: 99 }),
                name: faker.person.firstName(),
                tag: faker.helpers.arrayElement([
                  faker.word.sample(),
                  undefined,
                ]),
              }),
            },
          },
        },
        mock: {
          properties: {
            '/tag|name/': () => faker.person.lastName(),
          },
        },
      },
    },
    input: {
      target:'https://petstore.swagger.io/v2/swagger.json'
     },
  },
});