import React, { useState } from 'react';
import Utility from './Utility';


const Social = () => {
  const [linkedinId, setLinkedinId] = useState('');
  const [facebookId, setFacebookId] = useState('');

  return (
    <div>
      <div className="form-chat-wrapper">
        <form className="form-utility-wrapper">
          <h2>Social Info</h2>
          <label>LinkedIn ID:</label>
          <input
            type="text"
            value={linkedinId}
            onChange={(e) => setLinkedinId(e.target.value)}
            placeholder="LinkedIn ID"
          />
          <label>Facebook ID:</label>
          <input
            type="text"
            value={facebookId}
            onChange={(e) => setFacebookId(e.target.value)}
            placeholder="Facebook ID"
          />
        </form>
        <Utility details={{ linkedinId: setLinkedinId, facebookId: setFacebookId }} />
      </div>
    </div>
  );
};

export default Social;