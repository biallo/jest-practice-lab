import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { LessonBody } from "./components/LessonBody";
import { LessonList } from "./components/LessonList";
import { LessonTab, LessonTabs } from "./components/LessonTabs";
import { lessons } from "./data/lessons";
import { useCompletedLessons } from "./hooks/useCompletedLessons";
import { isElementFullyVisible, readLessonFromHash, syncLessonHash } from "./utils/lessonNavigation";

function App() {
  const [selectedLessonId, setSelectedLessonId] = useState(readLessonFromHash);
  const [activeTab, setActiveTab] = useState<LessonTab>("explain");
  const { completedLessons, markLessonCompleted } = useCompletedLessons();
  const listRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const didInitialScroll = useRef(false);

  const selectedLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessons[0],
    [selectedLessonId]
  );

  useEffect(() => {
    syncLessonHash(selectedLessonId);
  }, [selectedLessonId]);

  useLayoutEffect(() => {
    const container = listRef.current;
    const selectedItem = itemRefs.current[selectedLessonId];

    if (!container || !selectedItem) {
      return;
    }

    if (!didInitialScroll.current) {
      selectedItem.scrollIntoView({ block: "center" });
      didInitialScroll.current = true;
      return;
    }

    if (!isElementFullyVisible(container, selectedItem)) {
      selectedItem.scrollIntoView({ block: "nearest" });
    }
  }, [selectedLessonId]);

  useLayoutEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
      contentRef.current.scrollLeft = 0;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [selectedLessonId]);

  function selectLesson(lessonId: string) {
    setSelectedLessonId(lessonId);
    setActiveTab("explain");
  }

  const lessonCompleted = completedLessons.has(selectedLesson.id);

  return (
    <main className="app-shell">
      <LessonList
        lessons={lessons}
        selectedLessonId={selectedLesson.id}
        completedLessons={completedLessons}
        onSelect={selectLesson}
        listRef={listRef}
        itemRefs={itemRefs}
      />

      <article className="lesson-content" ref={contentRef}>
        <header className="lesson-hero">
          <div>
            <p className="eyebrow">{selectedLesson.eyebrow}</p>
            <h1>{selectedLesson.title}</h1>
            <p>{selectedLesson.summary}</p>
          </div>
        </header>

        <LessonTabs activeTab={activeTab} onChange={setActiveTab} />
        <LessonBody
          activeTab={activeTab}
          completed={lessonCompleted}
          lesson={selectedLesson}
          onComplete={() => markLessonCompleted(selectedLesson.id)}
        />
      </article>
    </main>
  );
}

export default App;
