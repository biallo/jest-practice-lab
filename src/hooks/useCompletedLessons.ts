import { useEffect, useState } from "react";

const completionKey = "jest-practice-lab.completed-lessons";

function readCompletedLessons() {
  try {
    const raw = window.localStorage.getItem(completionKey);
    return raw ? new Set<string>(JSON.parse(raw) as string[]) : new Set<string>();
  } catch {
    return new Set<string>();
  }
}

export function useCompletedLessons() {
  const [completedLessons, setCompletedLessons] = useState(readCompletedLessons);

  useEffect(() => {
    window.localStorage.setItem(completionKey, JSON.stringify(Array.from(completedLessons)));
  }, [completedLessons]);

  function markLessonCompleted(lessonId: string) {
    setCompletedLessons((current) => {
      const next = new Set(current);
      next.add(lessonId);
      return next;
    });
  }

  return {
    completedLessons,
    markLessonCompleted
  };
}
