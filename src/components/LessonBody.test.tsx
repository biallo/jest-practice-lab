import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LessonBody } from "./LessonBody";
import { lessons } from "../data/lessons";

const lesson = lessons[0];

describe("LessonBody", () => {
  test("renders explanation sections and code examples", () => {
    render(<LessonBody activeTab="explain" completed={false} lesson={lesson} onComplete={jest.fn()} />);

    expect(screen.getByRole("heading", { name: "Jest 不是一个单独的 API" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "示例代码" })).toBeInTheDocument();
    expect(screen.getByText("用 Arrange / Act / Assert 写一个可读测试")).toBeInTheDocument();
  });

  test("renders review questions and calls onComplete from the review tab", async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();

    render(<LessonBody activeTab="review" completed={false} lesson={lesson} onComplete={onComplete} />);

    expect(screen.getByText("为什么说 Jest 不只是 `expect`？")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "标记完成" }));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test("disables the completion button when the lesson is already completed", () => {
    render(<LessonBody activeTab="review" completed={true} lesson={lesson} onComplete={jest.fn()} />);

    expect(screen.getByRole("button", { name: "已完成" })).toBeDisabled();
  });
});
