import React, { Component } from 'react'
import { Card, CardHeader } from 'reactstrap'
import './App.css'

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
    flex: 1
  },
  shoppingCart: {
    flex: 1
  },
  receipt: {
    flex: 1
  }
}

class App extends Component {
  render () {
    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={style.leftPanel}>

        </div>
        <div style={style.rightPanel}>
          <div style={style.container}>
            <Card style={style.productList}>
              <CardHeader>Product List</CardHeader>
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
