import { expect } from 'chai';
import { transformAsync } from '@babel/core';
import babelPluginImportComponentsStyle from '../dist/index.js';

// babel配置
const babelOptions = {
  plugins: [
    [
      babelPluginImportComponentsStyle,
      {
        components: {
          module1: 'style/component1.css',
          module2: 'style/component2.css',
          module3: 'style/component3.css',
          'module4/dist': '~module4/style/component4.css',
          module5: [
            'style/component5.css',
            '~module6/style/component6.css'
          ]
        }
      }
    ]
  ],
  babelrc: false
};

describe('babel-plugin-import-component-style in babel', function() {
  it('should babel build return string', async function() {
    // 源代码
    const rawCode = `import component1 from 'module1';
import { component21, component22 } from 'module2';
import 'module3';
import component4 from 'module4/dist';
import component5 from 'module5';`;

    // 预期代码build结果
    const buildCode = `import component1 from 'module1';
import "module1/style/component1.css";
import { component21, component22 } from 'module2';
import "module2/style/component2.css";
import 'module3';
import "module3/style/component3.css";
import component4 from 'module4/dist';
import "module4/style/component4.css";
import component5 from 'module5';
import "module5/style/component5.css";
import "module6/style/component6.css";`;

    const babelFileResult = await transformAsync(rawCode, babelOptions);

    expect(babelFileResult.code).to.be.string;
    expect(babelFileResult.code).to.be.eql(buildCode);
  });
});