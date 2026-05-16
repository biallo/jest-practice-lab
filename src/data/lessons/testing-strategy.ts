import { Lesson } from "./types";

export const testingStrategy: Lesson = {
  id: "testing-strategy",
  title: "制定测试策略",
  eyebrow: "Lesson 14",
  summary: "把单元测试、组件测试、集成测试和覆盖率组合成可维护的质量体系。",
  sections: [
    {
      heading: "测试策略服务风险",
      body: [
        "成熟项目不是测试越多越好，而是在有限维护成本下覆盖最大风险。你需要知道哪些代码最容易出错、哪些路径最影响用户、哪些模块最常被改动。",
        "Jest 很适合快速反馈，但并不意味着所有风险都用 Jest 单测解决。业务规则、组件交互、模块集成和端到端流程应该分层覆盖。"
      ]
    },
    {
      heading: "测试金字塔的实际含义",
      body: [
        "底层是大量快速单元测试，负责纯函数、规则、边界和错误处理。中间是组件或集成测试，负责多个模块协作和用户交互。顶层是少量端到端测试，负责真实用户关键路径。",
        "不要把端到端测试当成所有问题的答案。它们最接近真实用户，但慢、贵、定位困难。也不要只写单元测试，否则模块协作风险会漏掉。"
      ]
    },
    {
      heading: "怎么决定写哪种测试",
      body: [
        "如果逻辑是纯输入输出，写单元测试。如果风险来自用户交互，写组件测试。如果风险来自多个模块协作，写集成测试。如果风险来自浏览器、路由、后端和真实部署链路，才考虑端到端测试。",
        "对每个 bug 修复，至少补一条能在修复前失败、修复后通过的回归测试。这样的测试最有价值，因为它直接防止同类问题再次出现。"
      ]
    },
    {
      heading: "维护测试质量",
      body: [
        "好的测试应该快速、稳定、可读、失败信息明确。慢测试会没人愿意跑，脆弱测试会被忽略，难读测试会阻碍重构。",
        "当测试经常因为无关改动失败时，不要盲目更新断言。先判断它是不是绑定了实现细节、用了过宽的 Mock、依赖共享状态，或者断言了不稳定字段。"
      ]
    }
  ],
  examples: [
    {
      title: "按风险选择测试层级",
      language: "typescript",
      focusLines: [2, 5, 8, 11],
      code: `// 价格规则复杂：优先单元测试。
expect(calculateTotal(cart)).toBe(88);

// 用户点击后状态改变：组件测试。
expect(screen.getByRole("button", { name: "已完成" })).toBeDisabled();

// 多个模块协作生成订单：集成测试。
await expect(placeOrder(user, cart)).resolves.toMatchObject({ status: "created" });

// 登录后跳转并看到仪表盘：端到端测试更合适。
await page.getByRole("heading", { name: "Dashboard" }).waitFor();`
    },
    {
      title: "为 bug 补回归测试",
      language: "typescript",
      focusLines: [4, 7],
      code: `test("keeps discount when cart contains a free gift", () => {
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
      question: "为什么测试策略要从风险出发？",
      answer: "测试有维护成本。优先覆盖高风险、高价值、常变更的行为，才能用最少成本获得最大保护。"
    },
    {
      question: "单元测试、组件测试、集成测试分别适合什么？",
      answer: "单元测试适合纯逻辑，组件测试适合用户交互，集成测试适合多个模块协作。"
    },
    {
      question: "修 bug 后为什么要补回归测试？",
      answer: "回归测试能证明 bug 曾经会失败，并防止未来同类问题再次出现。"
    },
    {
      question: "一个测试经常无关失败时应该怀疑什么？",
      answer: "它可能绑定实现细节、依赖共享状态、Mock 过度、断言不稳定字段，或测试层级选错。"
    }
  ]
};
