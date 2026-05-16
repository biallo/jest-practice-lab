import { act, renderHook } from "@testing-library/react";
import { useCompletedLessons } from "./useCompletedLessons";

const completionKey = "jest-practice-lab.completed-lessons";

describe("useCompletedLessons", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("starts with no completed lessons when localStorage is empty", () => {
    const { result } = renderHook(() => useCompletedLessons());

    expect(result.current.completedLessons.size).toBe(0);
  });

  test("hydrates completed lessons from localStorage", () => {
    window.localStorage.setItem(completionKey, JSON.stringify(["what-is-jest", "matchers"]));

    const { result } = renderHook(() => useCompletedLessons());

    expect(result.current.completedLessons).toEqual(new Set(["what-is-jest", "matchers"]));
  });

  test("marks a lesson as completed and persists it", () => {
    const { result } = renderHook(() => useCompletedLessons());

    act(() => {
      result.current.markLessonCompleted("async-testing");
    });

    expect(result.current.completedLessons.has("async-testing")).toBe(true);
    expect(JSON.parse(window.localStorage.getItem(completionKey) ?? "[]")).toEqual(["async-testing"]);
  });

  test("ignores invalid localStorage data", () => {
    window.localStorage.setItem(completionKey, "not-json");

    const { result } = renderHook(() => useCompletedLessons());

    expect(result.current.completedLessons.size).toBe(0);
  });
});
