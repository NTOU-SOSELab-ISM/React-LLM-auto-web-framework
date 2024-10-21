import React from 'react';

function OrderTable({ orderList, deleteSelectedOrders, totalCount, totalPrice, checkout }) {
  const toggleSelect = (index) => {
    const newOrderList = [...orderList];
    newOrderList[index].isSelected = !newOrderList[index].isSelected;
    // 強制刷新狀態
    setOrderList(newOrderList);
  };

  return (
    <div>
      <table>
        <thead>
          <tr style={{ backgroundColor: 'grey' }}>
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
          {orderList.map((order, index) => (
            <tr
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? 'lightgrey' : 'white' }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={order.isSelected || false}
                  onChange={() => toggleSelect(index)}
                />
              </td>
              <td>{order.name}</td>
              <td>{order.size}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.amount}</td>
              <td>{order.temperature}</td>
              <td>{order.sweetness}</td>
              <td>{order.person}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={deleteSelectedOrders}
          style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}
        >
          刪除勾選
        </button>
        <span>
          總計 {totalCount} 份，共 {totalPrice} 元
        </span>
        <button
          onClick={checkout}
          style={{ backgroundColor: 'green', color: 'white', marginLeft: '10px' }}
        >
          結帳
        </button>
      </div>
    </div>
  );
}

export default OrderTable;
