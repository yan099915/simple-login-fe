import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <Router>
      <main className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LoginScreen />} />
          <Route exact path="/home" element={<HomeScreen />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
