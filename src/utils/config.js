/*
 * @Description: config 配置
 * @Date: 2021-04-27 17:23:32
 * @Author: gaorongsheng
 * @LastEditors: gaorongsheng
 * @LastEditTime: 2021-06-30 17:18:34
 */

// 默认全局设置
export const defaultSetting = {
  contextMenus: {
    title: 'quickly jump to url'
  },
  showPageAction: {
    url: 'kuaizi'
  },
  JUMP_URL_DEFALUT: {
    http: 'http://',
    hostName: 'local.kuaizi.co',
    port: '8080',
    urlParamsReg: /http(s?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
  }
}
