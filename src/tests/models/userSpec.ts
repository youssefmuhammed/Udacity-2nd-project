import { userDatabase, user } from '../../models/users';

const model = new userDatabase();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(model.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(model.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(model.createUser).toBeDefined();
  });

  it('should have an update method', () => {
    expect(model.updateUser).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(model.deleteUser).toBeDefined();
  });
});
