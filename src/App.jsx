import { AppHeader } from "./components/AppHeader";
import { AppContent } from "./components/AppContent";
import backgroundImg from "./assets/background.png";
import { useState } from "react";

function App() {
  const [appStatus, setAppStatus] = useState("home");

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImg})` }}
      className="flex flex-col min-h-screen gap-3 bg-cover bg-no-repeat
        bg-center w-screen p-4"
    >
      <AppHeader />
      <AppContent appStatus={appStatus} setAppStatus={setAppStatus} />
    </div>
  );
}

export default App;
