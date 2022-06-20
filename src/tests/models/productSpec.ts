import { productDatabase, product } from '../../models/products';

const model = new productDatabase();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(model.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(model.showProduct).toBeDefined();
  });

  it('should have a create method', () => {
    expect(model.createProduct).toBeDefined();
  });

  it('should have an update method', () => {
    expect(model.updateProduct).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(model.deleteProduct).toBeDefined();
  });
});
