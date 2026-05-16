import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LessonBody } from "./LessonBody";
import { Lesson } from "../data/lessons";

const lessonFixture: Lesson = {
  id: "lesson-fixture",
  eyebrow: "Lesson 01",
  title: "测试课程",
  summary: "用于验证课程内容组件的测试课程。",
  sections: [
    {
      heading: "测试讲解标题",
      body: ["测试讲解正文。"]
    }
  ],
  examples: [
    {
      title: "测试代码示例",
      language: "typescript",
      code: "expect(true).toBe(true);",
      focusLines: [1]
    }
  ],
  reviews: [
    {
      question: "测试复盘问题？",
      answer: "测试参考答案。"
    }
  ]
};

describe("LessonBody", () => {
  test("renders explanation sections and code examples", () => {
    render(<LessonBody activeTab="explain" completed={false} lesson={lessonFixture} onComplete={jest.fn()} />);

    expect(screen.getByRole("heading", { name: "测试讲解标题" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "示例代码" })).toBeInTheDocument();
    expect(screen.getByText("测试代码示例")).toBeInTheDocument();
  });

  test("renders review questions and calls onComplete from the review tab", async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();

    render(<LessonBody activeTab="review" completed={false} lesson={lessonFixture} onComplete={onComplete} />);

    expect(screen.getByText("测试复盘问题？")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "标记完成" }));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test("disables the completion button when the lesson is already completed", () => {
    render(<LessonBody activeTab="review" completed={true} lesson={lessonFixture} onComplete={jest.fn()} />);

    expect(screen.getByRole("button", { name: "已完成" })).toBeDisabled();
  });
});
