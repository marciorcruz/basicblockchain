//DAPP
/*
Instaciamos a LIB etherJS Web3 para interagir com o contrato
*/
const { ethers } = require("ethers");

//Colocamos na variavel tokenAbi o ABI do contrato que geramos no REMIX
const tokenAbi = require("../contract/abi.json");

//Esse é o endereço do token compilamos
const tokenAddress = "0xdc28Fd7f737d1611e64541e63Aa6fAe08F9a17De";

//Esse é o endpoint do servidor RPC de uma rede de teste baseada em EVM
const providerUri = "https://sokol.poa.network/";

//Essa é uma chave privada de teste que criei para nosso exemplo aconselho não utilizar para dados pessoais é somente para teste e exemplo
const privateKey =
  "8d0a9bec332a2cc85fd353f48b55ebd019df3e92b5ece5e9bb6277eecafe7b73";

//Nesse ponto estamos criando o provedor para acessar a rede Blockchain utilizando a LIB Ethers protocolo RPC
const provider = new ethers.providers.JsonRpcProvider(providerUri);

/* 
Como vamos salvar os dados no contrato precisamos de uma carteira por isso informei a chave privada de testes 
Antes enviei fundos falsos para permitir realizar os testes.
*/
const wallet = new ethers.Wallet(privateKey, provider);

/*
Nesse momento estamos passando as informações para LIB para acessar o Contrato na rede que fizemos deploy
*/
const tokenInstance = new ethers.Contract(tokenAddress, tokenAbi, wallet);

// Se quisermos apenas ler o contrato não precisamos da Wallet uma vez que as informações estão distribuidas na rede blockchain
//const tokenInstance = new ethers.Contract(tokenAddress, tokenAbi, provider); //ReadOnly

//Esse função chama o contrato e registra o usuário.
//Se o usuário já estiver cadastrado vai retornar erro.
const registerUser = async (_name, _age, _address) => {
  try {
    const txResponse = await tokenInstance.registerUser(_name, _age, _address);
    console.log(txResponse);
    return txResponse;
  } catch (e) {
    console.log(e);
    return null;
  }
};

//Esse função chama o contrato e obtem um usuário através do endereço da carteira.
const getUser = async (_address) => {
  try {
    const txResponse = await tokenInstance.getUser(_address);
    console.log(txResponse);
    return txResponse;
  } catch (e) {
    console.log(e);
    return null;
  }
};

//registerUser("User Teste", 150, "0xDFC4BA71505C87626C0C486fE5F79D752EdDf29B");

getUser("0x0Acb68Ee9BB4A70bE15f3042d189A8FB491C1DFB");
getUser("0xDFC4BA71505C87626C0C486fE5F79D752EdDf29B");
