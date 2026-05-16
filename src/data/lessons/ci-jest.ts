import { Lesson } from "./types";

export const ciJest: Lesson = {
  id: "ci-jest",
  title: "CI 中运行 Jest",
  eyebrow: "Lesson 23",
  summary: "在 GitHub Actions 等 CI 环境中稳定运行 Jest：缓存、并发、覆盖率、失败诊断和环境差异。",
  sections: [
    {
      heading: "CI 关注稳定性",
      body: [
        "本地测试通过不代表 CI 一定通过。CI 的 Node 版本、操作系统、时区、CPU 资源、环境变量和文件系统都可能不同。",
        "CI 中运行 Jest 的目标是稳定、可复现、输出足够诊断信息。不要让测试依赖本机全局配置或未声明的环境变量。"
      ]
    },
    {
      heading: "常用 CI 参数",
      body: [
        "`--ci` 会让 Jest 使用 CI 模式，避免交互行为。`--runInBand` 可以在排查资源竞争时使用，但平时会变慢。`--coverage` 可用于生成覆盖率报告。",
        "如果测试依赖时区或当前时间，建议在 CI 中固定 `TZ`，并在测试里使用假定时器固定日期。"
      ]
    },
    {
      heading: "缓存和诊断",
      body: [
        "依赖缓存能加快 CI，但不要缓存会掩盖问题的构建产物。npm 项目通常缓存 npm cache，然后用 `npm ci` 保证 lockfile 一致。",
        "失败时需要保留足够日志。覆盖率、测试报告和失败截图都可以作为 artifact 上传，方便回看。"
      ]
    }
  ],
  examples: [
    {
      title: "GitHub Actions 中运行 Jest",
      language: "bash",
      focusLines: [6, 10],
      code: `name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test -- --ci`
    },
    {
      title: "CI 中生成覆盖率",
      language: "bash",
      focusLines: [1, 4],
      code: `npm test -- --ci --coverage

# 排查并发相关失败时临时使用。
npm test -- --ci --runInBand`
    }
  ],
  reviews: [
    {
      question: "为什么 CI 应该使用 `npm ci`？",
      answer: "`npm ci` 会严格按 lockfile 安装依赖，保证 CI 和团队成员环境更一致。"
    },
    {
      question: "`--runInBand` 什么时候用？",
      answer: "排查并发、资源竞争、共享状态导致的 CI 偶发失败时临时使用。"
    },
    {
      question: "CI 和本地差异常见来源有哪些？",
      answer: "Node 版本、操作系统、时区、环境变量、CPU 资源、文件系统大小写和未提交文件。"
    }
  ]
};
