import React, { useState, useEffect } from 'react'

function OrderForm({ drinkData, onSubmit, lastCustomerName }) {
  const [formData, setFormData] = useState({
    drinkName: '',
    size: '',
    price: 0,
    quantity: 1,
    amount: 0,
    temperature: '',
    sweetness: '',
    customerName: ''
  })

  useEffect(() => {
    if (lastCustomerName && !formData.customerName) {
      setFormData(prev => ({ ...prev, customerName: lastCustomerName }))
    }
  }, [lastCustomerName])

  const handleDrinkChange = (e) => {
    const selectedDrink = drinkData.find(drink => drink.name === e.target.value)
    if (selectedDrink) {
      setFormData(prev => ({
        ...prev,
        drinkName: selectedDrink.name,
        size: selectedDrink.sizes[0],
        price: selectedDrink.prices[0],
        amount: selectedDrink.prices[0] * prev.quantity,
        temperature: selectedDrink.temperatures[0],
        sweetness: selectedDrink.sweetness[0]
      }))
    }
  }

  const handleSizeChange = (e) => {
    const selectedDrink = drinkData.find(drink => drink.name === formData.drinkName)
    const sizeIndex = selectedDrink.sizes.indexOf(e.target.value)
    setFormData(prev => ({
      ...prev,
      size: e.target.value,
      price: selectedDrink.prices[sizeIndex],
      amount: selectedDrink.prices[sizeIndex] * prev.quantity
    }))
  }

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 0
    setFormData(prev => ({
      ...prev,
      quantity,
      amount: prev.price * quantity
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.drinkName || !formData.quantity || !formData.customerName) {
      alert('請填寫完整訂單資訊！')
      return
    }
    onSubmit(formData)
    setFormData(prev => ({
      ...prev,
      quantity: 1,
      amount: prev.price
    }))
  }

  return (
    <div className="order-form">
      <h2>來點什麼...</h2>
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
            <tr>
              <td>
                <button type="submit" className="confirm-btn">確認</button>
              </td>
              <td>
                <select value={formData.drinkName} onChange={handleDrinkChange} required>
                  <option value="">請選擇</option>
                  {drinkData.map(drink => (
                    <option key={drink.name} value={drink.name}>{drink.name}</option>
                  ))}
                </select>
              </td>
              <td>
                <select 
                  value={formData.size} 
                  onChange={handleSizeChange}
                  disabled={!formData.drinkName}
                  required
                >
                  {drinkData.find(d => d.name === formData.drinkName)?.sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </td>
              <td>
                <input type="number" value={formData.price} readOnly />
              </td>
              <td>
                <input 
                  type="number" 
                  min="1"
                  value={formData.quantity} 
                  onChange={handleQuantityChange}
                  required 
                />
              </td>
              <td>
                <input type="number" value={formData.amount} readOnly />
              </td>
              <td>
                <select 
                  value={formData.temperature} 
                  onChange={e => setFormData(prev => ({ ...prev, temperature: e.target.value }))}
                  disabled={!formData.drinkName}
                  required
                >
                  {drinkData.find(d => d.name === formData.drinkName)?.temperatures.map(temp => (
                    <option key={temp} value={temp}>{temp}</option>
                  ))}
                </select>
              </td>
              <td>
                <select 
                  value={formData.sweetness} 
                  onChange={e => setFormData(prev => ({ ...prev, sweetness: e.target.value }))}
                  disabled={!formData.drinkName}
                  required
                >
                  {drinkData.find(d => d.name === formData.drinkName)?.sweetness.map(sweet => (
                    <option key={sweet} value={sweet}>{sweet}</option>
                  ))}
                </select>
              </td>
              <td>
                <input 
                  type="text" 
                  value={formData.customerName} 
                  onChange={e => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default OrderForm