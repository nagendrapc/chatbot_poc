import React, { useState } from 'react';
import Utility from './Utility';
import UtilityAssistantForm from './UtilityAssistantForm';
import FloatingUtilityAssistant from './FloatingUtilityAssistant';
import SmartAssistant from './SmartAssistant'; // Assuming you have a SmartAssistant component

const AccountOpening = () => {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState('');

  return (
    <div className="form-utility-wrapper">
      <form>
        <h2>Account Opening Form</h2>

        <label>Full Name:</label>
        <input type="text" name="fullName" required /><br />

        <label>Email:</label>
        <input type="email" name="email" required /><br />

        <label>Phone Number:</label>
        <input type="tel" name="phone" required /><br />

        <label>Date of Birth:</label>
        <input type="date" name="dob" required /><br />

        <label>Address:</label>
        <textarea name="address" required></textarea><br />

        <label>Account Type:</label>
        <select name="accountType" required>
          <option value="">Select</option>
          <option value="savings">Savings</option>
          <option value="checking">Checking</option>
        </select><br />

        <button type="submit">Submit</button>
      </form>
      <SmartAssistant
        details={{
          fullname: setFullname,
          email: setEmail,
          phone: setPhone,
          address: setAddress,
          dob: setDob,
          accountType: setAccountType,
        }}
      />
    </div>
  );
};

export default AccountOpening;