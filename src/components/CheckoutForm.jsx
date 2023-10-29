import React, { useState } from "react";
import './CheckoutForm.css'

function CheckoutForm({ handleCheckout, handleCancel }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <form>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={() => handleCheckout(formData)}>
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
