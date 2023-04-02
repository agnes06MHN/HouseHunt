import React, { useState } from 'react';
import axios from 'axios';

const Authentification = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        isLogin ? '/api/auth/login' : '/api/auth/signup',
        { email, password }
      );

      // TODO: Handle successful Authentification
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Mot de passe:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit">{isLogin ? 'Se connecter' : 'S\'inscrire'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Créer un compte' : 'Déjà inscrit ? Connectez-vous'}
      </button>
    </div>
  );
};

export default Authentification;
