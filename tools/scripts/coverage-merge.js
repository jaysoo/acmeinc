const { readJsonSync } = require('fs-extra');
const { dirname, join, relative } = require('path');
const { sync } = require('glob');
const { createCoverageMap } = require('istanbul-lib-coverage');
const { create: createReport } = require('istanbul-reports');
const { createContext } = require('istanbul-lib-report');
const { createProjectGraphAsync } = require('./util');

async function main() {
  const reportFiles = await getReportFiles();
  const reporters = ['json'];
  const coverageMap = createCoverageMap({});

  reportFiles.forEach((file) => {
    coverageMap.merge(readJsonSync(file));
  });

  const context = createContext({
    dir: join(__dirname, '../../coverage'),
    defaultSummarizer: 'nested',
    coverageMap,
  });

  reporters.forEach((reporter) => {
    const report = createReport(reporter, {
      skipEmpty: true,
      skipFull: true,
    });
    report.execute(context);
  });
}

async function getReportFiles() {
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
    return (
      files
        // Filter out the merged report.
        .filter((x) => !x.endsWith('coverage/coverage-final.json'))
        // Filter out stale reports (moved or removed).
        .filter((x) => {
          const dir = dirname(relative(root, x));
          return expectedCoverageOutputs.has(dir);
        })
    );
  } else {
    throw new Error('No coverage files found!');
  }
}

main();
