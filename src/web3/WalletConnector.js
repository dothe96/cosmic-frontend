import Web3 from "web3";
import { normalizeId } from "../utils/Web3Utils";

export const WalletConnector = async () => {
  let provider;
  let connected = false;
  if (window.ethereum) {
    provider = window.ethereum;
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      connected = true;
    } catch (err) {
      provider.message = err.message;
    }
  } else if (window.web3) {
    provider = window.web3;
  } else {
    provider = new Web3.providers.HttpProvider(
      "http://127.0.0.1:8545"
    );
  }
  return [connected, provider];
}

export const checkConnected = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) return true;
  }
  return false;
}

export const registerEvents = (...params) => {
  if (window.ethereum) {
    const provider = window.ethereum;
    provider.on("accountsChanged", async (accounts) => {
      if (accounts.length > 0) {
        params[0](accounts);
      } else {
        params[1]();
      }
    });
    provider.on('chainChanged', (chainId) => {
      chainId = normalizeId(chainId);
      params[2](chainId);
    });
  }
}

export const getChainId = async (web3) => {
  const chainId = await web3.eth.getChainId();
  return normalizeId(chainId);
}