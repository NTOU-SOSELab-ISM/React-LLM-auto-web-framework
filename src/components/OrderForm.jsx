import React, { useState } from 'react';

function OrderForm({ drinks, orderPerson, setOrderPerson, addOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    price: 0,
    quantity: 1,
    temperature: '',
    sweetness: '',
    person: '',
  });

  // 過濾出不重複的飲料名稱
  const uniqueDrinks = [...new Set(drinks.map(drink => drink.name))];

  // 根據選擇的飲料名稱來過濾對應的容量
  const availableSizes = drinks.filter(drink => drink.name === formData.name);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 當用戶選擇品名時，重置 size 和 price
    if (name === 'name') {
      setFormData({
        ...formData,
        [name]: value,
        size: '',
        price: 0,
      });
    }
    
    // 當用戶選擇容量時，更新價格
    if (name === 'size') {
      const selectedDrink = availableSizes.find(drink => drink.size === value);
      setFormData({
        ...formData,
        [name]: value,
        price: selectedDrink?.price || 0,  // 根據選擇的容量來更新價格
      });
    }

    if (name !== 'name' && name !== 'size') {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.size || !formData.quantity) {
      alert('請選擇品名、容量並輸入數量');
      return;
    }

    const newOrder = {
      ...formData,
      amount: formData.price * formData.quantity,
      isSelected: false,
    };
    addOrder(newOrder);
    if (!orderPerson) setOrderPerson(formData.person);
    
    // 重置表單
    setFormData({
      name: '',
      size: '',
      price: 0,
      quantity: 1,
      temperature: '',
      sweetness: '',
      person: formData.person,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <tr style={{ backgroundColor: 'grey' }}>
            <td><button type="submit">確認</button></td>
            <td>
              <select name="name" value={formData.name} onChange={handleChange} required>
                <option value="">選擇飲料</option>
                {uniqueDrinks.map(drink => (
                  <option key={drink} value={drink}>
                    {drink}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select name="size" value={formData.size} onChange={handleChange} required>
                <option value="">選擇容量</option>
                {availableSizes.map(drink => (
                  <option key={drink.size} value={drink.size}>
                    {drink.size}
                  </option>
                ))}
              </select>
            </td>
            <td>{formData.price}</td>
            <td><input name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} required /></td>
            <td>{formData.price * formData.quantity}</td>
            <td>
              <select name="temperature" value={formData.temperature} onChange={handleChange} required>
                <option value="">選擇溫度</option>
                {availableSizes[0]?.temperature.split('/').map(temp => (
                  <option key={temp} value={temp}>
                    {temp}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select name="sweetness" value={formData.sweetness} onChange={handleChange} required>
                <option value="">選擇甜度</option>
                {availableSizes[0]?.sweetness.split('/').map(sweet => (
                  <option key={sweet} value={sweet}>
                    {sweet}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input name="person" value={orderPerson || formData.person} onChange={(e) => setOrderPerson(e.target.value)} required />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default OrderForm;
