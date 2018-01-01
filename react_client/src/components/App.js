import React, { Component } from 'react'
import { CardHeader, CardBody, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import './App.css'
import { mockProducts } from '../mock_datas/products'
import Product from './Product'
import {
  LOCATION_TAX,
  PRODUCT_CATEGORY_FOOD,
  PRODUCT_CATEGORY_BOOK,
  PRODUCT_CATEGORY_STATIONARY,
  PRODUCT_CATEGORY_CLOTHING
} from '../configuration'

import Receipt from './Receipt'

const style = {
  leftPanel: {
    backgroundColor: '#dee2e6',
    width: '200px'
  },
  rightPanel: {
    flex: 3,
    overflow: 'scroll'
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  productList: {
    flex: 1
  },
  productListCardBody: {
    display: 'flex',
    padding: '0px',
    flexWrap: 'wrap'
  },
  shoppingCart: {
    flex: 1
  },
  shoppingCartCardBody: {
    display: 'flex',
    padding: '0px',
    flexWrap: 'wrap'
  },
  receipt: {
    flex: 1,
    display: 'inline'
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.addToCart = this.addToCart.bind(this)
    this.toggle = this.toggle.bind(this)
    this.removeProductFromCart = this.removeProductFromCart.bind(this)
    this.createTestCart = this.createTestCart.bind(this)
    this.state = {
      productList: mockProducts,
      shoppingCart: {},
      location: 'CA',
      dropdownOpen: false
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

  toggle () {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  updateLocation (location) {
    this.setState({ location: location })
  }

  removeProductFromCart (productId) {
    let cloneShoppingCartObject = Object.assign({}, this.state.shoppingCart)
    delete cloneShoppingCartObject[productId.toString()]
    this.setState({ shoppingCart: cloneShoppingCartObject })
  }

  clearShoppingCart () {
    this.setState({ shoppingCart: {} })
  }

  createTestCart (caseNumber) {
    switch (caseNumber) {
      case 1:
        this.setState({
          shoppingCart: {
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
        })
        break
      case 2:
        this.setState({ shoppingCart: {
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
        } })
        break
      case 3:
        this.setState({ shoppingCart: {
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
        } })
        break
    }
  }

  render () {
    return (
      <div style={{ display: 'flex', height: '100%', minWith: '220px' }}>
        <div style={style.leftPanel}>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{ margin: '10px' }}>
            <DropdownToggle style={{ width: '100%' }} caret>
              {LOCATION_TAX[this.state.location].name}
            </DropdownToggle>
            <DropdownMenu style={{ width: '100%' }}>
              {Object.keys(LOCATION_TAX).map((key) => {
                return (
                  <DropdownItem
                    key={`dropdown-item_${key}`}
                    value={key}
                    onClick={e => (this.updateLocation(e.target.value))}
                  >
                    {LOCATION_TAX[key].name}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
          <Button style={{ width: '100%' }} outline color="danger" onClick={() => this.clearShoppingCart()}>Clear Cart</Button>
          <Button style={{ width: '100%' }} outline color="primary" onClick={() => this.createTestCart(1)}>Use case 1</Button>
          <Button style={{ width: '100%' }} outline color="primary" onClick={() => this.createTestCart(2)}>Use case 2</Button>
          <Button style={{ width: '100%' }} outline color="primary" onClick={() => this.createTestCart(3)}>Use case 3</Button>
        </div>
        <div style={style.rightPanel}>
          <div style={style.container}>
            <div style={style.productList}>
              <CardHeader>Product List</CardHeader>
              <CardBody style={style.productListCardBody}>
                {this.state.productList.map(product => (
                  <Product
                    key={`product_${product.id}`}
                    product={product}
                    actionButton={<Button style={{ width: '100%' }} color="primary" onClick={() => this.addToCart(product)}>Add to Cart</Button>}
                  />))}
              </CardBody>
            </div>
            <div style={style.shoppingCart}>
              <CardHeader>Shopping Cart</CardHeader>
              <CardBody style={style.shoppingCartCardBody}>
                {Object.keys(this.state.shoppingCart).map(key => (
                  <Product
                    key={`product_${this.state.shoppingCart[key].id}`}
                    product={this.state.shoppingCart[key]}
                    actionButton={<Button style={{ width: '100%' }} color="danger" onClick={() => this.removeProductFromCart(this.state.shoppingCart[key].id)}>Remove</Button>}
                  />))}
              </CardBody>
            </div>
            <div style={style.receipt}>
              <CardHeader>Receipt</CardHeader>
              <CardBody>
                <Receipt location={this.state.location} shoppingCart={this.state.shoppingCart}/>
              </CardBody>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
