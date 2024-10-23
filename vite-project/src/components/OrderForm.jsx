// src/components/OrderForm.jsx
import { useState, useEffect } from 'react';
import '../styles/OrderForm.css';

function OrderForm({ drinkOptions, onAddOrder, lastCustomerName }) {
  const [formData, setFormData] = useState({
    drinkName: '',
    size: '',
    price: 0,
    quantity: 1,
    amount: 0,
    temperature: '',
    sweetness: '',
    customerName: ''
  });

  useEffect(() => {
    if (lastCustomerName && !formData.customerName) {
      setFormData(prev => ({
        ...prev,
        customerName: lastCustomerName
      }));
    }
  }, [lastCustomerName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Update price if drink or size changes
      if (name === 'drinkName' || name === 'size') {
        if (newData.drinkName && newData.size) {
          newData.price = drinkOptions.prices[`${newData.drinkName}-${newData.size}`] || 0;
          newData.amount = newData.price * newData.quantity;
        }
      }
      
      // Update amount if quantity changes
      if (name === 'quantity') {
        newData.amount = newData.price * parseInt(value || 0);
      }
      
      return newData;
    });
  };

  const handleSubmit = () => {
    if (!formData.drinkName || !formData.size || !formData.temperature || 
        !formData.sweetness || !formData.customerName || formData.quantity < 1) {
      alert('請填寫所有必要欄位！');
      return;
    }

    onAddOrder(formData);
    setFormData(prev => ({
      ...prev,
      drinkName: '',
      size: '',
      price: 0,
      quantity: 1,
      amount: 0,
      temperature: '',
      sweetness: ''
    }));
  };

  return (
    <div className="order-form">
      <h2>來點什麼...</h2>
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
          <tr>
            <td>
              <button onClick={handleSubmit} className="confirm-btn">確認</button>
            </td>
            <td>
              <select
                name="drinkName"
                value={formData.drinkName}
                onChange={handleInputChange}
              >
                <option value="">請選擇</option>
                {drinkOptions.drinks.map(drink => (
                  <option key={drink} value={drink}>{drink}</option>
                ))}
              </select>
            </td>
            <td>
              <select
                name="size"
                value={formData.size}
                onChange={handleInputChange}
              >
                <option value="">請選擇</option>
                {formData.drinkName && drinkOptions.sizes[formData.drinkName]?.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </td>
            <td>{formData.price}</td>
            <td>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
              />
            </td>
            <td>{formData.amount}</td>
            <td>
              <select
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
              >
                <option value="">請選擇</option>
                {drinkOptions.temperatures.map(temp => (
                  <option key={temp} value={temp}>{temp}</option>
                ))}
              </select>
            </td>
            <td>
              <select
                name="sweetness"
                value={formData.sweetness}
                onChange={handleInputChange}
              >
                <option value="">請選擇</option>
                {drinkOptions.sweetness.map(sweet => (
                  <option key={sweet} value={sweet}>{sweet}</option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderForm;