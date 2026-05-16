import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LessonList } from "./LessonList";
import { lessons } from "../data/lessons";

function renderLessonList(options: { completedLessons?: Set<string>; selectedLessonId?: string } = {}) {
  const onSelect = jest.fn();
  const itemRefs: { current: Record<string, HTMLButtonElement | null> } = { current: {} };

  render(
    <LessonList
      completedLessons={options.completedLessons ?? new Set()}
      itemRefs={itemRefs}
      listRef={createRef<HTMLDivElement>()}
      onSelect={onSelect}
      selectedLessonId={options.selectedLessonId ?? lessons[0].id}
    />
  );

  return { onSelect };
}

describe("LessonList", () => {
  test("shows completion progress in the sidebar header", () => {
    renderLessonList({ completedLessons: new Set(["what-is-jest", "matchers"]) });

    expect(screen.getByRole("progressbar", { name: `课程完成进度 2/${lessons.length}` })).toHaveAttribute(
      "aria-valuenow",
      "2"
    );
    expect(screen.getByText(`2/${lessons.length} 已完成`)).toBeInTheDocument();
  });

  test("marks the selected lesson with aria-current", () => {
    renderLessonList({ selectedLessonId: "matchers" });

    expect(screen.getByRole("button", { name: /理解 expect 和匹配器/ })).toHaveAttribute("aria-current", "page");
  });

  test("renders completed status inside the lesson meta row", () => {
    renderLessonList({ completedLessons: new Set(["what-is-jest"]) });

    const firstLessonButton = screen.getByRole("button", { name: /什么是 Jest/ });

    expect(firstLessonButton).toHaveTextContent("已完成");
  });

  test("calls onSelect when a lesson is clicked", async () => {
    const user = userEvent.setup();
    const { onSelect } = renderLessonList();

    await user.click(screen.getByRole("button", { name: /理解 expect 和匹配器/ }));

    expect(onSelect).toHaveBeenCalledWith("matchers");
  });
});
