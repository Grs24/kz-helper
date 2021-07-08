/*
 * @Description: background常驻页面
 * @Date: 2021-04-27 17:12:01
 * @Author: gaorongsheng
 * @LastEditors: mazexin
 * @LastEditTime: 2021-07-08 17:32:21
 */
import { pageStateMatcher } from '@/utils/index'
import { defaultSetting } from '@/utils/config.js'
const { showPageAction } = defaultSetting
import { initContextMenus } from '@/background/contextMenus'

initContextMenus()

chrome.runtime.onInstalled.addListener(pageStateMatcher(showPageAction.url))

console.log('chrome :>> ', chrome)
