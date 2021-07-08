/*
 * @Description: 这是***页面
 * @Date: 2021-07-08 17:28:08
 * @Author: mazexin
 * @LastEditors: mazexin
 */

import { getChromeStorage } from '@/utils/index'
import { defaultSetting } from '@/utils/config.js'
const { JUMP_URL_DEFALUT } = defaultSetting

export const initContextMenus = () => {
  // 跳转页面的事件
  const jumpUrl = async (params, jumpUrlData) => {
    const { replaceStr, hostName, port } = jumpUrlData

    const currentUrl = params.pageUrl
    let origin = (currentUrl.match(/https?:\/\/.*?\//) || [''])[0]
    if (origin.length) origin = origin.slice(0, origin.length - 1)
    const url = currentUrl.replace(
      origin + replaceStr,
      hostName + (port ? ':' + port : '')
    )
    chrome.tabs.create({
      url
    })
  }
  let jumpUrlData
  let jumpUrlDataArr
  // 清空右键菜单
  chrome.contextMenus.removeAll(async () => {
    jumpUrlData = (await getChromeStorage('jumpUrlData')) || JUMP_URL_DEFALUT
    jumpUrlDataArr = (await getChromeStorage('jumpUrlDataArr')) || []
    jumpUrlDataArr.unshift(jumpUrlData)
    // 添加右键菜单
    jumpUrlDataArr.forEach((item, index) => {
      chrome.contextMenus.create({
        title: item.name,
        id: '' + index
        // onclick: async function(params) {
        //   console.log('params')
        //   console.log(params)
        //   jumpUrl(params, item)
        // }
      })
    })
  })
  chrome.contextMenus.onClicked.addListener(async info => {
    jumpUrlData = (await getChromeStorage('jumpUrlData')) || JUMP_URL_DEFALUT
    jumpUrlDataArr = (await getChromeStorage('jumpUrlDataArr')) || []
    jumpUrlDataArr.unshift(jumpUrlData)
    jumpUrl(info, jumpUrlDataArr[info.menuItemId])
  })
}
