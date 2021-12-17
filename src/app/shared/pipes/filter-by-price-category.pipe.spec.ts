import { FilterByPriceCategoryPipe } from './filter-by-price-category.pipe';

describe('FilterByPriceCategoryPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByPriceCategoryPipe();
    expect(pipe).toBeTruthy();
  });
});
