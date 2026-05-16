import { Lesson } from "./types";

export const moduleCacheIsolation: Lesson = {
  id: "module-cache-isolation",
  title: "模块缓存与隔离",
  eyebrow: "Lesson 19",
  summary: "理解 Jest 的模块缓存，学会测试环境变量、单例模块和按导入时机读取配置的代码。",
  sections: [
    {
      heading: "模块会被缓存",
      body: [
        "Node 和 Jest 都会缓存已加载模块。一个模块第一次 import 后，后续 import 通常拿到同一个实例。这对性能有利，但会影响测试隔离。",
        "如果模块在顶层读取环境变量、创建单例、初始化客户端，测试中修改环境变量后再 import，可能拿到旧缓存。"
      ]
    },
    {
      heading: "resetModules 和 isolateModules",
      body: [
        "`jest.resetModules()` 会清空模块注册表，让后续 require 重新加载模块。它适合测试“模块加载时读取配置”的代码。",
        "`jest.isolateModules()` 会在隔离的模块环境中执行导入，适合更精确地隔离某次加载，不影响其他测试太多。"
      ]
    },
    {
      heading: "更好的设计是延迟读取",
      body: [
        "如果代码允许，把环境变量读取放进函数里，而不是模块顶层。这样测试不用操心模块缓存，也让运行时配置更明确。",
        "模块隔离是必要工具，但不要用它掩盖糟糕设计。能通过依赖注入或函数参数表达配置时，通常更简单。"
      ]
    }
  ],
  examples: [
    {
      title: "测试顶层读取环境变量的模块",
      language: "typescript",
      focusLines: [3, 7, 10],
      code: `afterEach(() => {
  delete process.env.API_URL;
  jest.resetModules();
});

test("reads API_URL at module load time", () => {
  process.env.API_URL = "https://api.example.com";
  jest.resetModules();

  const { apiUrl } = require("./config");

  expect(apiUrl).toBe("https://api.example.com");
});`
    },
    {
      title: "用 isolateModules 隔离导入",
      language: "typescript",
      focusLines: [2, 5],
      code: `test("loads config in an isolated module registry", () => {
  process.env.FEATURE_FLAG = "on";

  jest.isolateModules(() => {
    const { isFeatureEnabled } = require("./featureConfig");
    expect(isFeatureEnabled()).toBe(true);
  });
});`
    }
  ],
  reviews: [
    {
      question: "为什么修改环境变量后模块结果可能没变？",
      answer: "因为模块可能已经被缓存，顶层读取环境变量的代码不会重新执行。"
    },
    {
      question: "`resetModules` 的作用是什么？",
      answer: "清空模块注册表，让后续导入重新加载模块。"
    },
    {
      question: "什么时候设计上比模块隔离更好？",
      answer: "把配置作为参数传入或在函数调用时读取，通常比依赖模块顶层初始化更容易测试。"
    }
  ]
};
