import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MarriageContract from './contrat/Mariage.json';

function AfficheInfo() {
  const [contractInfos, setContractInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchContractInfos = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MarriageContract.networks[networkId];
        if (!deployedNetwork) {
          throw new Error('Le contrat n\'est pas déployé sur ce réseau');
        }
        const contract = new web3.eth.Contract(MarriageContract.abi, deployedNetwork.address);
        const contractCount = await contract.methods.getContractCount().call();
        const contractInfos = [];
        for (let i = 0; i < contractCount; i++) {
          const contractInfo = await contract.methods.getContractInfo(i).call();
          contractInfos.push(contractInfo);
        }
        setContractInfos(contractInfos);
        setLoading(false);
      } catch (error) {
        setErrorMessage('Une erreur est survenue lors de la récupération des informations du contrat.');
        console.error(error);
        console.error(contractInfos);
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
      {contractInfos.length === 0 ? (
        <p>Aucun contrat de mariage trouvé.</p>
      ) : (
        <ul>
          {contractInfos.map((info, index) => (
            <li key={index}>
              <strong>Contrat #{index + 1}</strong>
              <ul>
                <li>Adresse de l'homme: {info.address}</li>
                <li>Adresse de la femme: {info.address}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AfficheInfo;
