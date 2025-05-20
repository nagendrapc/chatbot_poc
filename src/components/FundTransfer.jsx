import React, { useState } from 'react';
import SmartAssistant from './SmartAssistant';

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
        <input type="text" name="fromAccount" required /><br />

        <label>To Account Number:</label>
        <input type="text" name="toAccount" required /><br />

        <label>Amount:</label>
        <input type="number" name="amount" min="1" required /><br />

        <label>Transfer Description:</label>
        <input type="text" name="description" /><br />

        <label>Transaction Password:</label>
        <input type="password" name="transactionPassword" required /><br />

        <button type="submit">Transfer</button>
      </form>
      <SmartAssistant details={{ fromAccount: setFromAccount, toAccount: setToAccount, amount: setAmount, description: setDescription, transactionPassword: setTransactionPassword }} />
    </div>
  );
};

export default FundTransfer;