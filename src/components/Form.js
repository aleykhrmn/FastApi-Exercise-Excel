import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Backend'e veri gönderme
    try {
      const response = await axios.post('http://127.0.0.1:8000/save-to-excel', {
        name,
        age: parseInt(age),
      });
      setMessage(response.data.message);  // Başarı mesajını göster
    } catch (error) {
      console.error("Error saving to Excel", error);
      setMessage('Bir hata oluştu.');
    }

    // Formu sıfırlama
    setName('');
    setAge('');
  };

  return (
    <div>
      <h1>İsim ve Yaş Girin</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">İsim:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Yaş:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Excel'e Kaydet</button>
      </form>
      {message && <p>{message}</p>}  {/* Mesajı göster */}
    </div>
  );
}

export default Form;
