/*
 * @Description: 常用方法
 * @Date: 2021-04-27 17:12:01
 * @Author: gaorongsheng
 * @LastEditors: gaorongsheng
 * @LastEditTime: 2021-06-30 17:26:07
 */
import { defaultSetting } from './config.js'
const { JUMP_URL_DEFALUT } = defaultSetting

export const jumpUrl = url => {
  window.open(url, 'target')
}

/**
 * @description:获取storage数据
 * @param {*} key
 * @return {value}
 */
export const getChromeStorage = key => {
  return new Promise(resolve => {
    chrome.storage.sync.get(key, res => {
      let result = res[key]
      // 取到值 则还原给数组/对象 抛出去 否则就抛出去undefined
      if (result !== undefined) {
        result = JSON.parse(result)
      }
      resolve(result)
    })
  })
}

/**
 * @description:更新storage数据
 * @param {*} key
 * @return {value}
 */
export const updateChromeStorage = (val, key) => {
  return new Promise(resolve => {
    const str = window.JSON.stringify(val)
    chrome.storage.sync.set({ [key]: str }, () => {
      console.log(`${key} update`)
      resolve()
    })
  })
}

/**
 * @description:高亮当前插件
 * @param {*} url
 */
export const pageStateMatcher = url => {
  const rule = {
    conditions: [
      // 只有筷子网站才显示pageAction
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlContains: url }
      })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule])
  })
}

/**
 * @description:获取当去tab的url
 * @param {*} key
 * @return {value}
 */
export const getCurrentTabUrl = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      let url = tabs[0].url
      resolve(url)
    })
  })
}

/**
 * @description:获取url的参数
 * @param {*} key
 * @return {value}
 */
export const getUrlParams = (url, reg = '') => {
  let Reg = reg || JUMP_URL_DEFALUT.urlParamsReg
  return url.replace(Reg, '')
}
