import '../styles/CheckoutModal.css';

const CheckoutModal = ({ isOpen, onClose, orders, totals }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>結帳明細</h2>
        <div className="modal-body">
          <table>
            <thead>
              <tr>
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
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.drinkName}</td>
                  <td>{order.size}</td>
                  <td>{order.price}</td>
                  <td>{order.quantity}</td>
                  <td>{order.amount}</td>
                  <td>{order.temperature}</td>
                  <td>{order.sweetness}</td>
                  <td>{order.customerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="checkout-summary">
            <p>總計: {totals.totalQuantity}份</p>
            <p>總金額: {totals.totalAmount}元</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="close-btn" onClick={onClose}>
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;