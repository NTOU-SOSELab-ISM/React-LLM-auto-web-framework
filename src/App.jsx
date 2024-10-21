import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { loadCSVData } from './store/utils.js';
import OrderForm from './components/OrderForm.jsx';
import OrderTable from './components/OrderTable.jsx';

function App() {
  const [drinks, setDrinks] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderPerson, setOrderPerson] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadCSVData();
      setDrinks(data);
    };
    fetchData();
  }, []);

  const addOrder = (newOrder) => {
    setOrderList([...orderList, newOrder]);
    setTotalCount(totalCount + 1);
    setTotalPrice(totalPrice + newOrder.amount);
    if (!orderPerson) setOrderPerson(newOrder.person);
  };

  const deleteSelectedOrders = () => {
    const remainingOrders = orderList.filter(order => !order.isSelected);
    setOrderList(remainingOrders);
    setTotalCount(remainingOrders.length);
    setTotalPrice(remainingOrders.reduce((acc, curr) => acc + curr.amount, 0));
  };

  const checkout = () => {
    alert(`訂單明細:\n${orderList.map(o => `${o.name} x${o.quantity} = ${o.amount}元`).join('\n')}\n總金額: ${totalPrice}元`);
    setOrderList([]);
    setTotalCount(0);
    setTotalPrice(0);
    setOrderPerson('');
  };
  

  return (
    <div className="app">
      <div className="selection-area">
        <h1>來點什麼...</h1>
        <OrderForm
          drinks={drinks}
          orderPerson={orderPerson}
          setOrderPerson={setOrderPerson}
          addOrder={addOrder}
        />
      </div>
      <div className="order-list">
        <h1>訂購清單</h1>
        <OrderTable
          orderList={orderList}
          deleteSelectedOrders={deleteSelectedOrders}
          totalCount={totalCount}
          totalPrice={totalPrice}
          checkout={checkout}
        />
      </div>
    </div>
  );
}

export default App;
