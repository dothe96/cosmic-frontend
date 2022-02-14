import { ToastContainer, Slide } from 'react-toastify';

function Toastify() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={true}
            transition={Slide}
        />
    );
}

export default Toastify;