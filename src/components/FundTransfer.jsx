import React, { useState } from 'react';
import SmartAssistant from './SmartAssistant';
import './BankForm.css';

const FundTransfer = () => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactionPassword, setTransactionPassword] = useState('');

  return (
    <div className="form-utility-wrapper">
      <form>
        <h2>Fund Transfer Form</h2>

        <label>From Account Number:</label>
        <input
          type="text"
          name="fromAccount"
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          required
        /><br />

        <label>To Account Number:</label>
        <input
          type="text"
          name="toAccount"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          required
        /><br />

        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        /><br />

        <label>Transfer Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />

        <label>Transaction Password:</label>
        <input
          type="password"
          name="transactionPassword"
          value={transactionPassword}
          onChange={(e) => setTransactionPassword(e.target.value)}
          required
        /><br />

        <button type="submit">Transfer</button>
      </form>

      <SmartAssistant
        details={{
          fromAccount: setFromAccount,
          toAccount: setToAccount,
          amount: setAmount,
          description: setDescription,
          transactionPassword: setTransactionPassword,
        }}
      />
    </div>
  );
};

export default FundTransfer;
