import './Airdrop.css';
import { useState, useEffect } from 'react';
import WalletArea from './WalletArea';
import { WalletConnector, registerEvents, getChainId, checkConnected } from "../../web3/WalletConnector";
import Web3 from 'web3';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getChainName } from "../../utils/Web3Utils";
import { weiToNumber} from '../../utils/Formats';
import { getLeftDaytime } from '../../utils/JsUtils';
import claimApi from '../../api/claimApi';
import userApi from '../../api/userApi';
import Countdown from './Countdown';

function Airdrop() {

    const [connnectState, setConnectState] = useState("default");
    const [address, setAddress] = useState("0x");
    const [balance, setBalance] = useState(0);
    const [chainId, setChainId] = useState(-1);

    const [claimState, setClaimState] = useState(1);
    const [totalToken, setTotalToken] = useState(0);

    useEffect(() => {
      checkConnected().then(rs => {
        if (rs) {
          registerEvents(onAccountChange, onDisconnect, onChainChange);
          updateWeb3().then(() => {
            setConnectState("connected");
            toast.success("Connected to wallet");
          });
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const fetchClaimState = async () => {
        try {
          const claimStateData = await userApi.getClaimState({ user: address });
          const userInfoData = await userApi.getUserInfo({ user: address });
          setClaimState(claimStateData.claimState);
          if (userInfoData.totalToken) {
            setTotalToken(userInfoData.totalToken);
          }
        } catch (err) {
          console.error("Failed to fetch claim state: ", err);
        }
      }
      if (address !== "0x") {
        fetchClaimState();
      }
    }, [address]);

    const connectWallet = async () => {
      const [connected, provider] = await WalletConnector();
      registerEvents(onAccountChange, onDisconnect, onChainChange);
      if (connected) {
        await updateWeb3();
        setConnectState("connected");
        toast.success("Connected to wallet");
      } else {
        let message = "No wallet detected. Please install Metamask extension";
        if (provider.message) {
          message = provider.message;
        }
        toast.error(message);
      }
    }

    const onChainChange = (id) => {
      if (chainId !== id) {
        updateWeb3().then(() => {
          setConnectState("updated");
          toast.info("Changed network to " + getChainName(id));
        });
      }
    }
  
    const onAccountChange = (accounts) => {
      if (address !== accounts[0] && address !== "0x") {
        updateWeb3().then(() => {
          setConnectState("updated");
          toast.info("Changed account to " + accounts[0]);
        });
      }
    }
  
    const onDisconnect = () => {
      setConnectState("disconnected");
      toast.info("Wallet disconnected");
    }

    const updateWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        setBalance(weiToNumber(web3 ,await web3.eth.getBalance(accounts[0])));
        setChainId(await getChainId(web3));
      }
    }

    const claimToken = async () => {
      if (chainId !== -1 && chainId !== parseInt(process.env.REACT_APP_CHAIN_ID)) {
        toast.error("You must be choose bsc chain");
        return;
      }
      if (claimState === 2) {
        toast.info("You are already claimed today. Reset until " + getLeftDaytime());
        return;
      }
      try {
        const claimTokenData = await claimApi.claimToken({ user: address });
        const resultState = claimTokenData.result.state;
        if (resultState === 0) {
          toast.error(`Claim failed. Please try later`);
        } else if (resultState === 2 && claimState === 1) {
          const amount = claimTokenData.result.data.amount;
          setTotalToken(totalToken + amount);
          toast.success(`You claimed ${amount} COS`);
        } else if (resultState === 2) {
          toast.info("You are already claimed today");
        }
        setClaimState(resultState);
      } catch (err) {
        console.log("An error occurred: ", err);
        toast.error(`An error occurred. Please try later`);
      }
    }

    const renderWalletArea = () => {
      if (chainId !== -1 && chainId !== parseInt(process.env.REACT_APP_CHAIN_ID)) {
        return (
          <div className="wallet-message">
            <span>You must be choose bsc chain</span>
          </div>
        );
      }
      if (connnectState === "connected" || connnectState === "updated") {
        return (
          <div className="wallet-header">
            <WalletArea address={address} balance={balance} />
            <div className="token-amount"><span>Total tokens:</span> {totalToken}</div>
          </div>
        );
      }
      return (
        <div className="wallet-message">
          <span>Connect your wallet to claim token</span>
        </div>
      );
    }

    const renderButton = () => {
      if (connnectState === "default" || connnectState === "disconnected") {
        return (
          <div className="btn-wallet" onClick={connectWallet}>Connect wallet</div>
        );
      }
      if (claimState === 1) { // 1: unclaimed
        return (
          <div className="btn-wallet " onClick={claimToken}>Claim Token</div>
        )
      } else {
        return (
          <div className="btn-wallet btn-disable" onClick={claimToken}>Claim Token</div>
        )
      }
    };

    return ( 
        <div className="airdrop-wrapper section-layout">
            <div className="element-wrapper">
                <div className="section-title">Cosmic Airdrop</div>
                <div className="airdrop-frame">
                    <div className="airdrop-content">
                        <div className="wallet-area">
                            {renderWalletArea()}
                            {renderButton()}
                        </div>
                        <Countdown />
                        <div className="note">
                          <p>Click "Get Reward" to receive random from 1 to 100</p>
                          <p>Each account can claim once per day (UTC time)</p>
                          <p>Tokens will be accumulated daily during the promotion period</p>
                          <p>Come back after the airdrop is over to get all tokens</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Airdrop;