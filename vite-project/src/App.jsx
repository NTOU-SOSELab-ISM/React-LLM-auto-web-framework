import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import OrderTable from './components/OrderTable';
import OrderList from './components/OrderList';
import { fetchDrinkData } from './utils/csvLoader';

function App() {
  const [orders, setOrders] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [orderPerson, setOrderPerson] = useState('');

  useEffect(() => {
    fetchDrinkData().then(data => setDrinkData(data));
  }, []);

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const deleteOrders = (selectedOrders) => {
    setOrders(orders.filter(order => !selectedOrders.includes(order)));
  };

  const totalPrice = useMemo(() => {
    return orders.reduce((total, order) => total + order.amount, 0);
  }, [orders]);

  return (
    <div className="App">
      <h1>飲料訂購系統</h1>
      <OrderTable
        drinkData={drinkData}
        onAddOrder={addOrder}
        orderPerson={orderPerson}
        setOrderPerson={setOrderPerson}
      />
      <OrderList
        orders={orders}
        onDeleteOrders={deleteOrders}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default App;
