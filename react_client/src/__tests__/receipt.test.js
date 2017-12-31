import {
  PRODUCT_CATEGORY_FOOD,
  PRODUCT_CATEGORY_CLOTHING,
  roundUpSalesTaxNearestZeroZeroPointFive,
  productTaxByLocation
} from '../services/receipt'

describe('tests for rounded up to the nearest 0.05', () => {
  test('roundUpSalesTaxNearestZeroZeroPointFive mount should be rounded up to the nearest 0.05 for amount 1.13', () => {
    expect(roundUpSalesTaxNearestZeroZeroPointFive(1.13)).toBe(1.15)
  })

  test('roundUpSalesTaxNearestZeroZeroPointFive mount should be rounded up to the nearest 0.05 for amount 1.16', () => {
    expect(roundUpSalesTaxNearestZeroZeroPointFive(1.16)).toBe(1.2)
  })

  test('roundUpSalesTaxNearestZeroZeroPointFive mount should be rounded up to the nearest 0.05 for amount 1.151', () => {
    expect(roundUpSalesTaxNearestZeroZeroPointFive(1.151)).toBe(1.2)
  })
})

describe('tests for location CA', () => {
  test('tax of not exempt product by location in CA is calculated correctly with qty = 1', () => {
    const location = 'CA'
    const productPrice = 17.99
    const productCategory = 'other category'
    const qty = 1

    expect(productTaxByLocation(location, productPrice, productCategory, qty)).toBe(1.8) // 17.99 * 0.0975 = 1.754025
  })

  test('tax of not exempt product by location in CA is calculated correctly with qty = 3', () => {
    const location = 'CA'
    const productPrice = 17.99
    const productCategory = 'other category'
    const qty = 3

    expect(productTaxByLocation(location, productPrice, productCategory, qty)).toBe(5.3) // 17.99 * 0.0975 * 3 = 5.262075
  })

  test('tax of exempt product (food category) by location in CA is calculated correctly with qty = 1', () => {
    const location = 'CA'
    const productPrice = 3.99
    const productCategory = PRODUCT_CATEGORY_FOOD
    const qty = 1

    expect(productTaxByLocation(location, productPrice, productCategory, qty)).toBe(0)
  })

  test('tax of exempt product (food category) by location in CA is calculated correctly with qty = 3', () => {
    const location = 'CA'
    const productPrice = 3.99
    const productCategory = PRODUCT_CATEGORY_FOOD
    const qty = 3

    expect(productTaxByLocation(location, productPrice, productCategory, qty)).toBe(0)
  })
})

describe('tests for location NY', () => {
  test('tax of not exempt product by location in NY is calculated correctly with qty = 1', () => {
    const location = 'NY'
    const productPrice = 2.99
    const productCategory = 'other category'
    const qty = 1

    expect(productTaxByLocation(location, productPrice, productCategory, qty)).toBe(0.3) // 2.99 * 0.0875 = 0.261625
  })

  test('tax of not exempt product by location in NY is calculated correctly with qty = 2', () => {
    const location = 'NY'
    const productPrice = 2.99
    const productCategory = 'other category'
    const qty = 2

    expect(productTaxByLocation(location, productPrice, productCategory, qty)).toBe(0.55) // 2.99 * 0.0875 * 2
  })

  test('tax of exempt product (food category) by location in NY is calculated correctly with qty = 1', () => {
    const location = 'NY'
    const productPrice = 3.99
    const productCategory = PRODUCT_CATEGORY_FOOD
    const qty = 1

    expect(productTaxByLocation(location, productPrice, productCategory, qty)).toBe(0)
  })

  test('tax of exempt product (food category) by location in NY is calculated correctly with qty = 3', () => {
    const location = 'NY'
    const productPrice = 3.99
    const productCategory = PRODUCT_CATEGORY_FOOD
    const qty = 3

    expect(productTaxByLocation(location, productPrice, productCategory, qty)).toBe(0)
  })

  test('tax of exempt product (clothing category) by location in NY is calculated correctly with qty = 1', () => {
    const location = 'NY'
    const productPrice = 2.99
    const productCategory = PRODUCT_CATEGORY_CLOTHING
    const qty = 1

    expect(productTaxByLocation(location, productPrice, productCategory, qty)).toBe(0)
  })

  test('tax of exempt product (clothing category) by location in NY is calculated correctly with qty = 3', () => {
    const location = 'NY'
    const productPrice = 2.99
    const productCategory = PRODUCT_CATEGORY_CLOTHING
    const qty = 3

    expect(productTaxByLocation(location, productPrice, productCategory, qty)).toBe(0)
  })
})
