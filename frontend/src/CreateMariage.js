import React, { useState } from 'react';
import Web3 from 'web3';
import MarriageContract from './contrat/Mariage.json';
import AfficheInfo from './AfficheInfo.js';

function CreateMarriage() {
  const [husbandAddress, setHusbandAddress] = useState('');
  const [wifeAddress, setWifeAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      // Déploiement du contrat avec les adresses de l'homme et de la femme
      await new web3.eth.Contract(MarriageContract.abi)
        .deploy({ data: MarriageContract.bytecode, arguments: [husbandAddress, wifeAddress] })
        .send({ from: accounts[0] });
      setHusbandAddress('');
      setWifeAddress('');
      setErrorMessage('');
      console.log('Le mariage a été créé avec succès !');
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la création du mariage.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Créer un mariage</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Adresse de l'homme:</label>
          <input
            type="text"
            value={husbandAddress}
            onChange={(e) => setHusbandAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Adresse de la femme:</label>
          <input
            type="text"
            value={wifeAddress}
            onChange={(e) => setWifeAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Créer le mariage</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default CreateMarriage;
