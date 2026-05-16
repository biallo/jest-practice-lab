import { Lesson } from "./types";

export const firstTestFile: Lesson = {
  id: "first-test-file",
  title: "创建第一个测试文件",
  eyebrow: "Lesson 02",
  summary: "掌握测试文件命名、`describe` 分组和 `test` 的基本结构。",
  sections: [
    {
      heading: "测试文件如何被发现",
      body: [
        "Jest 默认会扫描常见测试命名，例如 `*.test.ts` 和 `*.spec.ts`。把测试放在被测文件旁边，可以让维护成本更低。",
        "`describe` 不是必需的，但它适合把同一模块或同一场景下的测试组织在一起。"
      ]
    }
  ],
  examples: [
    {
      title: "按模块组织测试",
      language: "typescript",
      focusLines: [3, 4, 8],
      code: `import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  test("formats cents as yuan", () => {
    // 重点：一个 test 只验证一个清晰行为。
    const text = formatPrice(1299);

    expect(text).toBe("¥12.99");
  });
});`
    }
  ],
  reviews: [
    {
      question: "`describe` 的主要作用是什么？",
      answer: "它负责组织相关测试，让输出层级更清晰，也方便统一准备同一组测试上下文。"
    },
    {
      question: "测试文件应该远离源码还是靠近源码？",
      answer: "两种都可以。入门和小项目中靠近源码更直接，重构时也更容易一起移动。"
    }
  ]
};
