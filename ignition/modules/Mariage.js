const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const MariageModule = buildModule("MariageModule", (m) => {
  const Mariage = m.contract("Mariage", ["0x8cC38bD6E448fFA17458d5D32c6CAf530A09c998" , "0x76a40a3F729418dbCc8EFAAac969f2ad416880DC"]);

  return { Mariage };
});

module.exports = MariageModule;

// Pour indiquer a Hardhat de se connecter
// a un reseau specifique, il faut utiliser la commande