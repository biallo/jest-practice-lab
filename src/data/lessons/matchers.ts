import { Lesson } from "./types";

export const matchers: Lesson = {
  id: "matchers",
  title: "理解 expect 和匹配器",
  eyebrow: "Lesson 03",
  summary: "学习 `toBe`、`toEqual`、`toContain`、`toThrow` 等常用匹配器的适用场景。",
  sections: [
    {
      heading: "匹配器是断言的语言",
      body: [
        "`expect(value)` 选中要检查的结果，后面的匹配器描述它应该满足的条件。",
        "`toBe` 使用严格相等，适合数字、字符串、布尔值等原始类型；`toEqual` 会递归比较对象结构。"
      ]
    }
  ],
  examples: [
    {
      title: "选择合适的匹配器",
      language: "typescript",
      focusLines: [2, 5, 8],
      code: `expect(2 + 2).toBe(4);
// 重点：对象和数组通常使用 toEqual。
expect({ role: "admin" }).toEqual({ role: "admin" });

// 重点：数组包含关系比完整结构更宽松。
expect(["unit", "integration"]).toContain("unit");

// 重点：测试抛错时传入函数，而不是直接调用。
expect(() => JSON.parse("{")).toThrow();`
    }
  ],
  reviews: [
    {
      question: "`toBe` 和 `toEqual` 的差异是什么？",
      answer: "`toBe` 检查严格相等；`toEqual` 检查对象或数组的结构和值。"
    },
    {
      question: "为什么 `toThrow` 要包一层函数？",
      answer: "这样 Jest 才能接管函数执行并捕获异常；如果直接调用，异常会先于断言抛出。"
    }
  ]
};
