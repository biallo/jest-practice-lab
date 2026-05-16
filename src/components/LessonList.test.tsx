import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LessonList } from "./LessonList";
import { Lesson } from "../data/lessons";

const lessonFixtures: Lesson[] = [
  {
    id: "intro",
    eyebrow: "Lesson 01",
    title: "测试课程入门",
    summary: "用于验证课程列表渲染的第一课。",
    sections: [],
    examples: [],
    reviews: []
  },
  {
    id: "matchers",
    eyebrow: "Lesson 02",
    title: "测试匹配器",
    summary: "用于验证课程选择行为的第二课。",
    sections: [],
    examples: [],
    reviews: []
  },
  {
    id: "async",
    eyebrow: "Lesson 03",
    title: "测试异步代码",
    summary: "用于验证列表总数和完成进度的第三课。",
    sections: [],
    examples: [],
    reviews: []
  }
];

function renderLessonList(options: { completedLessons?: Set<string>; selectedLessonId?: string } = {}) {
  const onSelect = jest.fn();
  const itemRefs: { current: Record<string, HTMLButtonElement | null> } = { current: {} };

  render(
    <LessonList
      completedLessons={options.completedLessons ?? new Set()}
      itemRefs={itemRefs}
      lessons={lessonFixtures}
      listRef={createRef<HTMLDivElement>()}
      onSelect={onSelect}
      selectedLessonId={options.selectedLessonId ?? lessonFixtures[0].id}
    />
  );

  return { onSelect };
}

describe("LessonList", () => {
  test("shows completion progress in the sidebar header", () => {
    renderLessonList({ completedLessons: new Set(["intro", "matchers"]) });

    expect(screen.getByRole("progressbar", { name: `课程完成进度 2/${lessonFixtures.length}` })).toHaveAttribute(
      "aria-valuenow",
      "2"
    );
    expect(screen.getByText(`2/${lessonFixtures.length} 已完成`)).toBeInTheDocument();
  });

  test("marks the selected lesson with aria-current", () => {
    renderLessonList({ selectedLessonId: "matchers" });

    expect(screen.getByRole("button", { name: /测试匹配器/ })).toHaveAttribute("aria-current", "page");
  });

  test("renders completed status inside the lesson meta row", () => {
    renderLessonList({ completedLessons: new Set(["intro"]) });

    const firstLessonButton = screen.getByRole("button", { name: /测试课程入门/ });

    expect(firstLessonButton).toHaveTextContent("已完成");
  });

  test("calls onSelect when a lesson is clicked", async () => {
    const user = userEvent.setup();
    const { onSelect } = renderLessonList();

    await user.click(screen.getByRole("button", { name: /测试匹配器/ }));

    expect(onSelect).toHaveBeenCalledWith("matchers");
  });
});
