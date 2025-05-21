import React, { useState } from 'react';
import Utility from './Utility';
import './BankForm.css';

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
        <input
          type="text"
          name="fullName"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        /><br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        /><br />

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        /><br />

        <label>Address:</label>
        <textarea
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea><br />

        <label>Account Type:</label>
        <select
          name="accountType"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="savings">Savings</option>
          <option value="current">Current</option>
        </select><br />

        <button type="submit">Submit</button>
      </form>

      <Utility
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
