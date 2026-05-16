import { Lesson } from "./types";

export const edgeCaseTesting: Lesson = {
  id: "edge-case-testing",
  title: "错误测试与边界测试",
  eyebrow: "Lesson 16",
  summary: "学习如何选择测试用例：正常路径、边界值、非法输入、空状态和回归场景。",
  sections: [
    {
      heading: "测试质量取决于用例选择",
      body: [
        "很多测试没有价值，不是因为 Jest API 用错了，而是因为测试用例选得太浅。只测最顺利的 happy path，无法保护真实项目里最容易出错的边界。",
        "一个核心函数至少应该考虑：正常输入、最小值、最大值、空值、非法值、重复值、顺序变化和历史 bug。不是所有函数都需要全覆盖这些情况，但你必须主动判断。"
      ]
    },
    {
      heading: "边界值优先",
      body: [
        "边界值是 bug 高发区。金额的 0 和负数、数组的空和单项、分页的第一页和最后一页、日期的当天和过期边界，都比随机中间值更值得测。",
        "边界测试应该明确业务约定：非法输入是抛错、返回默认值、还是被忽略。没有约定的地方，测试会迫使你把规则说清楚。"
      ]
    },
    {
      heading: "错误路径也是行为",
      body: [
        "错误处理不是实现细节。对调用方来说，错误消息、错误类型、是否重试、是否回滚状态，都是可观察行为。",
        "测试错误时不要只断言“会抛错”。尽量断言错误类型或关键消息，确保失败原因符合预期。"
      ]
    }
  ],
  examples: [
    {
      title: "为校验函数设计用例",
      language: "typescript",
      focusLines: [2, 8, 14],
      code: `describe("validatePassword", () => {
  test("accepts a valid password", () => {
    expect(validatePassword("jest-2026")).toEqual({ ok: true });
  });

  test.each(["", "short", "onlyletters"])("rejects invalid password: %s", (password) => {
    expect(validatePassword(password)).toEqual(expect.objectContaining({ ok: false }));
  });

  test("returns a useful error message", () => {
    expect(validatePassword("short")).toMatchObject({
      ok: false,
      reason: "Password must be at least 8 characters"
    });
  });
});`
    },
    {
      title: "把 bug 转成回归测试",
      language: "typescript",
      focusLines: [1, 7],
      code: `test("keeps coupon discount when cart contains a free gift", () => {
  const cart = createCart({
    coupon: "VIP20",
    items: [{ price: 100, type: "normal" }, { price: 0, type: "gift" }]
  });

  expect(calculateTotal(cart)).toBe(80);
});`
    }
  ],
  reviews: [
    {
      question: "为什么边界值比随机中间值更重要？",
      answer: "边界值更容易触发条件判断、空值处理、越界和格式化错误，是 bug 高发区。"
    },
    {
      question: "错误路径应该测试什么？",
      answer: "测试错误类型、关键消息、状态是否回滚、重试是否发生，以及调用方能观察到的失败行为。"
    },
    {
      question: "回归测试的标准是什么？",
      answer: "它应该在修复前失败、修复后通过，并准确覆盖曾经出问题的场景。"
    }
  ]
};
