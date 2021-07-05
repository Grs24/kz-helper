/**
 * @description: 同步package.json的配置到manifest.json中
 */

const path = require('path')
const fs = require('fs')

// 插件版本与描述
const VERSION = process.env.npm_package_version
const DESCRIPTION = 'kuaizi小助手，加筷开发！'

const templateOption = {
  DESCRIPTION,
  VERSION
}

updateFillBuilderYAML(templateOption)

// 修改manifest.template.json配置，替换manifest.production.json
function updateFillBuilderYAML(option) {
  const ELECTRON_BUILDER_TEMPLATE = path.resolve(
    __dirname,
    'src',
    'manifest.template.json'
  )
  const ELECTRON_BUILDER_OUTPUT = path.resolve(
    __dirname,
    'src',
    'manifest.production.json'
  )
  let content = fs.readFileSync(ELECTRON_BUILDER_TEMPLATE).toString()
  // 替换匹配到的每个变量
  Object.entries(option).forEach(([key, val]) => {
    content = content.replace(createReg(key), val)
  })
  fs.writeFileSync(ELECTRON_BUILDER_OUTPUT, content)
}

// 根据变量名构建一个正则，匹配对应模板中的变量表示
function createReg(variable) {
  return new RegExp(`{{${variable}}}`, 'g')
}
