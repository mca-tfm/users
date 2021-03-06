const UserRequestDto = require('../../../src/dtos/userRequestDto');
const { NoErrorThrownError, getError } = require('../errors/noErrorThrownError');

describe('userRequestDto tests', () => {
  test('Given an invalid username When call constructor Then should throw an error', async () => {
    const error = await getError(async () => new UserRequestDto({ username: 'notAnEmail', password: 'P4ssword' }));

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty('message', 'Username must be a valid email');
  });

  test('Given an invalid password without uppercase When call constructor Then should throw an error', async () => {
    const error = await getError(async () => new UserRequestDto({ username: 'user@email.com', password: 'p4ssword' }));

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty('message', 'Password must have UpperCase, LowerCase and Number with at least 8 characters');
  });

  test('Given an invalid password without lowercase When call constructor Then should throw an error', async () => {
    const error = await getError(async () => new UserRequestDto({ username: 'user@email.com', password: 'P4SSWORD' }));

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty('message', 'Password must have UpperCase, LowerCase and Number with at least 8 characters');
  });

  test('Given an invalid password without number When call constructor Then should throw an error', async () => {
    const error = await getError(async () => new UserRequestDto({ username: 'user@email.com', password: 'Password' }));

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty('message', 'Password must have UpperCase, LowerCase and Number with at least 8 characters');
  });

  test('Given an invalid password without eight characters When call constructor Then should throw an error', async () => {
    const error = await getError(async () => new UserRequestDto({ username: 'user@email.com', password: 'P4sswor' }));

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty('message', 'Password must have UpperCase, LowerCase and Number with at least 8 characters');
  });

  test('Given an valid username and password When call constructor Then should return an UserRequestDto', () => {
    const userRequestDto = new UserRequestDto({ username: 'user@email.com', password: 'P4ssword1' });

    expect(userRequestDto.username).toBe('user@email.com');
    expect(userRequestDto.password).toBe('P4ssword1');
  });
});
