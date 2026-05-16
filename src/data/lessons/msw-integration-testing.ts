import { Lesson } from "./types";

export const mswIntegrationTesting: Lesson = {
  id: "msw-integration-testing",
  title: "MSW 前端集成测试",
  eyebrow: "Lesson 18",
  summary: "用 Mock Service Worker 在网络边界拦截请求，让组件测试更接近真实用户流程。",
  sections: [
    {
      heading: "为什么需要 MSW",
      body: [
        "直接 Mock API 模块很快，但会把测试绑定到代码如何发请求。如果组件改用另一个请求封装，测试可能需要跟着改。",
        "MSW 在网络层拦截请求。组件仍然真实调用 fetch 或请求库，测试只控制服务端响应。这样更接近用户和浏览器看到的行为。"
      ]
    },
    {
      heading: "适用场景",
      body: [
        "MSW 适合组件集成测试：加载列表、提交表单、处理 404、展示服务端错误、重试请求。它让你验证“页面如何响应网络结果”，而不是验证某个 API 函数是否被调用。",
        "单纯的业务函数仍然不需要 MSW。能用纯函数单测解决的，不要拉进网络层。"
      ]
    },
    {
      heading: "按场景覆盖响应",
      body: [
        "默认 handler 可以放在测试 setup 中，具体测试再用 `server.use` 覆盖当前场景。这样既有全局默认行为，也能让单个测试清楚表达它关心的响应。",
        "错误响应要像成功响应一样测试。真实产品里的很多问题都来自 loading、empty、error 这些非 happy path。"
      ]
    }
  ],
  examples: [
    {
      title: "测试加载成功",
      language: "typescript",
      focusLines: [4, 8, 10],
      code: `import { http, HttpResponse } from "msw";
import { server } from "../test/server";

test("renders lessons from the API", async () => {
  server.use(
    http.get("/api/lessons", () => HttpResponse.json([{ id: "1", title: "什么是 Jest" }]))
  );

  render(<LessonPage />);

  expect(await screen.findByRole("link", { name: "什么是 Jest" })).toBeInTheDocument();
});`
    },
    {
      title: "测试服务端错误",
      language: "typescript",
      focusLines: [5, 10],
      code: `test("shows an error message when loading fails", async () => {
  server.use(
    http.get("/api/lessons", () => new HttpResponse(null, { status: 500 }))
  );

  render(<LessonPage />);

  expect(await screen.findByText("课程加载失败")).toBeInTheDocument();
  expect(screen.queryByText("加载中")).not.toBeInTheDocument();
});`
    }
  ],
  reviews: [
    {
      question: "MSW 相比 Mock API 模块的优势是什么？",
      answer: "MSW 在网络层拦截请求，组件仍然真实发请求，因此测试更接近真实用户流程，也更少绑定内部请求封装。"
    },
    {
      question: "什么时候不需要 MSW？",
      answer: "测试纯业务函数、格式化函数或无需网络边界的逻辑时，不需要 MSW。"
    },
    {
      question: "为什么错误响应也要测试？",
      answer: "错误、空状态、loading 是用户真实会遇到的路径，也是前端最容易遗漏的行为。"
    }
  ]
};
