import { Ico } from "./Icons";

interface TopbarProps {
  onCreate?: () => void;
}

export function Topbar({ onCreate }: TopbarProps) {
  return (
    <div className="topbar">
      <div className="topbar-search">
        <Ico.search />
        <input placeholder="Search projects, milestones, providers…" readOnly />
        <span className="kbd">⌘K</span>
      </div>
      <div className="topbar-actions">
        <button className="iconbtn" title="Notifications">
          <Ico.bell />
          <span className="dot" />
        </button>
        {onCreate && (
          <button className="btn btn-primary" onClick={onCreate}>
            <Ico.plus /> New project
          </button>
        )}
      </div>
    </div>
  );
}
