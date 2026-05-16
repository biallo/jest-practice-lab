import { Lesson } from "./types";

export const parameterizedTesting: Lesson = {
  id: "parameterized-testing",
  title: "参数化测试进阶",
  eyebrow: "Lesson 15",
  summary: "用 `test.each` 表达成组规则，覆盖权限矩阵、边界值组合和重复业务场景。",
  sections: [
    {
      heading: "参数化测试解决重复",
      body: [
        "当多个测试只有输入和期望不同，测试结构完全相同时，适合使用参数化测试。它能减少重复样板，让读者把注意力放在规则表本身。",
        "参数化测试不是为了少写几行代码，而是为了让同类规则集中展示。价格格式化、权限矩阵、状态流转、校验规则都很适合用 `test.each`。"
      ]
    },
    {
      heading: "表格就是规格说明",
      body: [
        "好的参数表应该像规格一样可读：每一行代表一个业务场景，每一列代表输入条件或期望结果。如果列太多、读起来费劲，说明这组测试可能需要拆分。",
        "测试名称要把参数带进去。Jest 支持在标题中使用占位符，这样失败时能直接看到是哪一组数据失败。"
      ]
    },
    {
      heading: "不要把无关场景硬塞进一张表",
      body: [
        "参数化测试容易被滥用。不同规则、不同异常路径、不同业务语义不要强行放在同一个 `test.each` 里，否则表格会变成难读的迷宫。",
        "判断标准很简单：如果每一行都能用同一句话解释，那就是好表；如果每一行都需要额外注释，应该拆成多个测试组。"
      ]
    }
  ],
  examples: [
    {
      title: "价格格式化规则表",
      language: "typescript",
      focusLines: [1, 7],
      code: `test.each([
  [0, "¥0.00"],
  [1, "¥0.01"],
  [1050, "¥10.50"],
  [999999, "¥9,999.99"]
])("formats %i cents as %s", (cents, expected) => {
  expect(formatPrice(cents)).toBe(expected);
});`
    },
    {
      title: "权限矩阵",
      language: "typescript",
      focusLines: [2, 10],
      code: `describe("canPublish", () => {
  test.each([
    ["admin", true, true],
    ["admin", false, false],
    ["editor", true, true],
    ["viewer", true, false]
  ])("role=%s active=%s -> %s", (role, active, expected) => {
    const user = createUser({ role, active });

    expect(canPublish(user)).toBe(expected);
  });
});`
    }
  ],
  reviews: [
    {
      question: "什么时候适合用 `test.each`？",
      answer: "当多个测试共享同一结构，只是输入和期望不同，并且这些场景属于同一条业务规则时适合。"
    },
    {
      question: "参数表太大时应该怎么办？",
      answer: "拆分为多个更小的 describe 或测试组，让每张表只表达一个清晰规则。"
    },
    {
      question: "为什么参数化测试的标题很重要？",
      answer: "失败时标题会告诉你具体是哪组参数失败，减少定位成本。"
    }
  ]
};
