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
import { parameterizedTesting } from "./parameterized-testing";
import { edgeCaseTesting } from "./edge-case-testing";
import { testDoubles } from "./test-doubles";
import { mswIntegrationTesting } from "./msw-integration-testing";
import { moduleCacheIsolation } from "./module-cache-isolation";
import { esmCommonjs } from "./esm-commonjs";
import { customMatchers } from "./custom-matchers";
import { testMaintainability } from "./test-maintainability";
import { ciJest } from "./ci-jest";
import { realProjectWorkflow } from "./real-project-workflow";
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
  testingStrategy,
  parameterizedTesting,
  edgeCaseTesting,
  testDoubles,
  mswIntegrationTesting,
  moduleCacheIsolation,
  esmCommonjs,
  customMatchers,
  testMaintainability,
  ciJest,
  realProjectWorkflow
];
