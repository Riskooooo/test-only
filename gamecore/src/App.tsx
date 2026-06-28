import { useState, useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import Sidebar from "./components/Sidebar";
import ProjectsView from "./components/ProjectsView";
import "./App.css";

export type View = "projects" | "tasks" | "assets" | "notes" | "progress";

const VIEWS: View[] = ["projects", "tasks", "assets", "notes", "progress"];

function App() {
  const [activeView, setActiveView] = useState<View>("projects");

  useEffect(() => {
    const unlisten = listen<string>("navigate", (event) => {
      const target = event.payload as View;
      if (VIEWS.includes(target)) setActiveView(target);
    });
    return () => { unlisten.then((fn) => fn()); };
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "projects":
        return <ProjectsView />;
      default:
        return (
          <div className="empty-view">
            <span className="empty-view-label">{activeView}</span>
            <p className="empty-view-sub">Coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="main-area">{renderView()}</div>
    </div>
  );
}

export default App;
