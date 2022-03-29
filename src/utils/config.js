/*
 * @Description: config 配置
 * @Date: 2021-04-27 17:23:32
 * @Author: gaorongsheng
 * @LastEditors: mazexin
 * @LastEditTime: 2021-07-08 17:27:31
 */

// 默认全局设置
export const defaultSetting = {
  contextMenus: {
    title: 'quickly jump to url'
  },
  showPageAction: {
    url: 'kuaizi'
  },
  JUMP_URL_DEFAULT: {
    name: 'default',
    replaceStr: '',
    hostName: 'http://local.kuaizi.co',
    port: '8080'
    // urlParamsReg: /http(s?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
  }
}
