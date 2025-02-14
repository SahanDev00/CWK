import Navbar from "./components/Shared/Navbar";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Home />
      </Router>
    </div>
  );
}

export default App;
