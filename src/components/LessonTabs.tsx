export type LessonTab = "explain" | "review";

type LessonTabsProps = {
  activeTab: LessonTab;
  onChange: (tab: LessonTab) => void;
};

export function LessonTabs({ activeTab, onChange }: LessonTabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label="课程内容">
      <button
        aria-selected={activeTab === "explain"}
        className={activeTab === "explain" ? "tab tab-active" : "tab"}
        onClick={() => onChange("explain")}
        role="tab"
        type="button"
      >
        讲解
      </button>
      <button
        aria-selected={activeTab === "review"}
        className={activeTab === "review" ? "tab tab-active" : "tab"}
        onClick={() => onChange("review")}
        role="tab"
        type="button"
      >
        复盘
      </button>
    </div>
  );
}
