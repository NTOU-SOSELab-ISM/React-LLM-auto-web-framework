import React, { useState, useEffect } from 'react'
import OrderForm from './components/OrderForm'
import OrderTable from './components/OrderTable'
import { loadDrinkData } from './store/utils'

function App() {
  const [orders, setOrders] = useState([])
  const [drinkData, setDrinkData] = useState([])
  const [lastCustomerName, setLastCustomerName] = useState('')

  useEffect(() => {
    const data = loadDrinkData()
    setDrinkData(data)
  }, [])

  const addOrder = (order) => {
    setOrders([...orders, order])
    setLastCustomerName(order.customerName)
  }

  const deleteSelectedOrders = (selectedOrders) => {
    const newOrders = orders.filter((_, index) => !selectedOrders.includes(index))
    setOrders(newOrders)
    if (newOrders.length === 0) {
      setLastCustomerName('')
    }
  }

  const handleCheckout = () => {
    if (orders.length === 0) {
      alert('請先新增訂單！')
      return
    }

    const total = orders.reduce((sum, order) => sum + order.amount, 0)
    const totalCount = orders.reduce((sum, order) => sum + order.quantity, 0)
    
    alert(`訂單明細：\n${orders.map(order => 
      `${order.drinkName} ${order.size} ${order.temperature} ${order.sweetness} x${order.quantity} = ${order.amount}元 (${order.customerName})`
    ).join('\n')}\n\n總計：${totalCount}份，${total}元`)
    
    setOrders([])
    setLastCustomerName('')
  }

  return (
    <div className="container">
      <OrderForm 
        drinkData={drinkData} 
        onSubmit={addOrder}
        lastCustomerName={lastCustomerName}
      />
      <OrderTable 
        orders={orders}
        onDelete={deleteSelectedOrders}
        onCheckout={handleCheckout}
      />
    </div>
  )
}

export default App