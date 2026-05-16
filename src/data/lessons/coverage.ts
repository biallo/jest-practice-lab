import { Lesson } from "./types";

export const coverage: Lesson = {
  id: "coverage",
  title: "覆盖率",
  eyebrow: "Lesson 10",
  summary: "看懂 statements、branches、functions、lines，并把覆盖率用于发现风险，而不是追求数字游戏。",
  sections: [
    {
      heading: "覆盖率说明代码被执行过",
      body: [
        "覆盖率报告告诉你测试运行时触达了哪些代码。它能发现完全没被测试跑到的文件、函数和分支，但不能证明断言有效。",
        "一个测试执行了某行代码，却没有检查关键结果，这行仍然会算覆盖。反过来，一个覆盖率不高的项目也可能在关键业务路径上有不错的保护。"
      ]
    },
    {
      heading: "四个指标怎么读",
      body: [
        "Statements 表示语句覆盖，Lines 表示行覆盖，Functions 表示函数覆盖，Branches 表示分支覆盖。业务代码里最值得关注的通常是 Branches，因为 bug 经常藏在 if、switch、三元表达式和默认分支里。",
        "如果行覆盖率很高但分支覆盖率很低，说明测试只跑了主路径，边界和异常路径可能没有覆盖。"
      ]
    },
    {
      heading: "合理设置阈值",
      body: [
        "覆盖率阈值适合防止测试保护逐渐退化，但不要一开始就给遗留项目设置不现实的高阈值。更实用的做法是先给核心目录设置较高阈值，再逐步扩大范围。",
        "对工具函数、业务规则、权限判断这类高风险代码，可以设置更严格阈值；对类型声明、常量配置、简单入口文件，可以排除或降低要求。"
      ]
    },
    {
      heading: "用覆盖率指导补测",
      body: [
        "看覆盖率报告时不要只看总数。打开 HTML 报告，找红色未覆盖分支，判断它是否代表真实业务风险。",
        "补测试时优先补“未覆盖且高风险”的分支，而不是为了提高数字去覆盖无意义代码。覆盖率是地图，不是目的地。"
      ]
    }
  ],
  examples: [
    {
      title: "生成覆盖率报告",
      language: "bash",
      focusLines: [1, 4],
      code: `npx jest --coverage

# 打开 HTML 报告后重点看红色分支，而不是只看总百分比。
open coverage/lcov-report/index.html`
    },
    {
      title: "配置覆盖率阈值",
      language: "typescript",
      focusLines: [4, 8],
      code: `import type { Config } from "jest";

const config: Config = {
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: {
      lines: 80,
      branches: 75
    }
  }
};

export default config;`
    },
    {
      title: "分支覆盖暴露遗漏",
      language: "typescript",
      focusLines: [2, 7, 11],
      code: `function getDiscount(role: "guest" | "member" | "vip") {
  if (role === "vip") return 0.2;
  if (role === "member") return 0.1;
  return 0;
}

test("returns discount for vip", () => {
  expect(getDiscount("vip")).toBe(0.2);
});

// 还需要 member 和 guest，否则分支覆盖是不完整的。`
    }
  ],
  reviews: [
    {
      question: "覆盖率能证明代码没有 bug 吗？",
      answer: "不能。覆盖率只说明代码被执行过，不说明断言是否验证了正确行为。"
    },
    {
      question: "为什么分支覆盖率通常比行覆盖率更值得关注？",
      answer: "业务差异常在条件分支里。行被执行不代表所有条件路径都被验证。"
    },
    {
      question: "覆盖率阈值应该如何设置？",
      answer: "按项目阶段和代码风险设置。新核心代码可以严格，遗留项目应逐步提高，避免一开始阻塞开发。"
    },
    {
      question: "看到未覆盖代码后应该立刻补测试吗？",
      answer: "不一定。先判断它是否是高风险行为，再决定是否补测、排除或重构。"
    }
  ]
};
