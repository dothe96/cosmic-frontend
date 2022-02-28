import './App.css';
import Airdrop from './components/airdrop/Airdrop';
import Toastify from "./utils/Toastify";
import serverApi from './api/serverApi';
import { useState, useEffect } from 'react';

function App() {
  const [connected, setConnected] = useState(false);

  useEffect(()=> {
    const checkServerConnection = async () => {
      try {
        const isOk = await serverApi.checkServer();
        if (isOk.status === 200) {
          setConnected(true);
          clearInterval(interval);
        }
      } catch (err) {
        // err
      }
    }
    const interval = setInterval(checkServerConnection, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBody = () => {
    if (connected) {
      return (
        <Airdrop />
      );
    } else {
      return (
        <div className="connecting-ui">
          <span>Please wait...</span>
          <div className="loading-outer">
            <div className="loading-inner"></div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="global-wrapper">
      {renderBody()}
      <Toastify />
    </div>
  );
}

export default App;
