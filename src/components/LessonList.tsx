import { RefObject } from "react";
import { Lesson } from "../data/lessons";

type LessonListProps = {
  lessons: Lesson[];
  selectedLessonId: string;
  completedLessons: Set<string>;
  onSelect: (lessonId: string) => void;
  listRef: RefObject<HTMLDivElement | null>;
  itemRefs: RefObject<Record<string, HTMLButtonElement | null>>;
};

export function LessonList({
  lessons,
  selectedLessonId,
  completedLessons,
  onSelect,
  listRef,
  itemRefs
}: LessonListProps) {
  const progress = Math.round((completedLessons.size / lessons.length) * 100);

  return (
    <aside className="lesson-sidebar" aria-label="课程列表">
      <div className="sidebar-header">
        <div className="sidebar-title-row">
          <img src="icons/apple-touch-icon.png" alt="Jest Practice Lab" />
          <div className="sidebar-title">
            <p className="name">Jest</p>
            <p>Practice Lab</p>
          </div>
        </div>
        <div className="sidebar-progress-row">
          <div
            aria-label={`课程完成进度 ${completedLessons.size}/${lessons.length}`}
            aria-valuemax={lessons.length}
            aria-valuemin={0}
            aria-valuenow={completedLessons.size}
            className="sidebar-progress"
            role="progressbar"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <span>{completedLessons.size}/{lessons.length} 已完成</span>
        </div>
      </div>

      <select
        className="mobile-lesson-select"
        aria-label="选择课程"
        value={selectedLessonId}
        onChange={(event) => onSelect(event.target.value)}
      >
        {lessons.map((lesson) => (
          <option key={lesson.id} value={lesson.id}>
            {lesson.eyebrow} · {lesson.title}
          </option>
        ))}
      </select>

      <div className="lesson-list" ref={listRef}>
        {lessons.map((lesson) => {
          const active = lesson.id === selectedLessonId;
          const completed = completedLessons.has(lesson.id);

          return (
            <button
              aria-current={active ? "page" : undefined}
              className={active ? "lesson-item lesson-item-active" : "lesson-item"}
              key={lesson.id}
              onClick={() => onSelect(lesson.id)}
              ref={(node) => {
                itemRefs.current[lesson.id] = node;
              }}
              type="button"
            >
              <span className="lesson-item-meta">
                <span>{lesson.eyebrow}</span>
                {completed ? <span className="done-pill">已完成</span> : null}
              </span>
              <strong>{lesson.title}</strong>
              <small>{lesson.summary}</small>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
