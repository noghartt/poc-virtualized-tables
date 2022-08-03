import { faker } from '@faker-js/faker';

export type Product = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: string;
}

const createProduct = (index: number): Product => ({
  id: index + 1,
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  quantity: Math.round((Math.random() * 50)) + 1,
  price: faker.commerce.price(),
});

export const mockData = (createItems: number) => {
  const rows = new Array(createItems)
    .fill(0)
    .map((_, i) => createProduct(i))

  return { rows };
}
