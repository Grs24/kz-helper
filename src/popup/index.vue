<template>
  <div class="popup-page">
    <div class="box-card">
      <div class="row">
        <i class="el-icon-position"></i>
        <el-input
          class="input-urlPort"
          placeholder="输入端口号"
          v-model="jumpUrlData.port"
          clearable
          size="mini"
          autofocus
          @keydown.enter.native="handleKeyDown"
        >
          <template slot="prepend"
            >{{ jumpUrlData.http }}{{ jumpUrlData.hostName }}:</template
          >
        </el-input>
      </div>
      <div class="row" @click="jumpSetting">
        <i class="el-icon-setting"></i>
        <span>设置</span>
      </div>
      <!-- <div class="row" @click="jumpReadme">
        <i class="el-icon-document"></i>
        <span>使用文档</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import { defaultSetting } from '../utils/config'
import {
  jumpUrl,
  getChromeStorage,
  updateChromeStorage,
  getCurrentTabUrl,
  getUrlParams
} from '../utils'
const { JUMP_URL_DEFALUT } = defaultSetting
const {
  http: HTTP,
  hostName: HOSTNAME,
  port: PORT,
  urlParamsReg: URLPARAMSREG
} = JUMP_URL_DEFALUT

export default {
  name: 'popup',
  data() {
    return {
      jumpUrlData: {
        http: HTTP,
        hostName: HOSTNAME,
        port: PORT,
        urlParamsReg: URLPARAMSREG
      }
    }
  },
  methods: {
    // 初始化
    async initData() {
      const jumpUrlData = await getChromeStorage('jumpUrlData')
      jumpUrlData && (this.jumpUrlData = jumpUrlData)
    },
    // 跳转设置页面
    jumpSetting() {
      const { id } = chrome.runtime
      const url = `chrome-extension://${id}/options.html`
      jumpUrl(url)
    },
    // 键盘确认
    handleKeyDown(e) {
      const isEnterKey = (e.keyCode || e.which) == 13
      if (isEnterKey) {
        updateChromeStorage(this.jumpUrlData, 'jumpUrlData')
        this.handleJumpToUrl()
      }
    },
    // 跳转指定url
    async handleJumpToUrl() {
      let currentUrl = await getCurrentTabUrl()
      let urlParams = getUrlParams(currentUrl)
      const { http, hostName, port } = this.jumpUrlData
      let url = `${http}${hostName}:${port}${urlParams}`

      jumpUrl(url)
    }
  },
  created() {
    this.initData()
  }
}
</script>

<style scoped>
.box-card {
  width: auto;
  background: #fff;
  color: #666;
  font-size: 12px;
  padding: 0;
  box-shadow: 0 0 8px #ddd;
}
.box-card i {
  font-size: 14px;
  color: #666;
  margin-right: 10px;
}

.box-card .row {
  cursor: pointer;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
}
.box-card .row span {
  margin-right: 10px;
}
.box-card .row:hover {
  background: #e7f6fb;
}
</style>
<style>
.input-urlPort .el-input-group__prepend {
  padding: 0 10px !important;
  color: #333;
}

.input-urlPort .el-input__inner {
  width: 85px;
  padding: 0 10px !important;
}
</style>
