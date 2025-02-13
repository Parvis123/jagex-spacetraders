import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewGame from "./pages/NewGame";
import { GameProvider } from "@/contexts/GameContext";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Contracts from "./pages/Contracts";
import NotFound from "./pages/NotFound";
import Fleet from "./pages/Fleet";
import Shipyard from "./pages/Shipyard";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          {/* 404 */}
          <Route path="*" element={<NotFound />} />

          {/* Login and register page */}
          <Route path="/" element={<NewGame />} />

          {/* Everything with a sidebar view */}
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/contracts"
            element={
              <DashboardLayout>
                <Contracts />
              </DashboardLayout>
            }
          />
          <Route
            path="/fleet"
            element={
              <DashboardLayout>
                <Fleet />
              </DashboardLayout>
            }
          />
          <Route
            path="/shipyard"
            element={
              <DashboardLayout>
                <Shipyard />
              </DashboardLayout>
            }
          />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
