import { Lesson } from "./types";

export const matchers: Lesson = {
  id: "matchers",
  title: "理解 expect 和匹配器",
  eyebrow: "Lesson 03",
  summary: "系统掌握常用匹配器，知道如何选择精确断言、结构断言、部分断言和异常断言。",
  sections: [
    {
      heading: "匹配器是断言的语言",
      body: [
        "`expect(value)` 选中要检查的结果，后面的 matcher 描述结果应该满足什么条件。写测试时不要急着找“哪个 matcher 能通过”，而要先问：这个测试真正承诺的行为是什么？",
        "断言越精确，失败时信息越明确；断言越宽松，越不容易因为无关字段变化而失败。熟练使用 matcher 的关键，是在精确和稳定之间做选择。"
      ]
    },
    {
      heading: "toBe、toEqual、toStrictEqual",
      body: [
        "`toBe` 使用 `Object.is` 做比较，适合数字、字符串、布尔值、null、undefined，以及检查同一个对象引用。对象和数组通常不要用 `toBe`，因为两个结构相同的对象也不是同一个引用。",
        "`toEqual` 比较对象结构和值，适合大多数对象断言。`toStrictEqual` 更严格，会区分 undefined 字段、稀疏数组和实例类型。默认先用 `toEqual`，当你需要强约束数据形状时再用 `toStrictEqual`。"
      ]
    },
    {
      heading: "部分匹配让测试更稳定",
      body: [
        "真实对象经常带有 id、时间戳、内部字段等和当前测试无关的信息。如果你用完整对象断言，测试会因为无关变化变脆弱。这时应该用 `expect.objectContaining`、`expect.arrayContaining` 或 `toMatchObject`。",
        "部分匹配不是偷懒，而是表达“我只关心这些行为承诺”。比如接口返回用户对象时，你可能只需要验证 `name` 和 `role`，不需要锁死所有字段。"
      ]
    },
    {
      heading: "异常、空值和浮点数",
      body: [
        "测试抛错时要把调用放进函数里：`expect(() => parse()).toThrow()`。如果你直接写 `expect(parse()).toThrow()`，异常会在 Jest 建立断言之前抛出。",
        "浮点数不要用 `toBe` 断言精确结果，因为二进制浮点会产生误差。应该用 `toBeCloseTo`。空值判断则用 `toBeNull`、`toBeUndefined`、`toBeDefined`，比 `toBe(null)` 更能表达意图。"
      ]
    }
  ],
  examples: [
    {
      title: "选择正确的相等断言",
      language: "typescript",
      focusLines: [2, 5, 8, 12],
      code: `expect(2 + 2).toBe(4);
// 对象结构相同但引用不同，所以使用 toEqual。
expect({ role: "admin" }).toEqual({ role: "admin" });

// 严格比较会检查 undefined 字段等细节。
expect({ name: "Ada", age: undefined }).toStrictEqual({ name: "Ada", age: undefined });

// 浮点数用 toBeCloseTo，避免精度误差导致失败。
expect(0.1 + 0.2).toBeCloseTo(0.3);

// 抛错断言必须传入函数。
expect(() => JSON.parse("{")).toThrow(SyntaxError);`
    },
    {
      title: "用部分匹配降低脆弱性",
      language: "typescript",
      focusLines: [6, 11],
      code: `const user = {
  id: "u_123",
  name: "Ada",
  role: "admin",
  createdAt: "2026-05-16T00:00:00.000Z"
};

expect(user).toEqual(expect.objectContaining({
  name: "Ada",
  role: "admin"
}));

expect(["unit", "integration", "e2e"]).toEqual(
  expect.arrayContaining(["unit", "integration"])
);`
    }
  ],
  reviews: [
    {
      question: "`toBe` 和 `toEqual` 的核心差异是什么？",
      answer: "`toBe` 检查原始值或同一引用；`toEqual` 递归比较对象和数组的结构和值。"
    },
    {
      question: "什么时候使用部分匹配？",
      answer: "当对象有很多和当前行为无关的字段时，使用部分匹配只锁定真正关心的字段，减少无意义失败。"
    },
    {
      question: "为什么浮点数不建议用 `toBe`？",
      answer: "因为二进制浮点存在精度误差，例如 0.1 + 0.2 不一定精确等于 0.3，应使用 `toBeCloseTo`。"
    },
    {
      question: "为什么 `toThrow` 要传函数？",
      answer: "Jest 需要接管函数执行并捕获异常；直接调用会让异常先于断言抛出。"
    }
  ]
};
