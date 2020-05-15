// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/cli
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';
const BaseGenerator = require('../../lib/base-generator');
const deployment = require('./deployment');
const service = require('./service');
const g = require('../../lib/globalize');
const fs = require('fs');
const Project = require('@lerna/project');

module.exports = class KubernetesGenerator extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);
    this.isMonorepo = false;
    this.projectRoot = process.cwd();
    this.packages = [];
    this.isLoopBackExample = false;
  }

  _setupGenerator() {
    this.option('namespace', {
      type: String,
      required: false,
      description: g.f('k8s namespace'),
    });
  }

  async checkMonoRepo() {
    this.isMonorepo = await fs.exists(
      path.join(this.projectRoot, 'lerna.json'),
    );
    if (this.isMonorepo) {
      const project = new Project(this.projectRoot);
      debug('Lerna monorepo', project);
      const packages = await project.getPackages();
      for (const p of packages) {
        this.packages.push({
          name: p.name,
          location: p.location,
        });
      }
    }
  }

  async checkSinglePackage() {
    if (!this.isMonorepo) {
      const pkgJson = await fs.readFile(
        path.join(this.projectRoot, 'package.json'),
      );
      this.packages.push({
        name: pkgJson.name,
        location: this.projectRoot,
      });
    }
  }

  async scaffold() {
    for (const pkg of this.packages) {
      await deployment(pkg, this);
      await service(pkg, this);
    }
  }

  async end() {
    await super.end();
  }
};
