import { Lesson } from "./types";

export const fakeTimers: Lesson = {
  id: "fake-timers",
  title: "假定时器和时间控制",
  eyebrow: "Lesson 12",
  summary: "学会测试 debounce、throttle、重试、超时、轮询和依赖当前时间的逻辑。",
  sections: [
    {
      heading: "为什么需要假定时器",
      body: [
        "如果代码使用 `setTimeout`、`setInterval`、debounce、重试或轮询，真实等待会让测试变慢且不稳定。假定时器让你手动推进时间，不需要真的等几秒。",
        "时间控制的目标是让测试可预测。你决定时间前进多少，Jest 执行对应的定时任务，然后你断言结果。"
      ]
    },
    {
      heading: "useFakeTimers 和恢复",
      body: [
        "使用 `jest.useFakeTimers()` 后，Jest 会替换定时器 API。测试结束后应该调用 `jest.useRealTimers()` 恢复，避免影响其他测试。",
        "如果代码同时涉及 Promise microtask 和 timer macrotask，要注意推进定时器不一定会自动清空所有 Promise。必要时结合 `await` 或相关 async timer API。"
      ]
    },
    {
      heading: "推进时间的方式",
      body: [
        "`jest.advanceTimersByTime(ms)` 推进指定毫秒，适合 debounce 和超时。`jest.runOnlyPendingTimers()` 执行当前等待中的 timer，适合递归 timer。`jest.runAllTimers()` 会执行所有 timer，但如果代码不断创建新 timer，可能导致无限循环。",
        "不要用真实 `setTimeout` 等待 UI 或异步逻辑。真实等待不仅慢，还会在机器负载变化时产生偶发失败。"
      ]
    },
    {
      heading: "固定当前时间",
      body: [
        "测试依赖当前日期的逻辑时，可以用 `jest.setSystemTime()` 固定系统时间。这样快照、日期格式化、过期判断都不会随着当天日期变化而失败。",
        "固定时间属于测试准备的一部分。测试结束恢复真实 timer，保证其他测试不受影响。"
      ]
    }
  ],
  examples: [
    {
      title: "测试 debounce",
      language: "typescript",
      focusLines: [2, 9, 12],
      code: `beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("calls search after debounce delay", () => {
  const search = jest.fn();
  const debouncedSearch = debounce(search, 300);

  debouncedSearch("jest");
  expect(search).not.toHaveBeenCalled();

  jest.advanceTimersByTime(300);

  expect(search).toHaveBeenCalledWith("jest");
});`
    },
    {
      title: "固定系统时间",
      language: "typescript",
      focusLines: [2, 7],
      code: `test("marks expired coupons", () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2026-05-16T00:00:00Z"));

  expect(isExpired("2026-05-15")).toBe(true);
  expect(isExpired("2026-05-17")).toBe(false);

  jest.useRealTimers();
});`
    },
    {
      title: "测试超时失败",
      language: "typescript",
      focusLines: [5, 9],
      code: `test("rejects when request times out", async () => {
  jest.useFakeTimers();

  const promise = requestWithTimeout(() => new Promise(() => undefined), 1000);

  jest.advanceTimersByTime(1000);

  await expect(promise).rejects.toThrow("timeout");
  jest.useRealTimers();
});`
    }
  ],
  reviews: [
    {
      question: "为什么测试 debounce 不应该真实等待 300ms？",
      answer: "真实等待让测试变慢且受机器负载影响。假定时器可以立即推进时间并保持确定性。"
    },
    {
      question: "使用假定时器后为什么要恢复真实定时器？",
      answer: "假定时器会替换全局 timer API，不恢复会污染后续测试。"
    },
    {
      question: "`advanceTimersByTime` 和 `runAllTimers` 怎么选？",
      answer: "知道要推进多少时间时用 `advanceTimersByTime`；需要执行所有当前 timer 时才考虑 `runAllTimers`，但要小心递归 timer。"
    },
    {
      question: "测试依赖当前日期的逻辑时应该怎么做？",
      answer: "使用假定时器并通过 `setSystemTime` 固定当前时间，避免测试随日期变化而失败。"
    }
  ]
};
