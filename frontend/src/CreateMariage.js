import React, { useState } from 'react';
import Web3 from 'web3';
import MarriageContract from './contrat/Mariage.json';
import AfficheInfo from './AfficheInfo.js';

function CreateMarriage() {
  const [husbandAddress, setHusbandAddress] = useState('');
  const [wifeAddress, setWifeAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hommeAddress, setHommeAddress] = useState('');
  const [femmeAddress, setFemmeAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressTransac = await CreerContrat(husbandAddress, wifeAddress);
    console.log(addressTransac);
    if(addressTransac){
      const {homme, femme} = RecupInfo(addressTransac);
      console.log(homme, femme);

      setHommeAddress(homme);
      setFemmeAddress(femme);
    }
  };
  
  const CreerContrat = async (husband, wife) => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      // Déploiement du contrat avec les adresses de l'homme et de la femme
      const contrat = await new web3.eth.Contract(MarriageContract.abi)
        .deploy({ data: MarriageContract.bytecode, arguments: [husband, wife] })
        .send({ from: accounts[0] });
      setHusbandAddress('');
      setWifeAddress('');
      setErrorMessage('');
      return contrat.options.address;
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la création du mariage.');
      console.error(error);
      return null;
    }
  };

  const RecupInfo = async (addressTransac) => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      const contrat = await new web3.eth.Contract(MarriageContract.abi, addressTransac);
      const hommeAddress = await contrat.methods.getHomme().call();
      const femmeAddress = await contrat.methods.getFemme().call();
      return { hommeAddress, femmeAddress };
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la récupération des informations du contrat.');
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
      {hommeAddress && "Homme : " + {hommeAddress}}
      {femmeAddress && "Femme : " + {femmeAddress}}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default CreateMarriage;
