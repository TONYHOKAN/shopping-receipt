import {
  roundUpSalesTaxNearestZeroZeroPointFive,
  productTaxByLocation,
  calculateCartSubTotalTaxTotal
} from '../services/receipt'

import {
  PRODUCT_CATEGORY_FOOD,
  PRODUCT_CATEGORY_CLOTHING,
  PRODUCT_CATEGORY_BOOK,
  PRODUCT_CATEGORY_STATIONARY
} from '../configuration'

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

describe('tests for calculating subtotal tax total, ', () => {
  test('test for Location: CA, 1 book at 17.99, 1 potato chips at 3.99', () => {
    const location = 'CA'
    const shoppingCart = {
      '1': {
        id: 1,
        'name': 'book',
        'category': PRODUCT_CATEGORY_BOOK,
        'price': 17.99,
        'qty': 1
      },
      '2': {
        id: 2,
        'name': 'potato chips',
        'category': PRODUCT_CATEGORY_FOOD,
        'price': 3.99,
        'qty': 1
      }
    }
    const { subtotal, tax, total } = calculateCartSubTotalTaxTotal(location, shoppingCart)
    expect(subtotal).toBe(21.98)
    expect(tax).toBe(1.8)
    expect(total).toBe(23.78)
  })

  test('test for Location: NY, 1 book at 17.99, 3 pencils at 2.99', () => {
    const location = 'NY'
    const shoppingCart = {
      '1': {
        id: 1,
        'name': 'book',
        'category': PRODUCT_CATEGORY_BOOK,
        'price': 17.99,
        'qty': 1
      },
      '3': {
        id: 3,
        'name': 'pencil',
        'category': PRODUCT_CATEGORY_STATIONARY,
        'price': 2.99,
        'qty': 3
      }
    }
    const { subtotal, tax, total } = calculateCartSubTotalTaxTotal(location, shoppingCart)
    expect(subtotal).toBe(26.96)
    expect(tax).toBe(2.4)
    expect(total).toBe(29.36)
  })

  test('test for NY, 2 pencils at 2.99, 1 shirt at 29.99', () => {
    const location = 'NY'
    const shoppingCart = {
      '3': {
        id: 3,
        'name': 'pencil',
        'category': PRODUCT_CATEGORY_STATIONARY,
        'price': 2.99,
        'qty': 2
      },
      '4': {
        id: 4,
        'name': 'shirt',
        'category': PRODUCT_CATEGORY_CLOTHING,
        'price': 29.99,
        'qty': 1
      }
    }
    const { subtotal, tax, total } = calculateCartSubTotalTaxTotal(location, shoppingCart)
    expect(subtotal).toBe(35.97)
    expect(tax).toBe(0.55)
    expect(total).toBe(36.52)
  })
})
