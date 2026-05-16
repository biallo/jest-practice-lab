import { Lesson } from "./types";

export const setupTeardown: Lesson = {
  id: "setup-teardown",
  title: "准备和清理",
  eyebrow: "Lesson 07",
  summary: "学会使用生命周期函数隔离测试状态，避免顺序依赖、残留 Mock 和环境污染。",
  sections: [
    {
      heading: "测试之间必须独立",
      body: [
        "每个测试都应该能单独运行，也应该能和其他测试任意顺序运行。如果一个测试依赖另一个测试先执行，或者被前一个测试留下的状态影响，那么它就是不可靠的。",
        "Jest 默认会按文件运行测试，但你不应该依赖这种顺序。真正稳定的测试会在每个测试开始前准备干净状态，并在结束后清理副作用。"
      ]
    },
    {
      heading: "beforeEach 和 beforeAll",
      body: [
        "`beforeEach` 在每个测试前运行，适合重建会被修改的状态，例如购物车、Mock 调用记录、DOM 容器。`beforeAll` 只在当前 describe 组开始前运行一次，适合昂贵且只读的准备工作。",
        "如果数据会被测试修改，优先用 `beforeEach`。很多偶发失败都来自在 `beforeAll` 中创建了共享可变对象，然后不同测试互相影响。"
      ]
    },
    {
      heading: "afterEach 和资源释放",
      body: [
        "`afterEach` 适合恢复 Mock、清理 DOM、关闭 fake timers、清除临时订阅。它的目标是让下一个测试看起来像在全新环境里运行。",
        "如果你使用 `jest.spyOn`、假定时器、全局对象替换或手动挂载 DOM，一定要在清理阶段恢复。否则问题可能不在当前测试暴露，而是在后续完全不相关的测试中爆炸。"
      ]
    },
    {
      heading: "减少共享状态",
      body: [
        "比起在外层声明一个变量再反复修改，更推荐使用工厂函数创建测试数据。工厂函数让每个测试得到独立对象，也能让测试输入更贴近业务语言。",
        "当 setup 变得很长时，不要把所有准备逻辑都塞进 `beforeEach`。把通用数据构造提取成函数，测试里仍然保留关键输入，这样读者不用跳来跳去才能理解场景。"
      ]
    }
  ],
  examples: [
    {
      title: "每个测试重建可变状态",
      language: "typescript",
      focusLines: [3, 8, 13],
      code: `let cart: string[];

beforeEach(() => {
  // 每个测试拿到全新的数组，避免顺序依赖。
  cart = [];
});

test("adds an item", () => {
  cart.push("book");
  expect(cart).toEqual(["book"]);
});

test("starts empty for every test", () => {
  expect(cart).toEqual([]);
});`
    },
    {
      title: "恢复 spy 和 Mock",
      language: "typescript",
      focusLines: [2, 7],
      code: `afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

test("logs validation failures", () => {
  const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);

  validateEmail("bad-email");

  expect(errorSpy).toHaveBeenCalledWith("Invalid email");
});`
    },
    {
      title: "用工厂函数替代共享对象",
      language: "typescript",
      focusLines: [1, 8],
      code: `function createUser(overrides: Partial<User> = {}): User {
  return {
    id: "u1",
    role: "member",
    active: true,
    ...overrides
  };
}

test("allows active admins to publish", () => {
  const user = createUser({ role: "admin" });

  expect(canPublish(user)).toBe(true);
});`
    }
  ],
  reviews: [
    {
      question: "为什么测试之间不应该共享可变状态？",
      answer: "共享可变状态会让测试依赖运行顺序，导致单独运行通过、整体运行失败，或在 CI 中偶发失败。"
    },
    {
      question: "`beforeEach` 和 `beforeAll` 怎么选？",
      answer: "可变状态用 `beforeEach`；昂贵且只读的准备工作可以用 `beforeAll`。"
    },
    {
      question: "使用 `jest.spyOn` 后为什么要恢复？",
      answer: "spy 会替换原始方法。如果不恢复，后续测试会继续使用被替换的方法，污染测试环境。"
    },
    {
      question: "测试数据工厂的价值是什么？",
      answer: "它让每个测试获得独立、可读、可局部覆盖的数据，减少共享状态和重复样板。"
    }
  ]
};
