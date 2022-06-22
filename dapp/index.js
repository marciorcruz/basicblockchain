//DAPP
const { ethers } = require("ethers");
const tokenAbi = require("../contract/abi.json");

const tokenAddress = "0xdc28Fd7f737d1611e64541e63Aa6fAe08F9a17De";
const providerUri = "https://sokol.poa.network/";
const privateKey = "8d0a9bec332a2cc85fd353f48b55ebd019df3e92b5ece5e9bb6277eecafe7b73";

const provider = new ethers.providers.JsonRpcProvider(providerUri);
const wallet = new ethers.Wallet(privateKey, provider);
const tokenInstance = new ethers.Contract(tokenAddress, tokenAbi, wallet);

//const tokenInstance = new ethers.Contract(tokenAddress, tokenAbi, provider); //ReadOnly

const registerUser = async (_name, _age, _address) => {
   const txResponse = await tokenInstance.registerUser(_name, _age, _address);
   console.log(txResponse);
   getUser(_address);
}

const getUser = async (_address) => {
    const txResponse = await tokenInstance.getUser(_address)
    console.log(txResponse)  
}

registerUser("Marcio Ribeiro da Cruz", 41, "0x5Ecf559423087Dd9D7F172b2498c77b7a4ceFA60");

getUser("0x5Ecf559423087Dd9D7F172b2498c77b7a4ceFA60");
