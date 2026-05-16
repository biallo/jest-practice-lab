import { Lesson } from "./types";

export const esmCommonjs: Lesson = {
  id: "esm-commonjs",
  title: "ESM / CommonJS 与 Jest",
  eyebrow: "Lesson 20",
  summary: "理解模块系统、transform、TypeScript 编译和 Jest 配置之间的关系，减少环境类报错。",
  sections: [
    {
      heading: "模块系统会影响测试运行",
      body: [
        "现代项目可能使用 ESM、CommonJS、TypeScript、Babel、SWC 或 ts-jest。Jest 运行测试前必须能理解你的源码和依赖模块格式。",
        "很多 Jest 报错不是测试写错，而是模块转换配置不匹配，例如 import/export 不能被当前环境解析，或 node_modules 里的 ESM 包没有被转换。"
      ]
    },
    {
      heading: "transform 的职责",
      body: [
        "transform 负责把测试和源码转换成 Jest 当前能执行的格式。TypeScript 项目常见方案包括 ts-jest、Babel、SWC 或 esbuild。",
        "选择方案时要看项目构建链路。应用用 Babel 或 SWC，测试也尽量贴近；需要 TypeScript 类型级诊断时，ts-jest 更直接，但可能更慢。"
      ]
    },
    {
      heading: "不要混着猜配置",
      body: [
        "遇到 ESM/CJS 问题时，先确认 package.json 的 `type`、tsconfig 的 `module`、Jest 配置的 transform、以及被报错依赖来自源码还是 node_modules。",
        "把配置问题缩小到最小复现，比在网上复制十个配置选项更可靠。每个选项都应该知道它解决哪条报错。"
      ]
    }
  ],
  examples: [
    {
      title: "ts-jest 的 CommonJS 风格配置",
      language: "typescript",
      focusLines: [4, 5],
      code: `import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node"
};

export default config;`
    },
    {
      title: "路径别名和 CSS 映射",
      language: "typescript",
      focusLines: [4, 5],
      code: `const config = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\\\.(css|less|scss)$": "identity-obj-proxy"
  }
};

export default config;`
    }
  ],
  reviews: [
    {
      question: "transform 解决什么问题？",
      answer: "把 TypeScript、JSX 或当前运行环境不支持的模块语法转换成 Jest 能执行的代码。"
    },
    {
      question: "遇到 ESM 报错时先检查什么？",
      answer: "检查 package.json 的 type、tsconfig module、Jest transform、报错文件来自源码还是依赖。"
    },
    {
      question: "为什么不要盲目复制配置？",
      answer: "不同项目模块系统和构建链路不同，复制配置可能掩盖问题或引入新的不一致。"
    }
  ]
};
