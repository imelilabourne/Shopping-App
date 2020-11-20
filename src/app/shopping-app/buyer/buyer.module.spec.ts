import { BuyerModule } from './buyer.module';

describe('BuyerModule', () => {
  let buyerModule: BuyerModule;

  beforeEach(() => {
    buyerModule = new BuyerModule();
  });

  it('should create an instance', () => {
    expect(buyerModule).toBeTruthy();
  });
});
