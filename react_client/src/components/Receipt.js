import React from 'react'
import { Table } from 'reactstrap'
import PropTypes from 'prop-types'

import { calculateCartSubTotalTaxTotal } from '../services/receipt'

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
          <th style={{ border: 'none' }}>item</th>
          <th style={{ border: 'none' }}>price</th>
          <th style={{ border: 'none' }}>qty</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(shoppingCart).map(key => {
          return (
            <tr key={`cart-item_${key}`}>
              <td style={{ border: 'none' }}>{shoppingCart[key].name}</td>
              <td style={{ border: 'none' }}>{shoppingCart[key].price.toFixed(2)}</td>
              <td style={{ border: 'none' }}>{shoppingCart[key].qty}</td>
            </tr>
          )
        })}
        <tr>
          <td style={{ border: 'none' }}>subtotal:</td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}>{`$${subtotal.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td style={{ border: 'none' }}>tax:</td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}>{`$${tax.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td style={{ border: 'none' }}>total:</td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}>{`$${total.toFixed(2)}`}</td>
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
