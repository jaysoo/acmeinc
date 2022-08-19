const { readJsonSync } = require('fs-extra');
const { join } = require('path');
const { sync } = require('glob');
const { createCoverageMap } = require('istanbul-lib-coverage');
const { create: createReport } = require('istanbul-reports');
const { createContext, summarizers } = require('istanbul-lib-report');

if (require.main === module) {
  main();
}

function main() {
  const reportFiles = getReportFiles();
  console.log('ReportFiles', reportFiles);
  const reporters = ['json'];
  const coverageMap = createCoverageMap({});

  reportFiles.forEach((file) => {
    const content = readJsonSync(file);
    const coverageData = unnestHtmlCoverageData(content);
    coverageMap.merge(coverageData);
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

function getReportFiles() {
  const files = sync(join(__dirname, '../../coverage/**/coverage*.json'));
  if (files.length > 0) {
    // Filter out the merged report.
    return files.filter((x) => !x.endsWith('coverage/coverage-final.json'));
  } else {
    throw new Error('No coverage files found!');
  }
}

function unnestHtmlCoverageData(json) {
  return Object.keys(json).reduce((acc, k) => {
    const v = json[k];
    if (typeof v.data !== 'undefined') {
      acc[k] = v.data;
    } else {
      acc[k] = v;
    }
    return acc;
  }, {});
}
