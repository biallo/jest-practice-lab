import { Lesson } from "./types";

export const snapshots: Lesson = {
  id: "snapshots",
  title: "快照测试",
  eyebrow: "Lesson 09",
  summary: "理解快照适用场景，以及如何避免把快照变成无意义的大文件。",
  sections: [
    {
      heading: "快照不是万能断言",
      body: [
        "快照适合验证结构稳定的输出，例如序列化配置、错误信息或小型 UI 片段。",
        "快照过大时，评审者很难判断变化是否正确。更好的做法是让快照小而明确。"
      ]
    }
  ],
  examples: [
    {
      title: "小而明确的快照",
      language: "typescript",
      focusLines: [6],
      code: `function buildConfig() {
  return { testEnvironment: "jsdom", clearMocks: true };
}

test("builds config", () => {
  // 重点：只快照稳定、可读的小对象。
  expect(buildConfig()).toMatchInlineSnapshot(\`
{
  "clearMocks": true,
  "testEnvironment": "jsdom",
}
\`);
});`
    }
  ],
  reviews: [
    {
      question: "大快照的问题是什么？",
      answer: "难以评审，容易被机械更新，最终失去测试作为反馈的价值。"
    }
  ]
};
