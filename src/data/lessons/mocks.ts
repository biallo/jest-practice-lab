import { Lesson } from "./types";

export const mocks: Lesson = {
  id: "mocks",
  title: "Mock 函数",
  eyebrow: "Lesson 05",
  summary: "掌握 `jest.fn()` 的调用记录、返回值控制、实现替换，以及如何避免过度 Mock。",
  sections: [
    {
      heading: "Mock 函数是什么",
      body: [
        "Mock 函数是一个可观察的替身。它可以像普通函数一样被调用，同时记录调用次数、调用参数、返回结果和抛出的错误。你可以用它验证“某个协作者是否被正确调用”。",
        "Mock 函数适合测试回调、事件处理、埋点、日志、通知和外部依赖。它不适合替代所有真实逻辑。只要真实依赖足够快、确定、无副作用，优先使用真实实现。"
      ]
    },
    {
      heading: "调用记录比内部状态更稳定",
      body: [
        "当被测函数通过回调或依赖对象完成工作时，调用记录就是可观察结果。例如保存成功后调用 `onSuccess(id)`，你不需要读取内部变量，只要断言回调收到了正确参数。",
        "常用断言包括 `toHaveBeenCalled`、`toHaveBeenCalledTimes`、`toHaveBeenCalledWith`、`toHaveBeenNthCalledWith`。如果测试只关心最后一次调用，可以使用 `toHaveBeenLastCalledWith`。"
      ]
    },
    {
      heading: "控制返回值和实现",
      body: [
        "`mockReturnValue` 用于同步返回值，`mockResolvedValue` 用于成功 Promise，`mockRejectedValue` 用于失败 Promise。`mockImplementation` 可以提供完整替代实现，适合根据参数返回不同结果。",
        "一次性行为用 `mockReturnValueOnce` 或 `mockResolvedValueOnce`。它适合测试重试、分页、多次调用状态变化等场景。"
      ]
    },
    {
      heading: "清理 Mock",
      body: [
        "Mock 会保存调用记录。如果多个测试复用同一个 Mock，必须在 `beforeEach` 或 `afterEach` 中清理，否则前一个测试的调用会污染后一个测试。",
        "`jest.clearAllMocks()` 清调用记录，保留实现；`jest.resetAllMocks()` 同时重置实现；`jest.restoreAllMocks()` 恢复 `jest.spyOn` 替换的原始方法。三者含义不同，不能混用。"
      ]
    }
  ],
  examples: [
    {
      title: "验证回调调用次数和参数",
      language: "typescript",
      focusLines: [6, 10, 11],
      code: `function saveTask(title: string, onSuccess: (id: string) => void) {
  const id = title.toLowerCase().replaceAll(" ", "-");
  onSuccess(id);
}

test("calls success callback with generated id", () => {
  const onSuccess = jest.fn();

  saveTask("Write Tests", onSuccess);

  expect(onSuccess).toHaveBeenCalledTimes(1);
  expect(onSuccess).toHaveBeenCalledWith("write-tests");
});`
    },
    {
      title: "控制依赖返回值",
      language: "typescript",
      focusLines: [8, 12],
      code: `type Flags = { isEnabled: (name: string) => boolean };

function getCheckoutLabel(flags: Flags) {
  return flags.isEnabled("new-checkout") ? "立即结算" : "去结算";
}

test("uses the new checkout label when feature flag is enabled", () => {
  const flags = { isEnabled: jest.fn().mockReturnValue(true) };

  expect(getCheckoutLabel(flags)).toBe("立即结算");
  expect(flags.isEnabled).toHaveBeenCalledWith("new-checkout");
});`
    },
    {
      title: "一次性 Mock 行为",
      language: "typescript",
      focusLines: [4, 5, 11],
      code: `test("retries after one failed request", async () => {
  const request = jest
    .fn()
    .mockRejectedValueOnce(new Error("network"))
    .mockResolvedValueOnce({ ok: true });

  await expect(fetchWithRetry(request)).resolves.toEqual({ ok: true });

  // 重点：验证重试发生了，但不要断言内部循环变量。
  expect(request).toHaveBeenCalledTimes(2);
});`
    }
  ],
  reviews: [
    {
      question: "Mock 函数最适合验证什么？",
      answer: "验证协作者如何被调用，包括调用次数、参数、顺序和返回行为。"
    },
    {
      question: "`mockResolvedValue` 和 `mockReturnValue` 有什么区别？",
      answer: "`mockReturnValue` 返回普通值；`mockResolvedValue` 返回 resolved Promise，适合异步依赖。"
    },
    {
      question: "`clearAllMocks`、`resetAllMocks`、`restoreAllMocks` 的区别是什么？",
      answer: "`clear` 清调用记录，`reset` 清记录并重置实现，`restore` 恢复 spy 替换过的原始方法。"
    },
    {
      question: "过度 Mock 的风险是什么？",
      answer: "测试会绑定内部协作方式，而不是验证真实行为。重构实现时，即使功能没坏，测试也会大量失败。"
    }
  ]
};
