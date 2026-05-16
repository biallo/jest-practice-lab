import { Lesson } from "./types";

export const configuration: Lesson = {
  id: "configuration",
  title: "Jest 配置和测试环境",
  eyebrow: "Lesson 11",
  summary: "掌握 testEnvironment、setupFilesAfterEnv、moduleNameMapper、transform 和 TypeScript 项目常见配置。",
  sections: [
    {
      heading: "配置解决项目差异",
      body: [
        "Jest 能开箱即用，但真实项目通常需要配置：Node 还是浏览器环境、TypeScript 如何转换、路径别名如何解析、测试前要加载哪些扩展断言、哪些文件要收集覆盖率。",
        "配置的目标不是堆选项，而是让测试环境尽量接近被测代码的运行环境，同时保持测试快速、确定。"
      ]
    },
    {
      heading: "testEnvironment 怎么选",
      body: [
        "`node` 适合纯函数、服务端工具、CLI、数据处理。`jsdom` 适合 React 组件和依赖 DOM API 的代码。",
        "不要为了方便总是用 `jsdom`。DOM 环境更重，也可能隐藏服务端代码不该访问浏览器 API 的问题。按测试对象选择环境。"
      ]
    },
    {
      heading: "setupFilesAfterEnv 的作用",
      body: [
        "`setupFilesAfterEnv` 会在测试框架安装后、测试文件运行前执行，适合加载 `@testing-library/jest-dom`、注册全局清理逻辑或扩展 matcher。",
        "不要在 setup 文件里塞大量业务 Mock。全局 Mock 会影响所有测试，容易制造隐式依赖。业务相关 Mock 应该尽量写在具体测试中。"
      ]
    },
    {
      heading: "路径别名和静态资源",
      body: [
        "Webpack 或 TypeScript 里的路径别名，Jest 不会天然知道。需要用 `moduleNameMapper` 把别名映射到真实路径。",
        "CSS、图片、字体等静态资源在 Jest 中通常不需要真实加载，可以映射到 stub。这样测试关注组件行为，而不是构建工具如何处理资源。"
      ]
    }
  ],
  examples: [
    {
      title: "一个 React + TypeScript 常用配置",
      language: "typescript",
      focusLines: [4, 5, 7, 9],
      code: `import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\\\.(css|less|scss)$": "identity-obj-proxy"
  },
  clearMocks: true
};

export default config;`
    },
    {
      title: "加载 jest-dom 扩展断言",
      language: "typescript",
      focusLines: [1, 4],
      code: `import "@testing-library/jest-dom";

afterEach(() => {
  jest.restoreAllMocks();
});`
    }
  ],
  reviews: [
    {
      question: "`node` 和 `jsdom` 环境怎么选？",
      answer: "纯逻辑和服务端代码用 node；React 组件或依赖 DOM API 的代码用 jsdom。"
    },
    {
      question: "`setupFilesAfterEnv` 适合放什么？",
      answer: "适合放测试框架扩展、通用清理逻辑和全局 matcher，不适合放大量业务 Mock。"
    },
    {
      question: "为什么路径别名需要 `moduleNameMapper`？",
      answer: "Jest 不会自动读取所有构建工具解析规则，需要显式告诉它别名对应的真实路径。"
    },
    {
      question: "为什么静态资源通常映射到 stub？",
      answer: "单元和组件测试通常不关心资源打包结果，映射 stub 可以减少环境复杂度。"
    }
  ]
};
