import BigNumber from 'bignumber.js'
import {
  LOCATION_TAX
} from '../configuration'

function roundUpSalesTaxNearestZeroZeroPointFive (salesTax) { // rounded up to the nearest 0.05
  return (Math.ceil(salesTax * 20) / 20)
}

function productTaxByLocationNotRounded (location, productPrice, productCategory, qty) {
  let tax = 0
  Object.keys(LOCATION_TAX).forEach((key) => {
    if (key === location && !LOCATION_TAX[key].exempt.includes(productCategory)) {
      tax = productPrice * LOCATION_TAX[key].rate * qty
    }
  })
  return tax
}

function productTaxByLocation (location, productPrice, productCategory, qty) {
  return roundUpSalesTaxNearestZeroZeroPointFive(productTaxByLocationNotRounded(location, productPrice, productCategory, qty))
}

function calculateCartSubTotalTaxTotal (location, shoppingCart) {
  console.log()
  let subtotal = new BigNumber(0.0)
  let tax = new BigNumber(0.0)
  Object.keys(shoppingCart).forEach((key) => {
    let item = shoppingCart[key]
    subtotal = subtotal.plus(new BigNumber(item.price * item.qty))
    tax = tax.plus(new BigNumber(productTaxByLocation(location, item.price, item.category, item.qty)))
  })
  const total = subtotal.plus(tax)
  return { subtotal: subtotal.toNumber(), tax: tax.toNumber(), total: total.toNumber() }
}

export { roundUpSalesTaxNearestZeroZeroPointFive, productTaxByLocation, calculateCartSubTotalTaxTotal }
