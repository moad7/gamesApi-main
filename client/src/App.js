import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';

//IMPORT SCREENS
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game" element={<Game />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path='*' element={<Login to='/' />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
