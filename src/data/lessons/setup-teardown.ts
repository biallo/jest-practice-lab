import { Lesson } from "./types";

export const setupTeardown: Lesson = {
  id: "setup-teardown",
  title: "准备和清理",
  eyebrow: "Lesson 07",
  summary: "使用 `beforeEach`、`afterEach` 管理测试上下文，避免测试互相污染。",
  sections: [
    {
      heading: "测试之间应该独立",
      body: [
        "每个测试都应该能单独运行。共享状态如果没有重置，会导致顺序依赖和偶发失败。",
        "`beforeEach` 适合创建干净数据，`afterEach` 适合恢复 Mock、清理 DOM 或关闭资源。"
      ]
    }
  ],
  examples: [
    {
      title: "每个测试重建状态",
      language: "typescript",
      focusLines: [3, 8],
      code: `let cart: string[];

beforeEach(() => {
  // 重点：每个测试拿到全新的状态。
  cart = [];
});

test("adds an item", () => {
  cart.push("book");
  expect(cart).toEqual(["book"]);
});`
    }
  ],
  reviews: [
    {
      question: "为什么测试之间不应该共享可变状态？",
      answer: "共享状态会让测试结果依赖运行顺序，导致单独运行通过、整体运行失败。"
    },
    {
      question: "`beforeEach` 和 `beforeAll` 怎么选？",
      answer: "需要每个测试隔离时用 `beforeEach`；昂贵且只读的初始化可以考虑 `beforeAll`。"
    }
  ]
};
