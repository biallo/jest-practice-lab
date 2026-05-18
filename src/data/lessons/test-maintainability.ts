import { Lesson } from "./types";

export const testMaintainability: Lesson = {
  id: "test-maintainability",
  title: "测试可维护性重构",
  eyebrow: "Lesson 22",
  summary: "识别测试中的维护性问题：过度 Mock、脆弱快照、setup 过重、断言混乱和实现细节绑定。",
  sections: [
    {
      heading: "测试也需要重构",
      body: [
        "测试代码是长期资产，也会腐化。难读、脆弱、慢、经常误报的测试会让团队失去信任，最后没人愿意运行或维护。",
        "重构测试不是让它更抽象，而是让它更清楚：场景清楚、输入清楚、动作清楚、断言清楚、失败信息清楚。"
      ]
    },
    {
      heading: "常见维护性问题",
      body: [
        "测试名称模糊、一个测试验证太多行为、beforeEach 准备了大量不相关数据、Mock 了所有依赖、快照巨大、断言内部 state，都是维护性问题。",
        "这些问题会直接导致重构困难。实现稍微调整，测试就成片失败，但用户行为其实没有坏。"
      ]
    },
    {
      heading: "重构方向",
      body: [
        "把重复数据构造提取成工厂函数，把复杂断言提取成自定义 matcher 或辅助断言，把过大的测试拆成多个行为测试。",
        "减少全局 setup。测试里应该能看到当前场景的关键输入，否则读者必须跳到 setup 文件里拼上下文。"
      ]
    }
  ],
  examples: [
    {
      title: "从实现细节断言改为行为断言",
      language: "typescript",
      focusLines: [1, 8],
      code: `// 差：绑定内部回调名称。
expect(onInternalStateChange).toHaveBeenCalledWith({ completed: true });

// 好：验证用户能观察到的结果。
await user.click(screen.getByRole("button", { name: "标记完成" }));
expect(screen.getByRole("button", { name: "已完成" })).toBeDisabled();`
    },
    {
      title: "用工厂函数减少样板",
      language: "typescript",
      focusLines: [1, 10],
      code: `function createOrder(overrides: Partial<Order> = {}): Order {
  return {
    id: "order-1",
    status: "draft",
    total: 100,
    ...overrides
  };
}

test("allows paying draft orders", () => {
  expect(canPay(createOrder({ status: "draft" }))).toBe(true);
});`
    }
  ],
  reviews: [
    {
      question: "测试中的维护性问题会造成什么后果？",
      answer: "测试变慢、脆弱、难读，团队会逐渐不信任测试结果。"
    },
    {
      question: "为什么 setup 过重不好？",
      answer: "读者看不到当前测试真正依赖哪些输入，理解场景需要在多个位置跳转。"
    },
    {
      question: "测试重构的目标是什么？",
      answer: "让测试更清楚、更稳定、更贴近行为，而不是追求更复杂的抽象。"
    }
  ]
};
