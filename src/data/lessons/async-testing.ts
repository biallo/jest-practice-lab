import { Lesson } from "./types";

export const asyncTesting: Lesson = {
  id: "async-testing",
  title: "测试异步代码",
  eyebrow: "Lesson 04",
  summary: "使用 `async/await`、`.resolves` 和 `.rejects` 可靠地验证 Promise 行为。",
  sections: [
    {
      heading: "异步测试的关键",
      body: [
        "异步测试必须让 Jest 等待 Promise 完成。最推荐的写法是把测试函数声明为 `async`，然后 `await` 你的断言。",
        "如果测试应该失败，请用 `.rejects` 或 `try/catch` 明确表达失败路径，避免 Promise 被吞掉。"
      ]
    }
  ],
  examples: [
    {
      title: "等待 Promise 结果",
      language: "typescript",
      focusLines: [4, 7],
      code: `async function fetchName() {
  return "Jest";
}

test("loads a name", async () => {
  // 重点：await 让 Jest 等待这个断言完成。
  await expect(fetchName()).resolves.toBe("Jest");
});`
    }
  ],
  reviews: [
    {
      question: "异步测试忘记 `await` 会有什么风险？",
      answer: "测试可能在 Promise 完成前就结束，导致本该失败的断言没有真正执行。"
    },
    {
      question: "什么时候用 `.rejects`？",
      answer: "当你期望 Promise 进入 rejected 状态，并且要验证错误内容或错误类型时使用。"
    }
  ]
};
