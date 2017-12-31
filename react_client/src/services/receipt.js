import {
  LOCATION_TAX
} from '../configuration'

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

export { roundUpSalesTaxNearestZeroZeroPointFive, productTaxByLocation }
