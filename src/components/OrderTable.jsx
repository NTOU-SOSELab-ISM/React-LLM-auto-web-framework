import React, { useState } from 'react'

function OrderTable({ orders, onDelete, onCheckout }) {
  const [selectedOrders, setSelectedOrders] = useState([])

  const handleCheckboxChange = (index) => {
    setSelectedOrders(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  const handleDelete = () => {
    if (selectedOrders.length === 0) {
      alert('請先選擇要刪除的訂單！')
      return
    }
    onDelete(selectedOrders)
    setSelectedOrders([])
  }

  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0)
  const totalCount = orders.reduce((sum, order) => sum + order.quantity, 0)

  return (
    <div className="order-table">
      <h2>訂購清單</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th>容量</th>
            <th>單價</th>
            <th>數量</th>
            <th>金額</th>
            <th>溫度</th>
            <th>甜度</th>
            <th>訂購人</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>
                <input 
                  type="checkbox"
                  checked={selectedOrders.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>{order.drinkName}</td>
              <td>{order.size}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.amount}</td>
              <td>{order.temperature}</td>
              <td>{order.sweetness}</td>
              <td>{order.customerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <div className="left-actions">
          <button onClick={handleDelete} className="delete-btn">刪除勾選</button>
          <span className="total-info">
            總計 {totalCount}份 {totalAmount}元
          </span>
        </div>
        <button onClick={onCheckout} className="checkout-btn">結帳</button>
      </div>
    </div>
  )
}

export default OrderTable