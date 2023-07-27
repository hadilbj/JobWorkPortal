//import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import TABLE_HEAD from '../pages/UserPage'

// ----------------------------------------------------------------------

const users = users.map((user, index) => ({
  id: user.id,
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: user.name,
  company: user.company,
  isVerified: user.isVerified,
  status: sample(['active', 'banned']),
  role: sample(TABLE_HEAD), // Assuming TABLE_HEAD is an array of roles
}));

export default users;


/* import { faker } from 'faker';

const users = [...Array(24)].map(() => {
  const id = faker.datatype.uuid();
  //const avatarUrl = `/assets/images/avatars/avatar_${index + 1}.jpg`;
  const name = faker.name.fullName();
  const company = faker.company.name();
  const isVerified = faker.datatype.boolean();
  const status = faker.random.arrayElement(['active', 'banned']);

  const role = prompt(`Quel rôle souhaitez-vous pour l'utilisateur ${name}?`);

  return {
    id,
    //avatarUrl,
    name,
    company,
    isVerified,
    status,
    role,
  };
});

export default users;
 */