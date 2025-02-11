import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewGame from "./pages/NewGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewGame />} />
      </Routes>
    </Router>
  );
}

export default App;
