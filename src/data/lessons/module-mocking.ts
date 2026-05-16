import { Lesson } from "./types";

export const moduleMocking: Lesson = {
  id: "module-mocking",
  title: "Mock 模块",
  eyebrow: "Lesson 06",
  summary: "理解 `jest.mock`、`jest.spyOn`、模块边界和依赖隔离，学会稳定地替换外部模块。",
  sections: [
    {
      heading: "模块 Mock 解决什么问题",
      body: [
        "当被测模块导入了网络客户端、数据库、文件系统、日期工具、外部 SDK 时，直接运行真实依赖会让测试慢、不稳定、难以复现。模块 Mock 可以把这些依赖替换成可控版本。",
        "模块 Mock 的目标不是把所有依赖都换掉，而是隔离当前测试不关心的边界。你要测试的是当前模块如何处理依赖结果，而不是依赖本身是否工作。"
      ]
    },
    {
      heading: "jest.mock 的基本流程",
      body: [
        "`jest.mock(\"./api\")` 会让 Jest 在加载模块时用 Mock 版本替换目标模块。然后你可以通过 `jest.mocked(apiFunction)` 获得带类型的 Mock，并设置返回值。",
        "模块 Mock 和导入顺序有关。一般把 `jest.mock()` 写在 import 附近的顶层，避免在测试执行过程中才替换已经加载过的模块。"
      ]
    },
    {
      heading: "spyOn 适合局部替换",
      body: [
        "如果你只想临时观察或替换对象上的某个方法，可以用 `jest.spyOn(object, \"method\")`。它的优势是能在测试后通过 `mockRestore()` 或 `jest.restoreAllMocks()` 恢复真实实现。",
        "例如测试日志、日期、随机数时，spy 比完整模块 Mock 更轻。它表达的是“这个测试只替换一个方法”，不会影响模块的其他导出。"
      ]
    },
    {
      heading: "模块隔离的判断标准",
      body: [
        "如果依赖是确定、快速、无副作用的纯函数，通常不需要 Mock。真实依赖能让测试覆盖更多真实协作。",
        "如果依赖不稳定、慢、有副作用、需要认证、依赖当前时间或随机数，就应该 Mock。熟练使用 Jest 的关键之一，就是知道哪些边界应该隔离，哪些不应该。"
      ]
    }
  ],
  examples: [
    {
      title: "Mock API 模块",
      language: "typescript",
      focusLines: [4, 9, 12],
      code: `import { getUser } from "./api";
import { loadUserName } from "./loadUserName";

jest.mock("./api");

test("loads user name from api", async () => {
  const mockedGetUser = jest.mocked(getUser);

  // 重点：外部 API 不真实请求，只返回当前场景需要的数据。
  mockedGetUser.mockResolvedValue({ id: "u1", name: "Ada" });

  await expect(loadUserName("u1")).resolves.toBe("Ada");
  expect(mockedGetUser).toHaveBeenCalledWith("u1");
});`
    },
    {
      title: "用 spyOn 替换局部方法",
      language: "typescript",
      focusLines: [2, 7],
      code: `afterEach(() => {
  jest.restoreAllMocks();
});

test("uses the current year in copyright text", () => {
  jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(2026);

  expect(getCopyright()).toBe("Copyright 2026");
});`
    },
    {
      title: "不要 Mock 纯函数工具",
      language: "typescript",
      focusLines: [6, 9],
      code: `import { normalizeEmail } from "./normalizeEmail";
import { createUser } from "./createUser";

test("normalizes email before creating user", () => {
  // 重点：normalizeEmail 是快速确定的纯函数，使用真实实现更有价值。
  const user = createUser({ email: " ADA@EXAMPLE.COM " });

  expect(user.email).toBe("ada@example.com");
  expect(normalizeEmail(" ADA@EXAMPLE.COM ")).toBe("ada@example.com");
});`
    }
  ],
  reviews: [
    {
      question: "模块 Mock 通常用来替换哪些依赖？",
      answer: "网络、数据库、文件系统、外部 SDK、时间、随机数等慢、不稳定或有副作用的依赖。"
    },
    {
      question: "`jest.mock` 和 `jest.spyOn` 怎么选？",
      answer: "需要替换整个模块边界时用 `jest.mock`；只观察或替换对象上的单个方法时用 `jest.spyOn`。"
    },
    {
      question: "为什么不应该 Mock 快速确定的纯函数？",
      answer: "真实纯函数能覆盖更多实际协作，而且不会带来速度和稳定性问题。Mock 它反而降低测试价值。"
    },
    {
      question: "模块 Mock 为什么要注意导入顺序？",
      answer: "模块加载后再替换可能已经太晚。通常应在顶层声明 Mock，让 Jest 在加载被测模块前完成替换。"
    }
  ]
};
