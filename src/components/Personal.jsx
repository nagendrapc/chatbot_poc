import React, { useState } from 'react';
import Utility from './Utility';

const Personal = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="form-chat-wrapper">
      <div className="form-utility-wrapper">
        <h2>Personal Info</h2>
        <form>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <label>Gender:</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Gender"
          />
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
        </form>
      </div>
      <Utility details={{ name: setName, gender: setGender, phone: setPhone }} />
    </div>
  );
};

export default Personal;