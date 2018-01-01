import React from 'react'
import { Table } from 'reactstrap'
import PropTypes from 'prop-types'

import { calculateCartSubTotalTaxTotal } from '../services/receipt'

const style = {
  itemColumn: {
    border: 'none',
    textAlign: 'left'
  },
  priceColumn: {
    border: 'none',
    textAlign: 'right'
  },
  qtyColumn: {
    border: 'none',
    textAlign: 'right'
  }
}

const Receipt = (props) => {
  const { location, shoppingCart } = props
  if (Object.keys(shoppingCart).length === 0) {
    return null
  }
  const { subtotal, tax, total } = calculateCartSubTotalTaxTotal(location, shoppingCart)
  return (
    <Table size="sm" className="borderless">
      <thead style={{ border: 'none' }}>
        <tr>
          <th style={style.itemColumn}>item</th>
          <th style={style.priceColumn}>price</th>
          <th style={style.qtyColumn}>qty</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(shoppingCart).map(key => {
          return (
            <tr key={`cart-item_${key}`}>
              <td style={style.itemColumn}>{shoppingCart[key].name}</td>
              <td style={style.priceColumn}>{shoppingCart[key].price.toFixed(2)}</td>
              <td style={style.qtyColumn}>{shoppingCart[key].qty}</td>
            </tr>
          )
        })}
        <tr>
          <td style={style.itemColumn}>subtotal:</td>
          <td style={style.priceColumn}></td>
          <td style={style.qtyColumn}>{`$${subtotal.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td style={style.itemColumn}>tax:</td>
          <td style={style.priceColumn}></td>
          <td style={style.qtyColumn}>{`$${tax.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td style={style.itemColumn}>total:</td>
          <td style={style.priceColumn}></td>
          <td style={style.qtyColumn}>{`$${total.toFixed(2)}`}</td>
        </tr>
      </tbody>
    </Table>
  )
}

Receipt.propTypes = {
  location: PropTypes.string.isRequired,
  shoppingCart: PropTypes.object.isRequired
}

export default Receipt
