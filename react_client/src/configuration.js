const PRODUCT_CATEGORY_FOOD = 'food'
const PRODUCT_CATEGORY_CLOTHING = 'clothing'
const PRODUCT_CATEGORY_BOOK = 'book'
const PRODUCT_CATEGORY_STATIONARY = 'stationary'

const LOCATION_TAX = {
  'CA': {
    rate: 0.0975, // 9.75%
    exempt: [PRODUCT_CATEGORY_FOOD],
    name: 'California'
  },
  'NY': {
    rate: 0.0875, // 8.875%
    exempt: [PRODUCT_CATEGORY_FOOD, PRODUCT_CATEGORY_CLOTHING],
    name: 'New York'
  }
}

export {
  PRODUCT_CATEGORY_FOOD,
  PRODUCT_CATEGORY_CLOTHING,
  PRODUCT_CATEGORY_BOOK,
  PRODUCT_CATEGORY_STATIONARY,
  LOCATION_TAX
}
