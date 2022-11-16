async function main(){

    const CooleNFT = await hre.ethers.getContractFactory("CooleNFT");
    const deCooleNFT = await CooleNFT.deploy();

    await deCooleNFT.deployed();

    console.log("CooleNFT deployed to:", deCooleNFT.address);
}

main()
    .then(()=>process.exit(0))
    .catch((error)=> {
        console.error(error);
        process.exit(1);
    });