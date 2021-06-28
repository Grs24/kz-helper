<template>
  <div class="box-card">
    <div class="row">
      <i class="el-icon-position"></i>
      <el-input
        class="input-portNumber"
        placeholder="输入端口号"
        v-model="portNumber"
        clearable
        size="mini"
        autofocus
      >
        <template slot="prepend">local.kuaizi.co:</template>
      </el-input>
    </div>
    <div class="row" @click="jump">
      <i class="el-icon-setting"></i>
      <span>管理面板</span>
    </div>
    <div class="row" @click="utils.jumpUrl(NET.DOCS)">
      <i class="el-icon-document"></i>
      <span>使用文档</span>
    </div>
  </div>
</template>

<script>
import { defaultSetting } from '../../utils/config'

export default {
  name: 'popup',
  data() {
    return {
      portNumber: ''
    }
  },
  methods: {
    // 切换启用
    checkoutOpen() {
      if (!this.item) return
      const value = !this.item.open
      if (value) {
        this.item.closeTime = 0
      } else {
        this.item.closeTime = Date.now()
      }
      this.item.open = value
      this.tableData.splice(this.index, 1, this.item)
      this.updateArr(this.tableData)
    },
    // 跳转管理面板
    jump() {
      const { id } = chrome.runtime
      const url = `chrome-extension://${id}/options.html`
      this.utils.jumpUrl(url)
    },
    // 初始化
    async initData() {
      this.Setting =
        (await this.utils.getChromeStorage(this.NET.GLOBALSETTING)) ||
        defaultSetting
      this.tableData =
        (await this.utils.getChromeStorage(this.NET.TABLELIST)) || []
      console.log('Setting', this.Setting, this.tableData)
      // 先获取当前页面的tabID
      chrome.tabs.getSelected(null, tab => {
        this.tab = tab
        const isMatch = this.utils.checkUrl(this.tableData, tab.url)
        console.log('tab', tab, isMatch)
        if (isMatch) {
          this.item = isMatch.item
          this.index = isMatch.index
        }
      })
    },
    // 一键开启/关闭
    checkoutAll() {
      const val = !this.open
      const arr = this.tableData.map(item => {
        item.open = val
        if (val) {
          item.closeTime = 0
        } else {
          item.closeTime = Date.now()
        }
        return item
      })
      this.updateArr(arr)
    },

    // 判断当前是否开启
    isOpen() {
      const val = this.open
      let newVal
      for (let i = 0; i < this.tableData.length; i += 1) {
        if (this.tableData[i].open) {
          newVal = true
          break
        } else {
          newVal = false
        }
      }
      // 切换了开关状态
      if (val !== newVal) {
        if (newVal) {
          // 打开 取消计时
          this.Setting.closeTime = 0
        } else {
          // 关闭 开始计时
          this.Setting.closeTime = Date.now()
        }
        this.settingUpdate(this.Setting)
      }
    },
    // 更新设置
    settingUpdate(obj) {
      this.Setting = obj
      return this.utils.updateStorageData(this.Setting, this.NET.GLOBALSETTING)
    },
    // 更新数组
    updateArr(arr) {
      this.tableData = arr
      this.isOpen()
      this.utils.updateStorageData(this.tableData, this.NET.TABLELIST)
    }
  }
}
</script>

<style scoped>
.box-card {
  width: auto;
  background: #fff;
  color: #666;
  font-size: 14px;
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
.input-portNumber .el-input-group__prepend {
  padding: 0 10px !important;
  color: #333;
}

.input-portNumber .el-input__inner {
  width: 85px;
  padding: 0 10px !important;
}
</style>
