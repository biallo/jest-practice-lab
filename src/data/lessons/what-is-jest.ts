import { Lesson } from "./types";

export const whatIsJest: Lesson = {
  id: "what-is-jest",
  title: "什么是 Jest",
  eyebrow: "Lesson 01",
  summary: "从测试框架的职责出发，建立 Jest 的完整心智模型：运行测试、表达预期、隔离依赖、反馈回归。",
  sections: [
    {
      heading: "Jest 不是一个单独的 API",
      body: [
        "Jest 是一套测试框架，而不是一个单独的断言函数。它同时承担测试发现、测试运行、断言、Mock、快照、覆盖率和 watch 模式等职责。理解这一点很重要，因为你写的每一条测试都会经过“发现文件 -> 准备环境 -> 执行测试 -> 收集结果 -> 输出报告”这条链路。",
        "初学时最容易把 Jest 理解成 `expect`。但在真实项目中，你还会频繁接触 `jest.fn()`、`jest.mock()`、`beforeEach()`、`test.each()`、`--coverage`、`--watch`、`testEnvironment`、`setupFilesAfterEnv` 等能力。熟练掌握 Jest 的关键，是知道这些能力分别解决测试链路中的哪类问题。"
      ]
    },
    {
      heading: "测试的目标是保护行为",
      body: [
        "一个好测试不是把实现过程复述一遍，而是描述代码对外承诺的行为。比如“未登录用户不能提交订单”是行为，“调用 `checkSession` 后 state 变成 false”更接近实现细节。行为测试更抗重构，因为只要用户可观察结果不变，内部写法可以自由调整。",
        "Jest 的测试通常由三段组成：Arrange 准备输入和依赖，Act 执行动作，Assert 验证结果。这不是强制格式，但它能帮助你避免把多个行为混进同一个测试里。一个测试越清楚，失败时定位问题越快。"
      ]
    },
    {
      heading: "Jest 适合覆盖哪些层级",
      body: [
        "纯函数和业务规则最适合用 Jest 做单元测试，因为输入输出明确、运行快、反馈直接。异步函数、模块协作和 React 组件也可以测试，但需要更谨慎地处理时间、网络、DOM 和外部依赖。",
        "不要把所有代码都写成单元测试。对复杂业务来说，单元测试负责规则正确性，组件测试负责用户交互，少量集成测试负责关键路径。Jest 能覆盖很多层级，但你的测试策略应该服务风险，而不是追求某个漂亮数字。"
      ]
    },
    {
      heading: "你应该怎样学习这门课",
      body: [
        "每课都先读讲解，再把示例代码手动敲一遍。不要只看断言通过，要故意改错一次，观察 Jest 的失败信息。能读懂失败信息，是从“会写测试”到“会用测试调试”的分水岭。",
        "复盘问题不是背 API，而是训练判断：什么时候用 `toEqual`，什么时候 Mock，什么时候不该 Mock，为什么异步测试必须 `await`。这些判断会直接影响测试是否稳定、可维护。"
      ]
    }
  ],
  examples: [
    {
      title: "用 Arrange / Act / Assert 写一个可读测试",
      language: "typescript",
      focusLines: [7, 10, 13],
      code: `type CartItem = { price: number; quantity: number };

function calculateTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

test("calculates the total price of a cart", () => {
  // Arrange：准备能表达业务场景的输入。
  const cart = [{ price: 12, quantity: 2 }, { price: 8, quantity: 1 }];

  // Act：只执行当前测试真正关心的动作。
  const total = calculateTotal(cart);

  // Assert：断言对外可观察的结果。
  expect(total).toBe(32);
});`
    },
    {
      title: "常见命令和它们解决的问题",
      language: "bash",
      focusLines: [1, 4, 7],
      code: `npm test

# 开发时缩短反馈循环，只运行相关测试。
npx jest --watch

# 评估哪些代码没有被测试触达。
npx jest --coverage`
    }
  ],
  reviews: [
    {
      question: "为什么说 Jest 不只是 `expect`？",
      answer: "因为 Jest 同时负责测试发现、运行、断言、Mock、快照、覆盖率和 watch 模式。`expect` 只是表达预期的其中一部分。"
    },
    {
      question: "什么样的测试更抗重构？",
      answer: "验证对外行为的测试更抗重构。它关心输入、动作和结果，而不是内部函数名、临时变量或具体实现步骤。"
    },
    {
      question: "Arrange / Act / Assert 的价值是什么？",
      answer: "它让测试结构清楚：先准备数据，再执行动作，最后验证结果。失败时你能快速判断问题出在输入、执行还是期望。"
    },
    {
      question: "为什么不应该只追求覆盖率数字？",
      answer: "覆盖率只能说明代码被执行过，不能证明断言有效。真正有价值的是覆盖高风险行为和容易回归的边界。"
    }
  ]
};
