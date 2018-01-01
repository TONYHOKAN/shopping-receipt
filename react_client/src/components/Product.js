import React from 'react'
import { Card, CardBody, CardFooter, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'

const Product = (props) => {
  const { product, actionButton } = props
  const { name, category, price, qty } = product
  return (
    <Card style={{ width: '180px', height: '180px', margin: '10px', fontSize: '0.9rem' }}>
      <CardBody style={{ padding: '5px' }}>
        <Row noGutters={true}>
          <Col sm="5">item:</Col>
          <Col sm="7">{name}</Col>
        </Row>
        <Row noGutters={true}>
          <Col sm="5">price:</Col>
          <Col sm="7">{price}</Col>
        </Row>
        <Row noGutters={true}>
          <Col sm="5">category:</Col>
          <Col sm="7">{category}</Col>
        </Row>
        { qty && (
          <Row noGutters={true}>
            <Col sm="5">qty:</Col>
            <Col sm="7">{qty}</Col>
          </Row>
        )}
      </CardBody>
      { actionButton && <CardFooter>{ actionButton }</CardFooter>}
    </Card>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  actionButton: PropTypes.node,
  qty: PropTypes.number
}

export default Product
