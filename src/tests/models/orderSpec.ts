import { orderDatabase, order } from '../../models/orders';

const model = new orderDatabase();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(model.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(model.showOrder).toBeDefined();
  });

  it('should have a create method', () => {
    expect(model.createOrder).toBeDefined();
  });

  it('should have an update method', () => {
    expect(model.updateOrder).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(model.deleteOrder).toBeDefined();
  });
});
