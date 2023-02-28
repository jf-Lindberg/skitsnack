import { prismaMock } from '../../setup/prisma/singleton';
import { createUserByEmailAndPassword } from '../../../services/users.services';
import bcrypt from 'bcrypt';

test('should create new user ', async () => {
    const userInput = {
        email: 'test_three@prisma.io',
        password: 'testing'
    };

    const userResponse = {
        email: userInput.email,
        password: bcrypt.hashSync(userInput.password, 12)
    };

    // @ts-ignore
    prismaMock.user.create.mockResolvedValue(userInput);

    await expect(createUserByEmailAndPassword(userInput)).resolves.toContain(userResponse);
});
