const chalk = require('chalk');
const { rmSync } = require('fs-extra');
const { dirname, join, relative } = require('path');
const { sync } = require('glob');
const { createProjectGraphAsync } = require('./util');

async function main() {
  const graph = await createProjectGraphAsync();

  const expectedCoverageOutputs = new Set();
  Object.values(graph.nodes).forEach(({ data }) => {
    if (data.targets && data.targets.test && data.targets.test.outputs) {
      expectedCoverageOutputs.add(data.targets.test.outputs[0]);
    }
  });

  const root = join(__dirname, '../..');
  const files = sync(join(root, 'coverage/**/coverage*.json'));
  if (files.length > 0) {
    return files.forEach((x) => {
      // Ignore the merged report.
      if (x.endsWith('coverage/coverage-final.json')) return;

      const dir = dirname(relative(root, x));
      if (!expectedCoverageOutputs.has(dir)) {
        console.log(
          `Removing stale coverage ${chalk.bold(
            dir
          )}. Reason: Project removed from workspace.`
        );
        rmSync(join(root, dir), { recursive: true });
      }
    });
  } else {
    throw new Error('No coverage files found!');
  }
}

main();
