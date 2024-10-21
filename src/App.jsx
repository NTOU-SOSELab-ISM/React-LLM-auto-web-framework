import React, { useState } from 'react';
import OrderTable from './components/OrderTable';
import OrderForm from './components/OrderForm';
import './styles/App.css';

function App() {
  const [orderList, setOrderList] = useState([]);

  const addOrder = (newOrder) => {
    setOrderList([...orderList, newOrder]);
  };

  const totalCount = orderList.length;
  const totalPrice = orderList.reduce((sum, order) => sum + order.amount, 0);

  const checkout = () => {
    if (orderList.length === 0) {
      alert('沒有任何訂單可以結帳！');
      return;
    }
    const orderSummary = orderList.map(order => `${order.name} ${order.size} x${order.quantity} = ${order.amount}元`).join('\n');
    alert(`訂單明細:\n${orderSummary}\n總金額: ${totalPrice}元`);
    setOrderList([]);
  };

  return (
    <div>
      <h1>來點什麼...</h1>

      <OrderForm addOrder={addOrder} />
      <h1>訂購清單</h1>
      <OrderTable
        orderList={orderList}
        setOrderList={setOrderList}
        totalCount={totalCount}
        totalPrice={totalPrice}
        checkout={checkout}
      />
    </div>
  );
}

export default App;
