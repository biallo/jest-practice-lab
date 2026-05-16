import { Lesson } from "./types";

export const moduleMocking: Lesson = {
  id: "module-mocking",
  title: "Mock 模块",
  eyebrow: "Lesson 06",
  summary: "了解 `jest.mock` 如何隔离模块边界，并避免测试真实网络或 SDK。",
  sections: [
    {
      heading: "模块边界",
      body: [
        "当一个模块依赖另一个模块时，可以通过 Mock 外部模块来保持测试可控。",
        "模块 Mock 适合依赖复杂、慢、不可预测或者需要认证环境的场景。"
      ]
    }
  ],
  examples: [
    {
      title: "替换 API 模块",
      language: "typescript",
      focusLines: [3, 7, 10],
      code: `import { getUser } from "./api";
import { loadUserName } from "./loadUserName";

jest.mock("./api");

test("loads user name", async () => {
  // 重点：把外部依赖变成确定返回。
  jest.mocked(getUser).mockResolvedValue({ name: "Ada" });

  await expect(loadUserName()).resolves.toBe("Ada");
});`
    }
  ],
  reviews: [
    {
      question: "模块 Mock 适合替换什么？",
      answer: "网络请求、数据库客户端、外部 SDK、文件系统、时间服务等测试中不想真实触发的依赖。"
    },
    {
      question: "过多模块 Mock 的信号是什么？",
      answer: "测试只验证调用链，没有验证用户可观察的结果，说明可能绑定了过多实现细节。"
    }
  ]
};
