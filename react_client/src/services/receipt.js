const PRODUCT_CATEGORY_FOOD = 'food'
const PRODUCT_CATEGORY_CLOTHING = 'clothing'

const LOCATION_TAX = {
  'CA': {
    rate: 0.0975, // 9.75%
    exempt: [PRODUCT_CATEGORY_FOOD]
  },
  'NY': {
    rate: 0.0875, // 8.875%
    exempt: [PRODUCT_CATEGORY_FOOD, PRODUCT_CATEGORY_CLOTHING]
  }
}

function roundUpSalesTaxNearestZeroZeroPointFive (salesTax) { // rounded up to the nearest 0.05
  return (Math.ceil(salesTax * 20) / 20)
}

function productTaxByLocationNotRounded (location, productPrice, productCategory, qty) {
  let tax = 0
  Object.keys(LOCATION_TAX).forEach((key) => {
    if (key === location && !LOCATION_TAX[key]['exempt'].includes(productCategory)) {
      tax = productPrice * LOCATION_TAX[key]['rate'] * qty
    }
  })
  return tax
}

function productTaxByLocation (location, productPrice, productCategory, qty) {
  return roundUpSalesTaxNearestZeroZeroPointFive(productTaxByLocationNotRounded(location, productPrice, productCategory, qty))
}

export { PRODUCT_CATEGORY_FOOD, PRODUCT_CATEGORY_CLOTHING, roundUpSalesTaxNearestZeroZeroPointFive, productTaxByLocation }
