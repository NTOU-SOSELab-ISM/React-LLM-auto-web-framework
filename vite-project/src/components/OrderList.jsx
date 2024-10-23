import React, { useState } from 'react';
import '/src/styles/OrderList.css';

function OrderList({ orders, onDeleteOrders, totalPrice }) {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const toggleSelectOrder = (order) => {
    setSelectedOrders(prev =>
      prev.includes(order)
        ? prev.filter(o => o !== order)
        : [...prev, order]
    );
  };

  const handleDeleteOrders = () => {
    onDeleteOrders(selectedOrders);
    setSelectedOrders([]);
  };

  return (
    <div className="order-list">
      <h2>訂購清單</h2>
      <table>
        <thead>
          <tr className="gray-row">
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
            <tr key={index} className="light-gray-row">
              <td>
                <input
                  type="checkbox"
                  onChange={() => toggleSelectOrder(order)}
                  checked={selectedOrders.includes(order)}
                />
              </td>
              <td>{order.drink}</td>
              <td>{order.size}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.amount}</td>
              <td>{order.temperature}</td>
              <td>{order.sweetness}</td>
              <td>{order.orderPerson}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="order-list-footer">
        <button className="delete-btn" onClick={handleDeleteOrders}>刪除勾選</button>
        <span>總計 {orders.length} 份 {totalPrice} 元</span>
        <button className="checkout-btn">結帳</button>
      </div>
    </div>
  );
}

export default OrderList;
