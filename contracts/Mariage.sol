pragma solidity ^0.8.0;

contract Mariage {
    address public homme;
    address public femme;
    mapping(address => bool) public estParent;
    mapping(address => bool) public estDecede;
    mapping(address => bool) public estDivorce;
    
    event EnfantAjoute(address enfant, address parent1, address parent2);
    event DecesDeclare(address personneDecedee);
    event DivorceDeclare(address homme, address femme);

    constructor(string memory _homme, string memory _femme) {
        homme = address(uint160(uint256(keccak256(abi.encodePacked(_homme)))));
        femme = address(uint160(uint256(keccak256(abi.encodePacked(_femme)))));
    }

    function ajouterEnfant(address _enfant) public {
        require(msg.sender == homme || msg.sender == femme, "Vous devez etre un parent");
        require(!estDivorce[msg.sender], "Vous etes divorce, impossible d'ajouter un enfant");
        estParent[_enfant] = true;
        emit EnfantAjoute(_enfant, homme, femme);
    }

    function declarerDeces(address _personne) public {
        require(msg.sender == homme || msg.sender == femme, "Vous devez etre un conjoint");
        require(_personne == homme || _personne == femme, "Seul un conjoint peut declarer un deces");
        estDecede[_personne] = true;
        emit DecesDeclare(_personne);
    }

    function declarerDivorce() public {
        require(msg.sender == homme || msg.sender == femme, "Vous devez etre un conjoint");
        require(!estDivorce[msg.sender], "Vous etes deja divorce");
        estDivorce[homme] = true;
        estDivorce[femme] = true;
        emit DivorceDeclare(homme, femme);
    }

    function getHomme() public view returns (address) {
        return homme;
    }

    function getFemme() public view returns (address) {
        return femme;
    }

    function leConjoint(address _conjoint) public view returns (address) {
        if (_conjoint == homme) {
            return femme;
        }
        else if (_conjoint == femme) {
            return homme;
        }
        else {
            return address(0);
        }
    }
}
