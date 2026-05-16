import { Lesson } from "./types";

export const realProjectWorkflow: Lesson = {
  id: "real-project-workflow",
  title: "真实项目实战流程",
  eyebrow: "Lesson 24",
  summary: "把前面课程串起来：从业务规则到组件交互、网络边界、覆盖率和 CI，形成完整测试工作流。",
  sections: [
    {
      heading: "从一个功能开始",
      body: [
        "真实项目里不要为了写测试而写测试。选择一个完整小功能，例如“标记课程完成”，从纯规则、状态更新、组件交互、持久化边界一路测试下来。",
        "这种纵向练习能帮你理解每种测试的职责：单元测试保护规则，组件测试保护用户交互，MSW 测试网络响应，CI 保证每次提交都执行。"
      ]
    },
    {
      heading: "推荐实施顺序",
      body: [
        "第一步先抽出纯函数，比如计算完成进度、判断下一课。第二步测试状态更新函数。第三步测试组件点击和渲染。第四步如果有 API，用 MSW 测试成功和失败响应。",
        "最后跑覆盖率，检查有没有高风险分支遗漏；把测试命令放入 CI，确保团队每次提交都得到反馈。"
      ]
    },
    {
      heading: "完成标准",
      body: [
        "一个功能的测试不是覆盖所有实现细节，而是覆盖核心承诺：用户能完成什么、异常时看到什么、状态如何持久化、关键规则是否正确。",
        "如果看完失败信息能快速定位问题，并且重构内部实现时测试不需要大改，就说明这组测试质量不错。"
      ]
    }
  ],
  examples: [
    {
      title: "从纯函数开始",
      language: "typescript",
      focusLines: [1, 8],
      code: `function getProgress(completed: number, total: number) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

test.each([
  [0, 12, 0],
  [3, 12, 25],
  [12, 12, 100],
  [0, 0, 0]
])("completed=%i total=%i -> %i", (completed, total, expected) => {
  expect(getProgress(completed, total)).toBe(expected);
});`
    },
    {
      title: "再测试用户交互",
      language: "typescript",
      focusLines: [5, 8],
      code: `test("marks the current lesson as completed", async () => {
  const user = userEvent.setup();
  render(<LessonPage initialLessonId="what-is-jest" />);

  await user.click(screen.getByRole("tab", { name: "复盘" }));
  await user.click(screen.getByRole("button", { name: "标记完成" }));

  expect(screen.getByRole("button", { name: "已完成" })).toBeDisabled();
  expect(screen.getByText("1/24 已完成")).toBeInTheDocument();
});`
    },
    {
      title: "最后放进 CI",
      language: "bash",
      focusLines: [1, 4],
      code: `npm run typecheck
npm test -- --ci
npm run build
npm test -- --ci --coverage`
    }
  ],
  reviews: [
    {
      question: "为什么实战课要从纯函数开始？",
      answer: "纯函数反馈最快、最稳定，能先保护核心规则，再向组件和网络边界扩展。"
    },
    {
      question: "一个功能测试的完成标准是什么？",
      answer: "覆盖核心用户承诺和高风险分支，失败信息可定位，内部重构时测试不大改。"
    },
    {
      question: "为什么要把测试放进 CI？",
      answer: "CI 让每次提交都自动验证，防止测试只在本地偶尔运行。"
    }
  ]
};
