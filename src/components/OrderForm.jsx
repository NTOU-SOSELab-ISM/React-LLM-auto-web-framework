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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let price = formData.price;
    if (name === 'name') {
      const selectedDrink = drinks.find(d => d.name === value);
      if (selectedDrink) {
        price = selectedDrink.price;
      }
    }
    setFormData({
      ...formData,
      [name]: value,
      price,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity) {
      alert('請選擇品名和輸入數量');
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
            <td>
              <button type="submit" style={{ backgroundColor: 'blue', color: 'white' }}>
                確認
              </button>
            </td>
            <td>
              <select name="name" value={formData.name} onChange={handleChange} required>
                <option value="">選擇飲料</option>
                {drinks.map(drink => (
                  <option key={drink.name} value={drink.name}>
                    {drink.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select name="size" value={formData.size} onChange={handleChange} required>
                <option value="">選擇容量</option>
                {drinks
                  .filter(d => d.name === formData.name)
                  .map(d => (
                    <option key={d.size} value={d.size}>
                      {d.size}
                    </option>
                  ))}
              </select>
            </td>
            <td>{formData.price}</td>
            <td>
              <input
                name="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </td>
            <td>{formData.price * formData.quantity}</td>
            <td>
              <select name="temperature" value={formData.temperature} onChange={handleChange} required>
                <option value="">選擇溫度</option>
                {drinks
                  .find(d => d.name === formData.name)
                  ?.temperature.split('/')
                  .map(temp => (
                    <option key={temp} value={temp}>
                      {temp}
                    </option>
                  ))}
              </select>
            </td>
            <td>
              <select name="sweetness" value={formData.sweetness} onChange={handleChange} required>
                <option value="">選擇甜度</option>
                {drinks
                  .find(d => d.name === formData.name)
                  ?.sweetness.split('/')
                  .map(sweet => (
                    <option key={sweet} value={sweet}>
                      {sweet}
                    </option>
                  ))}
              </select>
            </td>
            <td>
              <input
                name="person"
                value={orderPerson || formData.person}
                onChange={e => {
                  setFormData({ ...formData, person: e.target.value });
                  setOrderPerson(e.target.value);
                }}
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default OrderForm;
