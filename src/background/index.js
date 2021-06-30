/*
 * @Description: background常驻页面
 * @Date: 2021-04-27 17:12:01
 * @Author: gaorongsheng
 * @LastEditors: gaorongsheng
 * @LastEditTime: 2021-06-30 17:21:38
 */
import { pageStateMatcher, getUrlParams, getChromeStorage } from '@/utils/index'
import { defaultSetting } from '@/utils/config.js'
const { contextMenus, showPageAction, JUMP_URL_DEFALUT } = defaultSetting

chrome.contextMenus.create({
  title: contextMenus.title,
  onclick: async function(params) {
    const jumpUrlData =
      (await getChromeStorage('jumpUrlData')) || JUMP_URL_DEFALUT

    const { http, hostName, port } = jumpUrlData

    // 注意不能使用location.href，因为location是属于background的window对象
    let urlParams = getUrlParams(params.pageUrl)
    const url = `${http}${hostName}:${port}${urlParams}`
    chrome.tabs.create({
      url
    })
  }
})

chrome.runtime.onInstalled.addListener(pageStateMatcher(showPageAction.url))

console.log('chrome :>> ', chrome)
