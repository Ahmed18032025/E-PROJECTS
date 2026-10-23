import { BrowserRouter, Link } from 'react-router-dom';
import Header from '../components/Header/Hearder.jsx';
import { Home } from './pages/Home.jsx';
import Main from './pages/main.jsx';
function App(){
  return(
    <>
    <BrowserRouter>
    <Link to="/">Home</Link>
    <Link to="/men">Men</Link>
    <Link to="/women">Women</Link>
    <Link to="/kids">Kids</Link>
    </BrowserRouter>
    {/* <Header /> */}
    <Home />
     
    </>
  )
}
export default App;