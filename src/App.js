import './Style/App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Templates/Navbar';
import { ToastContainer } from 'react-toastify';

import AppRouter from './Components/AppRouter';

function App() {
  return (

    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
      <ToastContainer position="top-center" hideProgressBar/>
    </BrowserRouter>
  );
}

export default App;
