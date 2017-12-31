import React, { Component } from 'react'
import { Card, CardHeader, CardBody, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import './App.css'
import { mockProducts } from '../mock_datas/products'
import Product from './Product'
import { LOCATION_TAX } from '../configuration'
import Receipt from './Receipt'

const style = {
  leftPanel: {
    flex: 1,
    backgroundColor: '#dee2e6',
    minWidth: '200px'
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
  shoppingCartCardBody: {
    display: 'flex',
    padding: '0px'
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
    this.toggle = this.toggle.bind(this)
    this.removeProductFromCart = this.removeProductFromCart.bind(this)
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
          <Button style={{ width: '100%' }} color="danger" onClick={() => this.clearShoppingCart()} >Clear Cart</Button>
        </div>
        <div style={style.rightPanel}>
          <div style={style.container}>
            <Card style={style.productList}>
              <CardHeader>Product List</CardHeader>
              <CardBody style={style.productListCardBody}>
                {this.state.productList.map(product => (
                  <Product
                    key={`product_${product.id}`}
                    product={product}
                    actionButton={<Button color="primary" onClick={() => this.addToCart(product)}>Add to Cart</Button>}
                  />))}
              </CardBody>
            </Card>
            <Card style={style.shoppingCart}>
              <CardHeader>Shopping Cart</CardHeader>
              <CardBody style={style.shoppingCartCardBody}>
                {Object.keys(this.state.shoppingCart).map(key => (
                  <Product
                    key={`product_${this.state.shoppingCart[key].id}`}
                    product={this.state.shoppingCart[key]}
                    actionButton={<Button color="primary" onClick={() => this.removeProductFromCart(this.state.shoppingCart[key].id)}>Remove</Button>}
                  />))}
              </CardBody>
            </Card>
            <Card style={style.receipt}>
              <CardHeader>Shopping Receipt</CardHeader>
              <CardBody>
                <Receipt location={this.state.location} shoppingCart={this.state.shoppingCart}/>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default App
