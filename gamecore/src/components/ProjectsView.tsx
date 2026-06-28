import { Plus, Gamepad2 } from "lucide-react";

export default function ProjectsView() {
  return (
    <div className="projects-view">
      <div className="view-header">
        <div>
          <h1 className="view-title">Projects</h1>
          <p className="view-subtitle">Manage your game development projects</p>
        </div>
        <button className="btn-primary">
          <Plus size={15} strokeWidth={2.5} />
          New Project
        </button>
      </div>

      <div className="empty-state">
        <div className="empty-state-icon">
          <Gamepad2 size={32} strokeWidth={1.4} />
        </div>
        <h2 className="empty-state-title">No projects yet</h2>
        <p className="empty-state-desc">
          Create your first project to start tracking your game development.
        </p>
        <button className="btn-primary">
          <Plus size={15} strokeWidth={2.5} />
          Create your first project
        </button>
      </div>
    </div>
  );
}
