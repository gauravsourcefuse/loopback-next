// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/cli
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';
const yamljs = require('yamljs');

const templateFn = function (namespace, name, image) {
  return {
    apiVersion: 'extensions/v1beta1',
    kind: 'Deployment',
    metadata: {
      labels: {
        name: name,
      },
      name: name,
      namespace: namespace,
    },
    spec: {
      template: {
        metadata: {
          labels: {
            app: name,
          },
        },
        spec: {
          containers: [
            {
              name: name,
              image: image,
            },
          ],
        },
      },
    },
  };
};

module.exports = function (namespace, package, generator) {};
