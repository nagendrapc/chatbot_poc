import React, { useState } from 'react';

const UtilityAssistantForm = () => {
  const [task, setTask] = useState('');
  const [formData, setFormData] = useState({});

  const handleTaskChange = (e) => {
    setTask(e.target.value);
    setFormData({});
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", { task, ...formData });
    alert("Form submitted successfully!");
  };

  const renderFormFields = () => {
    switch (task) {
      case 'checkBalance':
        return (
          <>
            <label>Account Number:</label>
            <input name="accountNumber" onChange={handleInputChange} required />
          </>
        );
      case 'transferFunds':
        return (
          <>
            <label>From Account:</label>
            <input name="fromAccount" onChange={handleInputChange} required />
            <label>To Account:</label>
            <input name="toAccount" onChange={handleInputChange} required />
            <label>Amount:</label>
            <input name="amount" type="number" onChange={handleInputChange} required />
          </>
        );
      case 'payBill':
        return (
          <>
            <label>Bill Type:</label>
            <select name="billType" onChange={handleInputChange} required>
              <option value="">Select</option>
              <option value="electricity">Electricity</option>
              <option value="internet">Internet</option>
              <option value="water">Water</option>
            </select>
            <label>Customer ID:</label>
            <input name="customerId" onChange={handleInputChange} required />
            <label>Amount:</label>
            <input name="amount" type="number" onChange={handleInputChange} required />
          </>
        );
      default:
        return <p>Please select a task to continue.</p>;
    }
  };

  return (
    <div style={styles.container}>
      <h2>🧾 Banking Assistant</h2>
      <label>What would you like to do?</label>
      <select onChange={handleTaskChange} value={task}>
        <option value="">-- Choose Task --</option>
        <option value="checkBalance">Check Balance</option>
        <option value="transferFunds">Transfer Funds</option>
        <option value="payBill">Pay a Bill</option>
      </select>

      {task && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3>{task === 'checkBalance' ? '🔍 Balance Check' : task === 'transferFunds' ? '💸 Transfer Funds' : '📄 Bill Payment'}</h3>
          {renderFormFields()}
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  form: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default UtilityAssistantForm;
