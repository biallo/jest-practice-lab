import { Lesson } from "./types";

export const firstTestFile: Lesson = {
  id: "first-test-file",
  title: "创建第一个测试文件",
  eyebrow: "Lesson 02",
  summary: "掌握测试文件组织、命名约定、测试结构，以及如何让失败信息具备定位价值。",
  sections: [
    {
      heading: "测试文件放在哪里",
      body: [
        "Jest 默认会识别常见测试文件命名，例如 `*.test.ts`、`*.spec.ts`，也能识别 `__tests__` 目录。对于应用代码，推荐把测试文件放在被测文件旁边，例如 `formatPrice.ts` 和 `formatPrice.test.ts`。这样重构、移动和删除模块时，测试更容易一起维护。",
        "如果是跨模块的集成测试，可以放在 `tests/` 或 `__tests__/` 目录里，让它和单个模块的单元测试区分开。关键不是目录名字，而是团队能一眼看出测试覆盖的是单个模块、组件交互还是跨模块流程。"
      ]
    },
    {
      heading: "测试名称要描述行为",
      body: [
        "失败信息首先显示的是测试名称。`test(\"works\")` 通过时没问题，失败时毫无价值；`test(\"formats zero cents as ¥0.00\")` 会直接告诉你失败的业务场景。",
        "一个好的测试名称通常包含“条件 + 期望”。例如“returns guest menu when user is anonymous”比“menu test”更好。你不需要把实现细节写进名称，而应该写用户或调用方能感知的行为。"
      ]
    },
    {
      heading: "describe 的作用",
      body: [
        "`describe` 用来给一组测试建立上下文。它不会让测试更正确，但能让报告更清楚，也方便给同一组测试共享准备逻辑。",
        "不要为了嵌套而嵌套。通常一层 `describe(\"formatPrice\")` 足够；如果同一函数有明显场景，可以再加一层 `describe(\"when currency is CNY\")`。嵌套太深会让读者在上下文中迷路。"
      ]
    },
    {
      heading: "先写最有价值的第一批测试",
      body: [
        "第一个测试文件不要从简单 getter 开始，而应该从业务规则开始。选择输入输出明确、容易被改坏、多人都会依赖的函数。",
        "第一批测试建议覆盖正常路径、一个边界值、一个异常或空状态。这样你能立刻体验测试对重构和回归的保护，而不是只得到“我写了测试”的心理安慰。"
      ]
    }
  ],
  examples: [
    {
      title: "给价格格式化函数建立测试文件",
      language: "typescript",
      focusLines: [3, 4, 9, 13],
      code: `import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  test("formats cents as yuan with two decimals", () => {
    // 正常路径：最常见、最核心的业务行为。
    expect(formatPrice(1299)).toBe("¥12.99");
  });

  test("formats zero cents", () => {
    // 边界值：0 经常暴露空值、除法和格式化问题。
    expect(formatPrice(0)).toBe("¥0.00");
  });

  test("rejects negative cents", () => {
    // 异常路径：明确非法输入应该如何失败。
    expect(() => formatPrice(-1)).toThrow("price cannot be negative");
  });
});`
    },
    {
      title: "用 test.each 覆盖同类规则",
      language: "typescript",
      focusLines: [1, 7],
      code: `test.each([
  [0, "¥0.00"],
  [1, "¥0.01"],
  [1050, "¥10.50"],
  [999999, "¥9,999.99"]
])("formats %i cents as %s", (cents, expected) => {
  // 表驱动测试适合多个输入共享同一判断逻辑。
  expect(formatPrice(cents)).toBe(expected);
});`
    }
  ],
  reviews: [
    {
      question: "什么时候把测试放在源码旁边，什么时候放到独立 tests 目录？",
      answer: "单个模块的单元测试适合放源码旁边；跨模块流程、集成场景或端到端风格测试更适合放到独立 tests 目录。"
    },
    {
      question: "为什么 `test(\"works\")` 是糟糕名称？",
      answer: "它不能提供失败上下文。测试失败时，你需要从名称直接知道哪个行为坏了，而不是重新阅读整段代码。"
    },
    {
      question: "`test.each` 适合什么场景？",
      answer: "适合同一行为有多组输入输出的场景，例如格式化、校验规则、权限矩阵和边界值表。"
    },
    {
      question: "第一个测试文件应该优先覆盖哪些路径？",
      answer: "优先覆盖核心正常路径、关键边界值、异常输入和曾经出过问题的规则。"
    }
  ]
};
