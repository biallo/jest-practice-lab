import { Lesson } from "./types";

export const watchMode: Lesson = {
  id: "watch-mode",
  title: "CLI 与 Watch 模式",
  eyebrow: "Lesson 13",
  summary: "掌握常用命令、筛选方式、watch 模式和调试失败测试的工作流。",
  sections: [
    {
      heading: "测试反馈要足够快",
      body: [
        "写测试时不要每次都跑完整套测试。熟练使用 Jest 的 CLI 可以显著缩短反馈循环，让你在修改代码后的几秒内知道是否破坏了相关行为。",
        "开发中常用 watch 模式，提交前再跑完整测试和覆盖率。这样既不牺牲速度，也不放弃整体信心。"
      ]
    },
    {
      heading: "按文件和测试名筛选",
      body: [
        "可以用路径或文件名片段筛选测试文件，也可以用 `-t` 或 `--testNamePattern` 筛选测试名称。测试名称写得清楚，筛选时才好用。",
        "当某个测试失败时，先只跑这个测试，快速定位。修好后再扩大范围，运行相关文件，最后运行完整测试。"
      ]
    },
    {
      heading: "watch 模式的使用方式",
      body: [
        "`jest --watch` 会根据 Git 改动优先运行相关测试，适合日常开发。`jest --watchAll` 会监听并运行所有测试，适合没有 Git 上下文或想观察全量变化的场景。",
        "watch 模式里可以按提示选择只跑失败测试、按文件名筛选、按测试名筛选、更新快照。不要机械更新快照，先读 diff。"
      ]
    },
    {
      heading: "调试失败测试",
      body: [
        "失败时先读 Jest 输出：测试名称、期望值、实际值、diff、调用栈。不要第一时间改实现，先确认是测试期望错、输入错、Mock 错，还是实现真的错。",
        "如果失败和并发、共享状态或时间有关，可以用 `--runInBand` 单进程运行，排除并发干扰。"
      ]
    }
  ],
  examples: [
    {
      title: "常用 CLI 命令",
      language: "bash",
      focusLines: [1, 4, 7, 10],
      code: `npx jest

# 只运行文件名或路径匹配 pricing 的测试。
npx jest pricing

# 只运行名称匹配 "formats price" 的测试。
npx jest -t "formats price"

# 单进程运行，排查并发或共享状态问题。
npx jest --runInBand`
    },
    {
      title: "开发和提交前的工作流",
      language: "bash",
      focusLines: [1, 7],
      code: `npx jest --watch

# 修改完成后跑完整测试。
npx jest

# 需要评估测试保护时再生成覆盖率。
npx jest --coverage`
    }
  ],
  reviews: [
    {
      question: "为什么开发时不总是跑全量测试？",
      answer: "全量测试反馈慢，会打断开发节奏。开发中先跑相关测试，提交前再跑全量。"
    },
    {
      question: "`-t` 依赖什么才能好用？",
      answer: "依赖清晰的测试名称。名称描述行为，才能按行为筛选测试。"
    },
    {
      question: "什么时候使用 `--runInBand`？",
      answer: "排查并发、共享状态、资源竞争或 CI 偶发失败时，可以单进程运行帮助定位。"
    },
    {
      question: "更新快照前应该做什么？",
      answer: "先阅读快照 diff，确认变化是预期的，再更新。"
    }
  ]
};
