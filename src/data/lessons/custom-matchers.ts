import { Lesson } from "./types";

export const customMatchers: Lesson = {
  id: "custom-matchers",
  title: "自定义 Matcher",
  eyebrow: "Lesson 21",
  summary: "使用 `expect.extend` 把复杂断言封装成可读的业务语言，提高测试表达力。",
  sections: [
    {
      heading: "自定义 matcher 的价值",
      body: [
        "当同一类复杂断言在很多测试中重复出现时，可以用 `expect.extend` 封装成自定义 matcher。这样测试读起来像业务规则，而不是一串低层字段比较。",
        "自定义 matcher 适合稳定、通用、语义明确的断言。不要为了隐藏糟糕测试而封装，也不要把只用一次的断言提前抽象。"
      ]
    },
    {
      heading: "失败信息要有帮助",
      body: [
        "matcher 不只是返回 pass。好的 matcher 会提供清楚的失败 message，告诉读者实际值是什么、期望是什么。",
        "如果失败信息含糊，自定义 matcher 反而会降低调试效率。封装越多，越要重视错误输出。"
      ]
    }
  ],
  examples: [
    {
      title: "封装课程完成状态断言",
      language: "typescript",
      focusLines: [1, 5, 15],
      code: `expect.extend({
  toBeCompletedLesson(received) {
    const pass = received.completed === true && typeof received.completedAt === "string";

    return {
      pass,
      message: () =>
        pass
          ? "expected lesson not to be completed"
          : "expected lesson to be completed with completedAt"
    };
  }
});

test("marks lesson as completed", () => {
  expect(markCompleted(createLesson())).toBeCompletedLesson();
});`
    },
    {
      title: "为 TypeScript 声明 matcher 类型",
      language: "typescript",
      focusLines: [2, 4],
      code: `declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCompletedLesson(): R;
    }
  }
}`
    }
  ],
  reviews: [
    {
      question: "什么时候值得写自定义 matcher？",
      answer: "当复杂断言重复出现，并且能用稳定业务语言表达时值得写。"
    },
    {
      question: "自定义 matcher 最容易忽略什么？",
      answer: "失败信息。没有清晰 message，封装会让调试更困难。"
    },
    {
      question: "为什么 TypeScript 项目要补 matcher 类型？",
      answer: "否则测试能运行，但编辑器和类型检查不知道自定义 matcher 的存在。"
    }
  ]
};
