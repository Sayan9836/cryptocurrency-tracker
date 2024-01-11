import logo from './logo.svg';
import './App.css';
import Main from './components/Main/Main';
import { Carousal } from './components/Header/Carousal';
import HomePage from './pages/HomePage';
import { Routes,Route} from 'react-router-dom';
import IndivitualCoinPage from './pages/IndivitualCoinPage';
import Navbar from './components/navbar/Navbar';
function App() {
  return (
    <div className="App">
      <Routes>  
        <Route path='/' element={<HomePage/>}/>
        <Route path='/coin/:id' element={<IndivitualCoinPage/>}/>
      </Routes>  
    </div>
  );
}

export default App;
