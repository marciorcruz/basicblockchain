import React, { Component } from "react";

import { ethers } from "ethers";

import  tokenAbi  from "../src/abi.json";

class Dapp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    const balanceInEther = ethers.utils.formatEther(balance);
    const tokenAddress = "0xdc28Fd7f737d1611e64541e63Aa6fAe08F9a17De";
    //const signer = provider.getSigner()
    const tokenInstance = new ethers.Contract(tokenAddress, tokenAbi, provider);
    const tokenName = await tokenInstance.name();
    const getUser = await tokenInstance.getUser("0xDFC4BA71505C87626C0C486fE5F79D752EdDf29B");
    //const registerUser = await tokenInstance.registerUser("Marcio Dapp Client", 41, "0xe9f239Ca74a06824BDbe9dE5c2Bc8e596E10b643");
    this.setState({ selectedAddress: accounts[0], balance: balanceInEther, data:  tokenName, get: getUser[1]});
  }

  renderMetamask() {
    if (!this.state.selectedAddress) {
      return (
        <button onClick={() => this.connectToMetamask()}>
          Connect to Metamask
        </button> 
      );
    } else {
      return (
        <div>
          <p>Welcome {this.state.selectedAddress}</p>
          <p>Your ETH Balance is: {this.state.balance}</p>
          <p>Data: {this.state.data}</p>
          <p>Get: {this.state.get}</p>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderMetamask()}</div>;
  }
}

export default Dapp;
