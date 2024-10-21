import React, { useState } from 'react';

function OrderForm({ addOrder }) {
  const [selectedDrink, setSelectedDrink] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [price, setPrice] = useState(0);
  const [formData, setFormData] = useState({
    quantity: 1,
    temperature: '',
    sweetness: '',
    person: '',
  });

  const drinks = [
    { name: '綠茶', size: '500ml', price: 25, temperature: '全冰/少冰/去冰/熱', sweetness: '全糖/8分糖/5分糖/3分糖/無糖' },
    { name: '綠茶', size: '700ml', price: 35, temperature: '全冰/少冰/去冰/熱', sweetness: '全糖/8分糖/5分糖/3分糖/無糖' },
    { name: '紅茶', size: '500ml', price: 20, temperature: '全冰/少冰/去冰/熱', sweetness: '全糖/8分糖/5分糖/3分糖/無糖' },
    { name: '紅茶', size: '700ml', price: 30, temperature: '全冰/少冰/去冰/熱', sweetness: '全糖/8分糖/5分糖/3分糖/無糖' },
    { name: '奶茶', size: '500ml', price: 35, temperature: '全冰/少冰/去冰/熱', sweetness: '全糖/8分糖/5分糖/3分糖/無糖' },
    { name: '奶茶', size: '700ml', price: 45, temperature: '全冰/少冰/去冰/熱', sweetness: '全糖/8分糖/5分糖/3分糖/無糖' },
  ];

  const uniqueDrinks = [...new Set(drinks.map(drink => drink.name))];

  const availableSizes = drinks.filter(drink => drink.name === selectedDrink);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setSelectedDrink(value);
      setSelectedSize('');
      setPrice(0);
    }
    
    if (name === 'size') {
      setSelectedSize(value);
      const selectedDrinkItem = availableSizes.find(drink => drink.size === value);
      setPrice(selectedDrinkItem?.price || 0);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDrink || !selectedSize || !formData.quantity) {
      alert('請選擇品名、容量並輸入數量');
      return;
    }

    const newOrder = {
      name: selectedDrink,
      size: selectedSize,
      price: price,
      quantity: formData.quantity,
      temperature: formData.temperature,
      sweetness: formData.sweetness,
      person: formData.person,
      amount: price * formData.quantity,
      isSelected: false,
    };
    addOrder(newOrder);
    setSelectedDrink('');
    setSelectedSize('');
    setPrice(0);
    setFormData({
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
              <select name="name" value={selectedDrink} onChange={handleChange} required>
                <option value="">選擇飲料</option>
                {uniqueDrinks.map(drink => (
                  <option key={drink} value={drink}>
                    {drink}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select name="size" value={selectedSize} onChange={handleChange} required>
                <option value="">選擇容量</option>
                {availableSizes.map(drink => (
                  <option key={drink.size} value={drink.size}>
                    {drink.size}
                  </option>
                ))}
              </select>
            </td>
            <td>{price}</td>
            <td><input name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} required /></td>
            <td>{price * formData.quantity}</td>
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
              <input name="person" value={formData.person} onChange={handleChange} required />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default OrderForm;
