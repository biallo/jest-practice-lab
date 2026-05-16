import { Lesson } from "./types";

export const reactTesting: Lesson = {
  id: "react-testing",
  title: "React 组件测试思路",
  eyebrow: "Lesson 08",
  summary: "从用户可观察行为出发，理解组件测试应该关注什么、避免什么。",
  sections: [
    {
      heading: "组件测试看行为",
      body: [
        "React 组件测试不应该过度关心 state 名称或组件内部函数，而应该验证用户能看到什么、点击后发生什么。",
        "实践中通常配合 Testing Library 使用，让查询方式更接近真实用户。"
      ]
    }
  ],
  examples: [
    {
      title: "从用户角度写断言",
      language: "typescript",
      focusLines: [4, 7],
      code: `test("marks a lesson as completed", async () => {
  render(<LessonActions />);

  // 重点：按按钮角色和名称查询，贴近用户视角。
  await user.click(screen.getByRole("button", { name: "标记完成" }));

  expect(screen.getByRole("button", { name: "已完成" })).toBeDisabled();
});`
    }
  ],
  reviews: [
    {
      question: "组件测试为什么更推荐从用户视角查询？",
      answer: "这样测试更接近真实行为，也不会因为内部实现重构而频繁失败。"
    },
    {
      question: "什么时候不要写组件测试？",
      answer: "纯展示且几乎没有逻辑的组件可以少写或不写，把测试精力留给关键交互和业务规则。"
    }
  ]
};
