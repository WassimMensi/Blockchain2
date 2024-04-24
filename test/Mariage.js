const { expect } = require("chai");

// ethers.js est une librairie qui permet d'interagir avec les contrats

describe("On s'apprete a tester le deploiement du token", function () {
    it("Should send the total to the owner", async function () {

        const Mariage = await ethers.deployContract("Mariage", ["0x8cC38bD6E448fFA17458d5D32c6CAf530A09c998" , "0x76a40a3F729418dbCc8EFAAac969f2ad416880DC"]);

        const femme = await Mariage.getFemme();
        const homme = await Mariage.getHomme();

        expect(await Mariage.leConjoint(femme)).to.equal(homme);
    });
});