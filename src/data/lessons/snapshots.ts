import { Lesson } from "./types";

export const snapshots: Lesson = {
  id: "snapshots",
  title: "快照测试",
  eyebrow: "Lesson 09",
  summary: "理解快照测试的适用范围、评审方式和维护成本，避免把快照变成无意义的大文件。",
  sections: [
    {
      heading: "快照测试的本质",
      body: [
        "快照测试会把某次运行得到的输出保存下来，后续运行时和保存的版本比较。它适合验证结构化输出是否发生变化，例如配置对象、序列化结果、小型渲染片段和错误消息。",
        "快照不是“自动写断言”的魔法。它只告诉你输出变了，不能告诉你变化是否正确。判断变化是否合理仍然需要人来评审。"
      ]
    },
    {
      heading: "小快照才有价值",
      body: [
        "快照越大，评审成本越高。几百行 DOM 快照很容易被机械更新，最终没有人认真看差异。好的快照应该小、稳定、能表达业务结构。",
        "如果你只关心对象中的一部分字段，就不要快照整个对象。优先使用普通 matcher 或 inline snapshot 锁定关键结构。"
      ]
    },
    {
      heading: "什么时候不要用快照",
      body: [
        "不要用快照替代清晰断言。例如按钮点击后显示“已完成”，直接断言文本和 disabled 状态更清楚。快照适合结构变化难以手写但仍然可读的场景。",
        "不要快照包含随机 id、当前时间、排序不稳定字段的结果，除非你先把这些不稳定因素固定住。否则快照会频繁变化，变成噪音。"
      ]
    },
    {
      heading: "更新快照前要先理解差异",
      body: [
        "运行 `jest -u` 或 watch 模式里的 update snapshot 之前，先看 diff。确认变化来自有意修改，而不是无意回归。",
        "团队协作中，快照 diff 应该像代码 diff 一样被审查。只要没人读，快照就不再是测试，而是一个不断被覆盖的文件。"
      ]
    }
  ],
  examples: [
    {
      title: "小而明确的 inline snapshot",
      language: "typescript",
      focusLines: [6],
      code: `function buildJestConfig() {
  return { testEnvironment: "jsdom", clearMocks: true };
}

test("builds the default config", () => {
  // 重点：只快照稳定、可读的小对象。
  expect(buildJestConfig()).toMatchInlineSnapshot(\`
{
  "clearMocks": true,
  "testEnvironment": "jsdom",
}
\`);
});`
    },
    {
      title: "先固定不稳定字段",
      language: "typescript",
      focusLines: [2, 8],
      code: `test("serializes an invoice", () => {
  jest.spyOn(Date, "now").mockReturnValue(new Date("2026-05-16T00:00:00Z").getTime());

  expect(createInvoiceSnapshot()).toMatchInlineSnapshot(\`
{
  "createdAt": "2026-05-16T00:00:00.000Z",
  "status": "draft",
}
\`);
});`
    }
  ],
  reviews: [
    {
      question: "快照测试真正验证的是什么？",
      answer: "它验证输出结构是否和上次保存的一致，但不自动判断变化是否正确。"
    },
    {
      question: "为什么大快照危险？",
      answer: "大快照难以评审，容易被机械更新，最终无法提供有效回归保护。"
    },
    {
      question: "什么时候普通 matcher 比快照更好？",
      answer: "当你能用清晰断言表达行为时，普通 matcher 更直接、更易读，例如文本出现、按钮禁用、字段相等。"
    },
    {
      question: "更新快照前应该做什么？",
      answer: "先阅读 diff，确认变化是预期结果，而不是无意回归。"
    }
  ]
};
