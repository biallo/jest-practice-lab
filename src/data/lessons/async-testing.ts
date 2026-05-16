import { Lesson } from "./types";

export const asyncTesting: Lesson = {
  id: "async-testing",
  title: "测试异步代码",
  eyebrow: "Lesson 04",
  summary: "掌握 Promise、async/await、reject 路径、并发结果和异步测试常见误判。",
  sections: [
    {
      heading: "异步测试必须让 Jest 等待",
      body: [
        "异步测试最大的坑不是 API 难，而是测试过早结束。如果你忘记 `return` 或 `await` Promise，Jest 可能在异步断言执行前就把测试标记为通过。",
        "推荐优先使用 `async/await`。它让测试像同步流程一样从上到下阅读，也更容易在中间插入准备步骤和额外断言。"
      ]
    },
    {
      heading: "resolves 和 rejects",
      body: [
        "`await expect(promise).resolves...` 用来断言 Promise 成功结果，`await expect(promise).rejects...` 用来断言失败结果。两者都需要 `await`，否则断言链本身不会被等待。",
        "测试失败路径时，不要只写 `try/catch` 然后在 catch 里断言。若 Promise 没有 reject，catch 不会执行，测试可能误通过。使用 `.rejects` 更直接；如果必须用 try/catch，要加 `expect.assertions()`。"
      ]
    },
    {
      heading: "异步测试里的 Arrange",
      body: [
        "异步代码通常依赖网络、数据库、缓存或队列。单元测试里不应该真的访问这些服务，而是把它们抽成依赖，再用 Mock 返回可控 Promise。",
        "如果你测试的是重试、超时、轮询这类逻辑，不要让测试真的等待几秒钟。后面的假定时器课程会讲如何控制时间。"
      ]
    },
    {
      heading: "并发结果的测试",
      body: [
        "当代码内部使用 `Promise.all` 或并发请求时，不要依赖完成顺序，除非顺序就是业务要求。断言数组时可以用 `arrayContaining`，或先按稳定字段排序。",
        "异步测试失败时先看两件事：Promise 是否被等待，Mock 是否返回了 Promise。很多“随机失败”都来自这两个问题。"
      ]
    }
  ],
  examples: [
    {
      title: "正确等待成功和失败路径",
      language: "typescript",
      focusLines: [5, 10, 15],
      code: `async function loadUser(id: string) {
  if (!id) throw new Error("id is required");
  return { id, name: "Ada" };
}

test("loads a user", async () => {
  await expect(loadUser("u1")).resolves.toEqual({ id: "u1", name: "Ada" });
});

test("rejects when id is empty", async () => {
  await expect(loadUser("")).rejects.toThrow("id is required");
});

test("can inspect the resolved value", async () => {
  const user = await loadUser("u1");
  expect(user.name).toBe("Ada");
});`
    },
    {
      title: "避免 try/catch 误通过",
      language: "typescript",
      focusLines: [2, 8],
      code: `test("rejects with a validation error", async () => {
  // 重点：确保 catch 分支至少执行一次断言。
  expect.assertions(1);

  try {
    await loadUser("");
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
  }
});`
    },
    {
      title: "Mock 异步依赖",
      language: "typescript",
      focusLines: [6, 9],
      code: `type Api = { getName: (id: string) => Promise<string> };

async function getGreeting(api: Api, id: string) {
  return \`Hello, \${await api.getName(id)}\`;
}

test("builds greeting from api result", async () => {
  const api = { getName: jest.fn().mockResolvedValue("Ada") };

  await expect(getGreeting(api, "u1")).resolves.toBe("Hello, Ada");
  expect(api.getName).toHaveBeenCalledWith("u1");
});`
    }
  ],
  reviews: [
    {
      question: "异步测试忘记 `await` 会发生什么？",
      answer: "Jest 可能在 Promise 完成前结束测试，导致本应失败的异步断言没有执行。"
    },
    {
      question: "为什么 `.rejects` 通常比 try/catch 更安全？",
      answer: "`.rejects` 明确要求 Promise 失败；如果 Promise 成功，测试会失败。try/catch 若没有额外断言保护，可能误通过。"
    },
    {
      question: "测试异步依赖时为什么常用 `mockResolvedValue`？",
      answer: "它能让依赖返回可控 Promise，避免真实网络或数据库影响测试速度和稳定性。"
    },
    {
      question: "并发异步结果为什么不应随便断言顺序？",
      answer: "除非业务要求顺序，否则并发完成顺序可能不是稳定行为。测试应断言集合内容或先排序。"
    }
  ]
};
