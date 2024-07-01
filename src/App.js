import logo from './logo.svg';
import './App.css';
import HomePage from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CharacterDetails from './pages/characterDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/details/:id' element={<CharacterDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
