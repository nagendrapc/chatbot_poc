import React, { useState } from 'react';
import Utility from './Utility';

const Official = () => {
  const [mail, setMail] = useState('');
  const [companyId, setCompanyId] = useState('');

  return (
    <div className="form-utility-wrapper">
      <h2>Official Info</h2>
      <form>
        <label>Company Mail:</label>
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Company Mail"
        />
        <label>Company ID:</label>
        <input
          type="text"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          placeholder="Company ID"
        />
      </form>
      <Utility details={{ mail: setMail, companyId: setCompanyId }} />
    </div>
  );
};

export default Official;