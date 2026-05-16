import { Lesson } from "../data/lessons";
import { LessonTab } from "./LessonTabs";
import { CodeBlock } from "./CodeBlock";

type LessonBodyProps = {
  lesson: Lesson;
  activeTab: LessonTab;
  completed: boolean;
  onComplete: () => void;
};

export function LessonBody({ lesson, activeTab, completed, onComplete }: LessonBodyProps) {
  if (activeTab === "review") {
    return (
      <section className="tab-panel" role="tabpanel">
        <div className="review-list">
          {lesson.reviews.map((item, index) => (
            <details className="review-item" key={item.question}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.question}
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="review-actions">
          <button
            className={completed ? "complete-button complete-button-done" : "complete-button"}
            disabled={completed}
            onClick={onComplete}
            type="button"
          >
            {completed ? "已完成" : "标记完成"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="tab-panel" role="tabpanel">
      {lesson.sections.map((section) => (
        <section className="lesson-section" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}

      <section className="lesson-section lesson-examples-section">
        <h2>示例代码</h2>
        {lesson.examples.map((example) => (
          <CodeBlock example={example} key={example.title} />
        ))}
      </section>
    </section>
  );
}
