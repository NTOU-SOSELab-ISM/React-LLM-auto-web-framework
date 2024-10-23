import React, { useState } from 'react';
import '/src/styles/OrderTable.css';

function OrderTable({ drinkData, onAddOrder, orderPerson, setOrderPerson }) {
  const [formData, setFormData] = useState({
    drink: '',
    size: '',
    price: 0,
    quantity: 1,
    temperature: '',
    sweetness: '',
    amount: 0,
    orderPerson: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrder = () => {
    const amount = formData.price * formData.quantity;
    onAddOrder({ ...formData, amount });
    if (!orderPerson) {
      setOrderPerson(formData.orderPerson);
    }
  };

  return (
    <div className="order-table">
      <h2>來點什麼...</h2>
      <table>
        <thead>
          <tr className="gray-row">
            <th>確認</th>
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
          <tr className="light-gray-row">
            <td>
              <button className="confirm-btn" onClick={handleAddOrder}>確認</button>
            </td>
            <td>
              <select name="drink" onChange={handleInputChange}>
                {drinkData.map((drink, index) => (
                  <option key={index} value={drink.name}>{drink.name}</option>
                ))}
              </select>
            </td>
            <td>
              <select name="size" onChange={handleInputChange}>
                {/* 填入容量資料 */}
              </select>
            </td>
            <td>
              <input type="number" name="price" readOnly value={formData.price} />
            </td>
            <td>
              <input type="number" name="quantity" min="1" onChange={handleInputChange} value={formData.quantity} />
            </td>
            <td>
              <input type="number" name="amount" readOnly value={formData.price * formData.quantity} />
            </td>
            <td>
              <select name="temperature" onChange={handleInputChange}>
                {/* 填入溫度資料 */}
              </select>
            </td>
            <td>
              <select name="sweetness" onChange={handleInputChange}>
                {/* 填入甜度資料 */}
              </select>
            </td>
            <td>
              <input
                type="text"
                name="orderPerson"
                value={formData.orderPerson || orderPerson}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
