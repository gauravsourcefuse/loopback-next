// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/cli
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const yamljs = require('yamljs');

const templateFn = function (namespace, name, port, targetPort) {
  return {
    apiVersion: 'v1',
    kind: 'Service',
    metadata: {
      name: name,
      namespace: namespace,
    },
    spec: {
      ports: [
        {
          port: port,
          targetPort: targetPort,
        },
      ],
      selector: {
        app: name,
      },
    },
  };
};

module.exports = function (namespace, package, generator) {};
