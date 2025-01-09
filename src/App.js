import './Style/App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Templates/Navbar';

import AppRouter from './Components/AppRouter';

function App() {
  return (

    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
