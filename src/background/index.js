/*
 * @Description: background常驻页面
 * @Date: 2021-04-27 17:12:01
 * @Author: gaorongsheng
 * @LastEditors: gaorongsheng
 * @LastEditTime: 2021-06-28 03:40:59
 */
import { pageStateMatcher } from '@/utils/index'
import { defaultSetting } from '@/utils/config.js'
const { contextMenus, showPageAction } = defaultSetting

chrome.contextMenus.create({
  title: contextMenus.title,
  onclick: function(params) {
    // 注意不能使用location.href，因为location是属于background的window对象
    let urlParams = params.pageUrl.replace(
      /http(s?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
      ''
    )
    console.log(`urlParams`, urlParams)
    chrome.tabs.create({
      url: `http://local.kuaizi.co:8080${urlParams}`
    })
  }
})

// chrome.runtime.onInstalled.addListener(pageStateMatcher(showPageAction.url))
console.log('showPageAction.url:>> ', showPageAction.url)
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          // 只有筷子网站才显示pageAction
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'kuaizi' }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ])
  })
})

console.log('chrome :>> ', chrome)
