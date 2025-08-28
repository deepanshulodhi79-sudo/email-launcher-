import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    senderName: '',
    senderEmail: '',
    appPassword: '',
    subject: '',
    body: '',
    recipients: ''
  });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmails = async () => {
    setSending(true);
    const res = await fetch('https://your-backend-url.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMessage(data.message);
    setSending(false);
  };

  return (
    <div className="container">
      <h2>Email Launcher</h2>
      <input name="username" placeholder="Login Username" onChange={handleChange} />
      <input name="password" type="password" placeholder="Login Password" onChange={handleChange} />
      <input name="senderName" placeholder="Sender Name" onChange={handleChange} />
      <input name="senderEmail" placeholder="Sender Email" onChange={handleChange} />
      <input name="appPassword" type="password" placeholder="App Password" onChange={handleChange} />
      <input name="subject" placeholder="Subject" onChange={handleChange} />
      <textarea name="body" placeholder="Email Body" onChange={handleChange} />
      <textarea name="recipients" placeholder="Recipient Emails (comma separated)" onChange={handleChange} />

      <button
        onClick={sendEmails}
        style={{ backgroundColor: sending ? 'gray' : '#007bff' }}
      >
        {sending ? 'Sending...' : 'Send Emails'}
      </button>

      {message && <div className="popup">{message}</div>}
    </div>
  );
}

export default App;
