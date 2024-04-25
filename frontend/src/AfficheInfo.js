import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MarriageContract from './contrat/Mariage.json';
import MarriageAddress from './contrat/mariage-address.json';

function AfficheInfo() {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [hommeAddress, setHommeAddress] = useState('');
  const [femmeAddress, setFemmeAddress] = useState('');

  useEffect(() => {
    const fetchContractInfos = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const mariageAddress = MarriageAddress.Token;
        if (!mariageAddress) {
          throw new Error('Le contrat n\'est pas déployé sur ce réseau');
        }
        console.log(mariageAddress);
        const contract = new web3.eth.Contract(MarriageContract.abi, mariageAddress);
        console.log(contract);
        const hommeAddress = await contract.methods.getHomme().call();
        const femmeAddress = await contract.methods.getFemme().call();
        console.log(hommeAddress);
        setHommeAddress(hommeAddress);
        setFemmeAddress(femmeAddress);
        
        
        setLoading(false);
      } catch (error) {
        setErrorMessage('Une erreur est survenue lors de la récupération des informations du contrat.');
        console.error(error);
        setLoading(false);
      }
    };

    fetchContractInfos();
  }, []);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (errorMessage) {
    return <p style={{ color: 'red' }}>{errorMessage}</p>;
  }

  return (
    <div>
      <h2>Informations des contrats de mariage</h2>
      {/*contractInfos.length === 0 ? (
        <p>Aucun contrat de mariage trouvé.</p>
      ) : (
        <ul>
          {contractInfos.map((info, index) => (
            <li key={index}>
              <strong>Contrat #{index + 1}</strong>
              <ul>
                <li>Adresse de l'homme: {info.homme.address}</li>
                <li>Adresse de la femme: {info.femme.address}</li>
              </ul>
            </li>
          ))}
        </ul>
      )*/}
      <p>Adresse Homme : {hommeAddress}</p>
      <p>Adresse Femme : {femmeAddress}</p>
    </div>
  );
}

export default AfficheInfo;
