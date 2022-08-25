const { dirname, relative } = require('path');

async function createProjectGraphAsync() {
  try {
    // Nx 14+
    const { createProjectGraphAsync } = require('@nrwl/devkit');
    return createProjectGraphAsync();
  } catch {
    // Nx 13
    const {
      createProjectGraphAsync,
    } = require('@nrwl/workspace/src/core/project-graph/project-graph');
    return createProjectGraphAsync();
  }
}

module.exports.createProjectGraphAsync = createProjectGraphAsync;
