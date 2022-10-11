import "./App.css";
import BlackJack from "./Components/BlackJack";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<BlackJack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
