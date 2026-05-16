import { isElementFullyVisible, readLessonFromHash, syncLessonHash } from "./lessonNavigation";
import { lessons } from "../data/lessons";

function elementWithRect(rect: Partial<DOMRect>): HTMLElement {
  const element = document.createElement("div");

  element.getBoundingClientRect = jest.fn(() => ({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: () => undefined,
    ...rect
  }));

  return element;
}

describe("lessonNavigation", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  test("reads a valid lesson id from the hash", () => {
    window.history.replaceState(null, "", "/#async-testing");

    expect(readLessonFromHash()).toBe("async-testing");
  });

  test("falls back to the first lesson for an unknown hash", () => {
    window.history.replaceState(null, "", "/#missing-lesson");

    expect(readLessonFromHash()).toBe(lessons[0].id);
  });

  test("syncs the selected lesson into the current hash", () => {
    syncLessonHash("matchers");

    expect(window.location.hash).toBe("#matchers");
  });

  test("detects whether an element is fully visible inside a scroll container", () => {
    const container = elementWithRect({ top: 100, bottom: 300 });
    const visibleItem = elementWithRect({ top: 140, bottom: 240 });
    const clippedItem = elementWithRect({ top: 80, bottom: 180 });

    expect(isElementFullyVisible(container, visibleItem)).toBe(true);
    expect(isElementFullyVisible(container, clippedItem)).toBe(false);
  });
});
