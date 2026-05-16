import { Lesson } from "./types";

export const watchMode: Lesson = {
  id: "watch-mode",
  title: "Watch 模式",
  eyebrow: "Lesson 11",
  summary: "用 watch 模式缩短反馈循环，只运行和当前改动相关的测试。",
  sections: [
    {
      heading: "让测试跟着你工作",
      body: [
        "Watch 模式会监听文件变化，并优先运行相关测试。写代码时持续开着它，可以更早发现回归。",
        "在大项目里，配合筛选文件名或测试名能显著减少等待时间。"
      ]
    }
  ],
  examples: [
    {
      title: "筛选测试",
      language: "bash",
      focusLines: [1, 4],
      code: `npx jest --watch

# 重点：只运行名称匹配 pricing 的测试。
npx jest pricing --watch`
    }
  ],
  reviews: [
    {
      question: "Watch 模式最主要的价值是什么？",
      answer: "缩短从改代码到得到测试反馈的时间。"
    }
  ]
};
