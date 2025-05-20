import React, { useState } from 'react';
import SmartAssistant from './SmartAssistant';
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
        <input type="text" name="applicantName" required /><br />

        <label>Loan Type:</label>
        <select name="loanType" required>
          <option value="">Select</option>
          <option value="personal">Personal Loan</option>
          <option value="home">Home Loan</option>
          <option value="auto">Auto Loan</option>
        </select><br />

        <label>Loan Amount:</label>
        <input type="number" name="loanAmount" min="1000" required /><br />

        <label>Annual Income:</label>
        <input type="number" name="income" required /><br />

        <label>Loan Tenure (in years):</label>
        <input type="number" name="tenure" min="1" max="30" required /><br />

        <label>Email:</label>
        <input type="email" name="email" required /><br />

        <label>Phone Number:</label>
        <input type="tel" name="phone" required /><br />

        <button type="submit">Apply</button>
      </form>
      < SmartAssistant details={{ applicantName: setApplicantName, loanType: setLoanType, loanAmount: setLoanAmount, income: setIncome, tenure: setTenure, email: setEmail, phone: setPhone }} />
    </div>
  );
};

export default LoanApplication;