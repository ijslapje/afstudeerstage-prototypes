


# Handpicked Learn 2 Earn backend

Executeer de volgende commands om het programma te laten runnen
```shell
npm install
npm i ethers
npm i jimp
npm i ipfs-core
npm i express
```
Vervolgens:
```shell
cd ./smart-contract
npm install
npm i --save-dev hardhat
npm i @openzeppelin/contracts
npm i @nomicfoundation/hardhat-toolbox
```

Om het te laten runnen:

In terminal 1:
```shell
cd ./smart-contract
npx hardhat compile
npx hardhat node
(Verander als dit moet de account private en public key naar de geliste blockchain)
```

In terminal 2:
```shell
node deploy.js
Open localhost:8000
```
