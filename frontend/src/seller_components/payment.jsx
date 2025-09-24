import React, { useState } from 'react';
import './payment.css'; // Import the CSS file for styling

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('mobileMoney');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState('');
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };
  const handleMobileMoneyNumberChange = (event) => {
    setMobileMoneyNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle payment submission logic here
  };
return (
    <div className="payment-container">
      <h2 className="payment-heading">Payment Details</h2>
      <div className="payment-methods">
        <button
          className={`payment-method-button ${paymentMethod === 'mobileMoney' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('mobileMoney')}
        >
          Mobile Money
        </button>
        <button
          className={`payment-method-button ${paymentMethod === 'visaCard' ? 'active' : ''}`}
          onClick={() => handlePaymentMethodChange('visaCard')}
        >
          Visa Card
        </button>
      </div>

      {paymentMethod === 'visaCard' ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="Enter card number"
              required
            />
            </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="CVV"
              required
            />
          </div>
          <button type="submit" className="payment-buttons">Pay with Visa Card</button>
        </form>
    ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="mobileMoneyNumber">Mobile Money Number</label>
            <input
              type="text"
              id="mobileMoneyNumber"
              value={mobileMoneyNumber}
              onChange={handleMobileMoneyNumberChange}
              placeholder="Enter mobile money number"
              required
            />
          </div>
          <button type="submit" className="payment-buttons">Pay with Mobile Money</button>
        </form>
      )}
    </div>
  );
};

export default Payment;
