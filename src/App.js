import "./App.css";
import Shop from "./layouts/Shop";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
function App() {
  return (
    <div className="App">
        <Navbar />
        <Shop />
        <Footer />  
    </div>
  );
}
export default App