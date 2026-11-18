import { faker } from '@faker-js/faker';
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
 
// Пароль: рівно 8 символів, літери + цифри
const password =
  faker.string.alpha({ length: 5, casing: 'mixed' }) +
  faker.string.numeric({ length: 3 });
 
export const signupData = {
  email: faker.internet
    .email({
      firstName,
      lastName,
      provider: 'example.com',
    })
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, ''),
  firstName,
  lastName,
  password,
};
