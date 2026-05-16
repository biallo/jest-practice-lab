import { whatIsJest } from "./what-is-jest";
import { firstTestFile } from "./first-test-file";
import { matchers } from "./matchers";
import { asyncTesting } from "./async-testing";
import { mocks } from "./mocks";
import { moduleMocking } from "./module-mocking";
import { setupTeardown } from "./setup-teardown";
import { reactTesting } from "./react-testing";
import { snapshots } from "./snapshots";
import { coverage } from "./coverage";
import { configuration } from "./configuration";
import { fakeTimers } from "./fake-timers";
import { watchMode } from "./watch-mode";
import { testingStrategy } from "./testing-strategy";
import { Lesson } from "./types";

export type { CodeExample, Lesson, ReviewItem } from "./types";

export const lessons: Lesson[] = [
  whatIsJest,
  firstTestFile,
  matchers,
  asyncTesting,
  mocks,
  moduleMocking,
  setupTeardown,
  reactTesting,
  snapshots,
  coverage,
  configuration,
  fakeTimers,
  watchMode,
  testingStrategy
];
