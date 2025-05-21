import React, { useState } from 'react';
import './BankForm.css';
import Utility from './Utility';

const LoanApplication = () => {
  const [applicantName, setApplicantName] = useState('');
  const [loanType, setLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [income, setIncome] = useState('');
  const [tenure, setTenure] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="form-utility-wrapper">
      <form>
        <h2>Loan Application Form</h2>

        <label>Applicant Name:</label>
        <input
          type="text"
          name="applicantName"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
          required
        /><br />

        <label>Loan Type:</label>
        <select
          name="loanType"
          value={loanType}
          onChange={(e) => setLoanType(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="personal">Personal Loan</option>
          <option value="home">Home Loan</option>
          <option value="auto">Auto Loan</option>
        </select><br />

        <label>Loan Amount:</label>
        <input
          type="number"
          name="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          min="1000"
          required
        /><br />

        <label>Annual Income:</label>
        <input
          type="number"
          name="income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
        /><br />

        <label>Loan Tenure (in years):</label>
        <input
          type="number"
          name="tenure"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          min="1"
          max="30"
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

        <button type="submit">Apply</button>
      </form>

      <Utility
        details={{
          applicantName: setApplicantName,
          loanType: setLoanType,
          loanAmount: setLoanAmount,
          income: setIncome,
          tenure: setTenure,
          email: setEmail,
          phone: setPhone,
        }}
      />
    </div>
  );
};

export default LoanApplication;
