import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Language from "./components/Language";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Location from "./components/Location";
function App() {
  return (
    <Router>
      <Header/>

      <Routes>
        <Route path = '/' element={<Language/>} />
        <Route path = '/about' element={<About/>} />
        <Route path = '/dashboard' element = {<Dashboard/>} />
        <Route path = '/location' element = {<Location/>}  />
      </Routes>

      <Footer/>

    </Router>
  );
}

export default App;
