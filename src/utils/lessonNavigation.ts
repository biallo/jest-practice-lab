import { lessons } from "../data/lessons";

export function readLessonFromHash() {
  const id = window.location.hash.replace(/^#/, "");
  return lessons.some((lesson) => lesson.id === id) ? id : lessons[0].id;
}

export function syncLessonHash(lessonId: string) {
  const nextHash = `#${lessonId}`;

  if (window.location.hash !== nextHash) {
    window.history.replaceState(null, "", nextHash);
  }
}

export function isElementFullyVisible(container: HTMLElement, element: HTMLElement) {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  return elementRect.top >= containerRect.top && elementRect.bottom <= containerRect.bottom;
}
