<template>
  <div class="popup-page">
    <div class="box-card">
      <div class="row">
        <i
          title="点击跳转"
          class="el-icon-position leftIcon"
          @click="handleJumpToUrl(jumpUrlData)"
        ></i>
        <el-input
          class="input-urlPort"
          placeholder="输入端口号"
          v-model="jumpUrlData.port"
          clearable
          size="mini"
          autofocus
          @keydown.enter.native="handleKeyDown"
        >
          <template slot="prepend">{{ jumpUrlData.hostName }}:</template>
        </el-input>
      </div>
      <div
        class="row"
        v-for="(item, index) in jumpUrlDataArr"
        :key="index"
        :title="'点击跳转' + item.name"
        @click="handleJumpToUrl(item)"
      >
        <div>
          <i
            class="el-icon-s-promotion leftIcon"
            @click="handleJumpToUrl(item)"
          ></i>
          {{ item.name }}{{ item.port ? '(:' + item.port + ')' : '' }}
        </div>
        <div @click.stop="editJumpUrlData(index)" class="ctrl">
          <i :title="'修改' + item.name" class="el-icon-edit"></i>
          <div @click.stop="" class="more">
            <span title="更多操作"><i class="el-icon-more-outline"></i></span>
            <div class="moreBtn" @click.stop="" title="">
              <i
                :title="'删除' + item.name"
                class="el-icon-delete"
                @click.stop="removeRule(index)"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div class="row btn" @click="addJumpUrlData">
        <i class="el-icon-plus leftIcon"></i>
        <span>添加跳转规则</span>
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
  name: NAME,
  replaceStr: REPLACESTR,
  hostName: HOSTNAME,
  port: PORT
} = JUMP_URL_DEFALUT
import { initContextMenus } from '@/background/contextMenus'

export default {
  name: 'popup',
  data() {
    return {
      jumpUrlData: {
        name: NAME,
        replaceStr: REPLACESTR,
        hostName: HOSTNAME,
        port: PORT
      },
      jumpUrlDataArr: []
    }
  },
  methods: {
    // 初始化
    async initData() {
      const jumpUrlData = await getChromeStorage('jumpUrlData')
      if (jumpUrlData && !Array.isArray(jumpUrlData)) {
        this.jumpUrlData = jumpUrlData
      }
      const jumpUrlDataArr = await getChromeStorage('jumpUrlDataArr')
      if (Array.isArray(jumpUrlDataArr)) {
        // 浏览器存储的数据是数组
        this.jumpUrlDataArr = jumpUrlDataArr
      } else {
        // 非数组
        this.jumpUrlDataArr = []
      }
    },
    // 跳转设置页面-添加
    addJumpUrlData() {
      const { id } = chrome.runtime
      const url = `chrome-extension://${id}/options.html`
      jumpUrl(url)
    },
    // 跳转设置页面-修改
    editJumpUrlData(index) {
      const { id } = chrome.runtime
      const url = `chrome-extension://${id}/options.html?index=${index}`
      jumpUrl(url)
    },
    // 键盘确认 修改默认端口号
    handleKeyDown(e) {
      updateChromeStorage(this.jumpUrlData, 'jumpUrlData')
      this.handleJumpToUrl(this.jumpUrlData)
      this.$nextTick(() => {
        // 更新网页右键菜单
        initContextMenus()
      })
    },
    // 跳转指定url
    async handleJumpToUrl(data) {
      const currentUrl = await getCurrentTabUrl()
      let origin = (currentUrl.match(/https?:\/\/.*?\//) || [''])[0]
      if (origin.length) origin = origin.slice(0, origin.length - 1)
      const { replaceStr, hostName, port } = data
      const url = currentUrl.replace(
        origin + replaceStr,
        hostName + (port ? ':' + port : '')
      )
      jumpUrl(url)
    },
    // 删除跳转规则
    removeRule(index) {
      this.jumpUrlDataArr.splice(index, 1)
      updateChromeStorage(this.jumpUrlDataArr, 'jumpUrlDataArr')
      this.$nextTick(() => {
        // 更新网页右键菜单
        initContextMenus()
      })
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
}

.box-card .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 10px 16px;
  cursor: pointer;
}
.box-card .row .leftIcon {
  margin-right: 8px;
}
.box-card .row:hover {
  background: #e7f6fb;
}
.box-card .btn {
  justify-content: center;
}
/* 操作 */
.box-card .row .ctrl {
  display: flex;
}
.box-card .row .ctrl .more {
  position: relative;
  margin-left: 8px;
}
.box-card .row .ctrl .more:hover .moreBtn {
  display: block;
}
.box-card .row .ctrl .more .moreBtn {
  display: none;
  position: absolute;
  z-index: 1;
  top: 100%;
  /* left: -8px; */
  left: -8px;
  padding: 8px;
  background: #fff;
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
