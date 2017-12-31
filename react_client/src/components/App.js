import React, { Component } from 'react'
import { Card, CardHeader, CardBody, Button } from 'reactstrap'
import './App.css'
import { mockProducts } from '../mock_datas/products'
import Product from './Product'

const style = {
  leftPanel: {
    flex: 1,
    backgroundColor: '#dee2e6'
  },
  rightPanel: {
    flex: 3
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  productList: {
    flex: 1,
    minHeight: '220px'
  },
  productListCardBody: {
    display: 'flex',
    padding: '0px'
  },
  shoppingCart: {
    flex: 1,
    minHeight: '220px'
  },
  receipt: {
    flex: 1,
    minHeight: '220px'
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.addToCart = this.addToCart.bind(this)
    this.state = {
      productList: mockProducts,
      shoppingCart: {}
    }
  }

  addToCart (product) {
    let cloneShoppingCartObject = Object.assign({}, this.state.shoppingCart)
    if (cloneShoppingCartObject[product.id.toString()]) {
      cloneShoppingCartObject[product.id.toString()].qty = cloneShoppingCartObject[product.id.toString()].qty + 1
    } else {
      cloneShoppingCartObject[product.id.toString()] = {
        qty: 1,
        ...product
      }
    }
    this.setState({ shoppingCart: cloneShoppingCartObject })
  }

  render () {
    return (
      <div style={{ display: 'flex', height: '100%', minWith: '220px' }}>
        <div style={style.leftPanel}>

        </div>
        <div style={style.rightPanel}>
          <div style={style.container}>
            <Card style={style.productList}>
              <CardHeader>Product List</CardHeader>
              <CardBody style={style.productListCardBody}>
                { this.state.productList.map(product => (
                  <Product
                    key={`product_${product.id}`}
                    product={product}
                    actionButton={<Button color="primary" onClick={() => this.addToCart(product)}>Add to Cart</Button>}
                  />)) }
              </CardBody>
            </Card>
            <Card style={style.shoppingCart}>
              <CardHeader>Shopping Cart</CardHeader>
            </Card>
            <Card style={style.receipt}>
              <CardHeader>Shopping Receipt</CardHeader>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default App
