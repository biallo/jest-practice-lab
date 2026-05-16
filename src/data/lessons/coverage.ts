import { Lesson } from "./types";

export const coverage: Lesson = {
  id: "coverage",
  title: "覆盖率",
  eyebrow: "Lesson 10",
  summary: "看懂 statements、branches、functions、lines，并把覆盖率当作信号而不是目标本身。",
  sections: [
    {
      heading: "覆盖率说明测试跑到了哪里",
      body: [
        "覆盖率可以提示哪些代码没有被测试执行，但它不能证明测试质量一定高。",
        "分支覆盖率通常比行覆盖率更能暴露遗漏，因为业务 bug 经常藏在条件分支里。"
      ]
    }
  ],
  examples: [
    {
      title: "生成覆盖率报告",
      language: "bash",
      focusLines: [1, 3],
      code: `npx jest --coverage

# 重点：优先查看 branches，确认关键条件是否都被验证。
open coverage/lcov-report/index.html`
    }
  ],
  reviews: [
    {
      question: "100% 行覆盖率是否等于没有 bug？",
      answer: "不等于。覆盖率只说明代码被执行过，不说明断言是否覆盖了正确行为。"
    },
    {
      question: "为什么分支覆盖率值得关注？",
      answer: "业务逻辑的关键差异通常在条件分支中，分支遗漏更容易代表真实风险。"
    }
  ]
};
