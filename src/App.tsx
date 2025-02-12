import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewGame from "./pages/NewGame";
import { GameProvider } from "@/contexts/GameContext";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NewGame />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
