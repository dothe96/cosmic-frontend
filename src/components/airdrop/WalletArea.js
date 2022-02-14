import { copyToClipboard } from "../../utils/JsUtils";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WalletArea(props) {

    const balance = props.balance + " BNB";
    const address = props.address;

    const copiedNotify = () => {
        toast.success("Copied address to clipboard");
    };

    return (
        <div className="wallet-info" onClick={() => {
            copyToClipboard(address);
            copiedNotify();
        }}>
            <div className="account-balance">{balance}</div>
            <div className="account-address">{address}</div>
        </div>
    );
}

export default WalletArea;