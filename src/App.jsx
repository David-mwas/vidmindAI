import { BrowserRouter as ReactRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Chats from "../pages/Chats";
import { Auth } from "../pages/Login";

function App() {
  return (
    <ReactRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/chats/:id" element={<Chats />} />
      </Routes>
    </ReactRouter>
  );
}

export default App;
