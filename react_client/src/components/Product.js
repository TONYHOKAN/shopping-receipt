import React from 'react'
import { Card, CardBody } from 'reactstrap'
import PropTypes from 'prop-types'

const Product = (props) => {
  const { product, actionButton } = props
  const { name, category, price } = product
  return (
    <Card style={{ width: '140px', height: '140px', margin: '10px' }}>
      <CardBody style={{ padding: '5px' }}>
        <div>
          {name}
        </div>
        <div>
          {price}
        </div>
        <div>
          {category}
        </div>
        { actionButton }
      </CardBody>
    </Card>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  actionButton: PropTypes.node
}

export default Product
