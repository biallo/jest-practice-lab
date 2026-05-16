import { Lesson } from "./types";

export const whatIsJest: Lesson = {
  id: "what-is-jest",
  title: "什么是 Jest",
  eyebrow: "Lesson 01",
  summary: "理解 Jest 解决的问题、核心能力，以及它为什么适合从小函数到 React 组件的测试。",
  sections: [
    {
      heading: "Jest 的定位",
      body: [
        "Jest 是一个 JavaScript 测试框架。它把测试运行器、断言库、Mock 能力、快照测试和覆盖率统计放在一套工具里，让你可以用同一种方式验证函数、模块、异步流程和 UI 组件。",
        "把 Jest 当成一个自动化检查员会更容易理解：你描述输入、动作和期望结果，Jest 负责执行这些描述，并在结果不一致时告诉你哪里偏离了预期。"
      ]
    },
    {
      heading: "它具体帮你做什么",
      body: [
        "第一，Jest 会寻找测试文件并运行它们。常见命名是 `*.test.ts`、`*.spec.ts` 或放在 `__tests__` 目录中。",
        "第二，Jest 提供 `test`、`describe`、`expect` 这类 API。你不需要额外安装断言库，就可以写出可读性很强的测试。",
        "第三，Jest 可以隔离模块和模拟依赖。比如把真实的网络请求替换成可控的假函数，让测试稳定、快速，并专注于当前代码的行为。"
      ]
    },
    {
      heading: "什么时候应该写 Jest 测试",
      body: [
        "当一段逻辑有明确输入输出、分支较多、被多处复用、或者曾经出过 bug 时，很适合写 Jest 测试。",
        "不要一开始追求覆盖所有代码。更实用的起点是：先覆盖最核心的业务规则，再覆盖容易回归的边界条件，最后补上组件和集成层面的关键路径。"
      ]
    }
  ],
  examples: [
    {
      title: "一个最小的 Jest 测试",
      language: "typescript",
      focusLines: [5, 6, 9],
      code: `export function sum(a: number, b: number) {
  return a + b;
}

test("adds two numbers", () => {
  // 重点：测试名称要描述行为，而不是重复实现细节。
  const result = sum(2, 3);

  // 重点：expect 表达“结果应该是什么”。
  expect(result).toBe(5);
});`
    },
    {
      title: "常见执行命令",
      language: "bash",
      focusLines: [1, 4],
      code: `npm test

# 重点：开发时可以只跑和改动相关的测试。
npx jest --watch`
    }
  ],
  reviews: [
    {
      question: "Jest 和单独的断言库有什么区别？",
      answer: "Jest 不只是断言库。它包含测试发现、测试运行、断言、Mock、快照和覆盖率等能力，是一套完整测试框架。"
    },
    {
      question: "为什么测试名称应该描述行为？",
      answer: "行为描述能让失败信息更有用。看到 `adds two numbers` 失败时，你知道业务期望是什么；看到 `sum test` 失败时，还要继续读代码。"
    },
    {
      question: "第一批最值得写的测试通常是哪类？",
      answer: "核心业务规则、边界条件、曾经出过问题的逻辑，以及多人协作时容易被误改的公共函数。"
    }
  ]
};
