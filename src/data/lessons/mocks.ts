import { Lesson } from "./types";

export const mocks: Lesson = {
  id: "mocks",
  title: "Mock 函数",
  eyebrow: "Lesson 05",
  summary: "用 `jest.fn()` 验证回调调用次数、参数，以及替换不稳定依赖。",
  sections: [
    {
      heading: "Mock 的价值",
      body: [
        "Mock 函数会记录它被调用的过程。你可以检查调用次数、调用参数，也可以临时指定返回值。",
        "它适合替换网络、时间、随机数、埋点和外部 SDK 这类不应该在单元测试中真实执行的依赖。"
      ]
    }
  ],
  examples: [
    {
      title: "验证回调被正确调用",
      language: "typescript",
      focusLines: [6, 8],
      code: `function save(onSuccess: (id: string) => void) {
  onSuccess("task-1");
}

test("calls success callback with id", () => {
  const onSuccess = jest.fn();

  save(onSuccess);

  // 重点：验证协作方式，而不是读取内部变量。
  expect(onSuccess).toHaveBeenCalledWith("task-1");
});`
    }
  ],
  reviews: [
    {
      question: "Mock 函数最常验证什么？",
      answer: "调用次数、调用参数、调用顺序，以及被替换依赖的返回值。"
    },
    {
      question: "Mock 会不会让测试变脆弱？",
      answer: "会。如果测试过度绑定内部实现而不是公开行为，重构时很容易无意义失败。"
    }
  ]
};
