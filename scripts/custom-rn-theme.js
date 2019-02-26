const path = require('path');
const fs = require('fs');
console.log('start')
const defaultVars = require('antd-mobile-rn/lib/style/themes/default.native');
console.log('default vars')
console.log(defaultVars)
const customVars = require('../theme');
const themePath = path.resolve(require.resolve('antd-mobile-rn'), '../style/themes/default.native.js');

const themeVars = Object.assign({}, defaultVars, customVars);
console.log('start theme')
if (fs.statSync(themePath).isFile()) {
  console.log('find succ')
  fs.writeFileSync(
    themePath,
    'var brandPrimaryTap = "#00BCD4"; var brandPrimary = "#00BCD4";module.exports = ' + JSON.stringify(themeVars)
  );
}
