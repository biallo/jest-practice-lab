import { Lesson } from "./types";

export const testingStrategy: Lesson = {
  id: "testing-strategy",
  title: "制定测试策略",
  eyebrow: "Lesson 12",
  summary: "把单元测试、组件测试和集成测试放到合适位置，形成可维护的测试组合。",
  sections: [
    {
      heading: "测试组合要服务风险",
      body: [
        "单元测试反馈快，适合业务规则和纯函数。组件测试覆盖交互。集成测试验证多个模块协作后的关键路径。",
        "好的策略不是测试越多越好，而是在最少维护成本下覆盖最大的回归风险。"
      ]
    }
  ],
  examples: [
    {
      title: "选择测试层级",
      language: "typescript",
      focusLines: [2, 5, 8],
      code: `// 价格规则复杂：优先单元测试。
expect(calculateTotal(cart)).toBe(88);

// 用户点击后状态改变：组件测试。
expect(screen.getByText("已完成")).toBeInTheDocument();

// 登录后访问受保护页面：集成或端到端测试。
expect(router.currentPath).toBe("/dashboard");`
    }
  ],
  reviews: [
    {
      question: "为什么不是所有东西都写单元测试？",
      answer: "有些风险来自模块协作或用户交互，只测单个函数无法覆盖这些路径。"
    },
    {
      question: "测试策略应该优先考虑什么？",
      answer: "优先考虑业务风险、回归频率、反馈速度和维护成本。"
    }
  ]
};
