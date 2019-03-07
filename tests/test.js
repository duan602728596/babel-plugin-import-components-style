const path = require('path');
const { expect } = require('chai');
const babel7 = require('@babel/core');
const babel6 = require('babel-core');
const plugin = require('../lib/cjs');

const script = path.join(__dirname, 'script.js');

// babel配置
const options = {
  plugins: [
    [
      plugin,
      {
        components: {
          module1: 'style/component1.css',
          module2: 'style/component2.css',
          module3: 'style/component3.css'
        }
      }
    ]
  ],
  babelrc: false
};

function babelTransform(babel) {
  return new Promise((resolve, reject) => {
    babel.transformFile(script, options, function(err, result) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(result.code);
      }
    });
  });
}

describe('babel-plugin-import-component-style in babel 7', function() {
  // 预期代码build结果
  // babel7是双引号
  const build = `import component1 from 'module1';
import "module1/style/component1.css";
import { component21, component22 } from 'module2';
import "module2/style/component2.css";
import 'module3';
import "module3/style/component3.css";`;

  it('should babel 7 build return string', async function() {
    const code = await babelTransform(babel7);

    expect(code).to.be.string;
    expect(code).to.be.eql(build);
  });
});

describe('babel-plugin-import-component-style in babel 6', function() {
  // 预期代码build结果
  // babel7是单引号
  const build = `import component1 from 'module1';
import 'module1/style/component1.css';
import { component21, component22 } from 'module2';
import 'module2/style/component2.css';
import 'module3';
import 'module3/style/component3.css';`;

  it('should babel 6 build return string', async function() {

    const code = await babelTransform(babel6);

    expect(code).to.be.string;
    expect(code).to.be.eql(build);
  });
});