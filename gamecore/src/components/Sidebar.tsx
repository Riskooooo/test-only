import {
  Gamepad2,
  CheckSquare,
  FolderOpen,
  FileText,
  BarChart2,
  Settings,
  Zap,
} from "lucide-react";
import type { View } from "../App";

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

const navItems: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "projects", label: "Projects", icon: Gamepad2 },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "assets", label: "Assets", icon: FolderOpen },
  { id: "notes", label: "Notes", icon: FileText },
  { id: "progress", label: "Progress", icon: BarChart2 },
];

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark-lg">
          <Zap size={22} strokeWidth={2.5} />
        </div>
        <span className="logo-text">GameCore</span>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Workspace</div>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${activeView === id ? "active" : ""}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={15} strokeWidth={1.8} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={15} strokeWidth={1.8} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
