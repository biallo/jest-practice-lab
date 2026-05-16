import { Lesson } from "./types";

export const reactTesting: Lesson = {
  id: "react-testing",
  title: "React 组件测试思路",
  eyebrow: "Lesson 08",
  summary: "学习从用户视角测试组件：查询可访问元素、触发交互、处理异步 UI，并避免测试实现细节。",
  sections: [
    {
      heading: "组件测试关注用户可观察行为",
      body: [
        "React 组件测试不应该过度关心 state 名称、组件内部函数或 DOM 层级，而应该验证用户看到什么、能点击什么、交互后页面如何变化。",
        "这也是 Testing Library 的核心思想：测试越接近用户使用方式，越能给你信心。你可以配合 Jest 使用 `@testing-library/react`、`@testing-library/user-event` 和 `@testing-library/jest-dom`。"
      ]
    },
    {
      heading: "优先按角色查询",
      body: [
        "优先使用 `getByRole`，因为它和可访问性语义一致，也更接近用户通过屏幕阅读器或浏览器理解界面的方式。按钮、链接、输入框、标题都应该能通过 role 和 name 查到。",
        "如果 `getByRole` 查不到，先检查组件是否缺少语义，而不是立刻改用 `querySelector`。测试经常能反过来推动你写出更可访问的 UI。"
      ]
    },
    {
      heading: "交互要用 user-event",
      body: [
        "`fireEvent` 只是触发单个底层事件；`userEvent` 更接近真实用户操作，比如点击会包含 pointer、mouse、focus 等行为。多数交互测试应该优先使用 `userEvent`。",
        "用户交互经常触发异步更新。点击后如果 UI 不是立即出现，使用 `findBy...` 或 `waitFor` 等待，不要手动 `setTimeout`。"
      ]
    },
    {
      heading: "不要测试实现细节",
      body: [
        "不要断言某个 state 是否被设置、某个内部函数是否被调用，除非它就是组件对外暴露的协作结果。更好的断言是：按钮文字变了、错误提示出现了、列表新增了一项。",
        "如果一个组件很难从用户视角测试，通常说明它承担了太多职责。可以把纯业务逻辑抽到函数里用 Jest 单测，把组件测试留给用户交互。"
      ]
    }
  ],
  examples: [
    {
      title: "从用户视角测试完成按钮",
      language: "typescript",
      focusLines: [5, 8, 10],
      code: `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("marks a lesson as completed", async () => {
  const user = userEvent.setup();
  render(<LessonActions />);

  await user.click(screen.getByRole("button", { name: "标记完成" }));

  expect(screen.getByRole("button", { name: "已完成" })).toBeDisabled();
});`
    },
    {
      title: "测试异步加载状态",
      language: "typescript",
      focusLines: [4, 8, 11],
      code: `test("shows loaded lessons", async () => {
  server.use(mockLessonsResponse([{ id: "1", title: "什么是 Jest" }]));

  render(<LessonPage />);

  expect(screen.getByText("加载中")).toBeInTheDocument();

  // findBy 会等待元素出现，适合异步 UI。
  expect(await screen.findByRole("heading", { name: "什么是 Jest" })).toBeInTheDocument();

  expect(screen.queryByText("加载中")).not.toBeInTheDocument();
});`
    },
    {
      title: "避免实现细节断言",
      language: "typescript",
      focusLines: [3, 8],
      code: `test("filters lessons by keyword", async () => {
  const user = userEvent.setup();
  render(<LessonSearch />);

  // 好：像用户一样输入，观察列表结果。
  await user.type(screen.getByRole("searchbox", { name: "搜索课程" }), "mock");

  expect(screen.getByRole("link", { name: "Mock 函数" })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "快照测试" })).not.toBeInTheDocument();
});`
    }
  ],
  reviews: [
    {
      question: "为什么组件测试推荐优先使用 `getByRole`？",
      answer: "它贴近用户和辅助技术理解页面的方式，也能促使组件具备正确语义。"
    },
    {
      question: "`userEvent` 相比 `fireEvent` 的优势是什么？",
      answer: "`userEvent` 更接近真实用户操作，会触发更完整的事件序列，适合多数交互测试。"
    },
    {
      question: "异步 UI 出现时应该怎么断言？",
      answer: "使用 `findBy...` 或 `waitFor` 等待结果出现，不要用固定时间的 `setTimeout`。"
    },
    {
      question: "组件测试中什么算实现细节？",
      answer: "内部 state、私有函数、DOM 层级和非用户可观察的调用过程通常都属于实现细节。"
    }
  ]
};
