import { Lesson } from "./types";

export const testDoubles: Lesson = {
  id: "test-doubles",
  title: "测试替身策略",
  eyebrow: "Lesson 17",
  summary: "区分 dummy、stub、spy、mock、fake，选择合适替身，避免把测试写脆。",
  sections: [
    {
      heading: "不是所有替身都叫 Mock",
      body: [
        "测试替身是替代真实依赖的对象或函数。很多人把所有替身都叫 mock，但在设计测试时，区分它们很有价值。",
        "Dummy 只是占位；Stub 提供固定返回；Spy 记录调用；Mock 预设期望并验证交互；Fake 是可工作的简化实现，例如内存数据库。"
      ]
    },
    {
      heading: "按测试目标选择替身",
      body: [
        "如果你只需要依赖返回固定结果，用 Stub。若要确认回调被调用，用 Spy。若真实依赖慢或有副作用，但你仍希望保留较真实行为，用 Fake。",
        "过度使用 Mock 会让测试绑定实现细节。优先测试结果，只有当交互本身就是行为时，再验证调用。"
      ]
    },
    {
      heading: "Fake 常常比 Mock 更稳定",
      body: [
        "例如仓储接口可以用内存 Fake 实现。它比每个测试都手写一堆 Mock 返回值更接近真实协作，也更容易覆盖多步流程。",
        "Fake 的成本是需要维护一个简化实现。只有当这个依赖在很多测试中反复出现时，Fake 才值得写。"
      ]
    }
  ],
  examples: [
    {
      title: "Stub 和 Spy 的区别",
      language: "typescript",
      focusLines: [4, 9],
      code: `test("uses a stubbed feature flag", () => {
  const flags = {
    isEnabled: () => true
  };

  expect(getCheckoutLabel(flags)).toBe("立即结算");
});

test("spies on a callback", () => {
  const onComplete = jest.fn();

  completeLesson("what-is-jest", onComplete);

  expect(onComplete).toHaveBeenCalledWith("what-is-jest");
});`
    },
    {
      title: "内存 Fake 仓储",
      language: "typescript",
      focusLines: [1, 14],
      code: `class InMemoryLessonRepository {
  private completed = new Set<string>();

  markCompleted(id: string) {
    this.completed.add(id);
  }

  isCompleted(id: string) {
    return this.completed.has(id);
  }
}

test("marks a lesson as completed", () => {
  const repository = new InMemoryLessonRepository();

  markLessonCompleted(repository, "matchers");

  expect(repository.isCompleted("matchers")).toBe(true);
});`
    }
  ],
  reviews: [
    {
      question: "Stub 和 Spy 的差异是什么？",
      answer: "Stub 主要提供固定返回值；Spy 主要记录调用过程，方便验证交互。"
    },
    {
      question: "什么时候 Fake 比 Mock 更好？",
      answer: "当很多测试需要一个有状态但可控的依赖时，Fake 比大量零散 Mock 更稳定、更接近真实协作。"
    },
    {
      question: "过度 Mock 的主要风险是什么？",
      answer: "测试会绑定实现细节，重构时即使行为没变也会失败。"
    }
  ]
};
