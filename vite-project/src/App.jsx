// src/App.jsx
import { useState, useEffect, useMemo } from 'react';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import { drinksData } from './data/drinks';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [drinkOptions, setDrinkOptions] = useState({
    drinks: [],
    sizes: {},
    prices: {},
    temperatures: [],
    sweetness: []
  });

  // Parse CSV data on component mount
  useEffect(() => {
    const parseCSVData = () => {
      const lines = drinksData.split('\n').slice(1); // Skip header
      const drinks = new Set();
      const sizes = {};
      const prices = {};
      const temps = new Set();
      const sweets = new Set();

      lines.forEach(line => {
        const [name, size, price, temp, sweet] = line.split(',');
        drinks.add(name);
        
        if (!sizes[name]) sizes[name] = new Set();
        sizes[name].add(size);
        
        prices[`${name}-${size}`] = parseInt(price);
        
        temp.split('/').forEach(t => temps.add(t));
        sweet.split('/').forEach(s => sweets.add(s));
      });

      setDrinkOptions({
        drinks: [...drinks],
        sizes: Object.fromEntries(Object.entries(sizes).map(([k, v]) => [k, [...v]])),
        prices,
        temperatures: [...temps],
        sweetness: [...sweets]
      });
    };

    parseCSVData();
  }, []);

  const handleAddOrder = (order) => {
    setOrders(prev => [...prev, order]);
  };

  const handleDeleteOrders = (selectedOrders) => {
    setOrders(prev => prev.filter((_, index) => !selectedOrders.includes(index)));
  };

  const handleCheckout = () => {
    const total = orders.reduce((sum, order) => sum + order.amount, 0);
    const message = `訂單明細：\n${orders.map(order => 
      `${order.drinkName} ${order.size} x${order.quantity} (${order.temperature}, ${order.sweetness})\n訂購人：${order.customerName}\n金額：${order.amount}元`
    ).join('\n\n')}\n\n總計：${total}元`;
    
    alert(message);
    setOrders([]);
  };

  const totalAmount = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.amount, 0);
  }, [orders]);

  return (
    <div className="container">
      <OrderForm
        drinkOptions={drinkOptions}
        onAddOrder={handleAddOrder}
        lastCustomerName={orders[orders.length - 1]?.customerName || ''}
      />
      <OrderList
        orders={orders}
        onDeleteOrders={handleDeleteOrders}
        onCheckout={handleCheckout}
        totalAmount={totalAmount}
      />
    </div>
  );
}

export default App;