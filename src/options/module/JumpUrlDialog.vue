<!--
 * @Description: 跳转网址弹窗（设置页的表单）
 * @Date: 2021-07-07 14:44:18
 * @Author: mazexin
 * @LastEditors: mazexin
-->

<template>
  <el-dialog
    :title="index ? '修改跳转规则' : '添加跳转规则'"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
  >
    <el-form :model="jumpUrlData">
      <el-form-item label="规则名称" :label-width="formLabelWidth">
        <el-input
          v-model="jumpUrlData.name"
          autocomplete="off"
          placeholder="如：plus"
        ></el-input>
      </el-form-item>
      <el-form-item label="匹配文本" :label-width="formLabelWidth">
        <div style="display: flex;">
          <span>{origin}</span>
          <el-input
            style="flex: 1; margin: 0 8px;"
            v-model="jumpUrlData.replaceStr"
            autocomplete="off"
            placeholder="（选填）"
          ></el-input>
          <span>{rest}</span>
        </div>
      </el-form-item>
      <el-form-item label="替换域名" :label-width="formLabelWidth">
        <el-input
          v-model="jumpUrlData.hostName"
          autocomplete="off"
          placeholder="如：https://pcp.kuaizi.co"
        ></el-input>
      </el-form-item>
      <el-form-item label="端口号" :label-width="formLabelWidth">
        <el-input
          v-model="jumpUrlData.port"
          autocomplete="off"
          placeholder="（选填）"
        ></el-input>
      </el-form-item>
      <el-form-item label="说明" :label-width="formLabelWidth">
        <div>
          <b>{{ original }}</b>
          <span style="margin-left: 20px; font-size: 12px; color: #606266;"
            >（ {orgin}为域名，{rest}为剩下的部分。）</span
          >
        </div>
        <div style="line-height: 20px; font-size: 12px; color: #909399;">
          <div>
            示例：
          </div>
          <div>
            如，页面链接为'https://pcp.kuaizi.co/oPlus/workspace?token=123'，
          </div>
          <div>
            此时，{orgin}为'https://pcp.kuaizi.co'，{rest}为'/oPlus/workspace?token=123'
          </div>
          <div>
            若，匹配文本为'/oPlus'，替换域名为'http://local.kuaizi.co'，端口号为'8081'
          </div>
          <div>
            则，最终，会将'https://pcp.kuaizi.co/oPlus'替换为'http://local.kuaizi.co:8081'，即跳转结果为：'http://local.kuaizi.co:8081/workspace?token=123'
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="hanldeReset" plain>重 置</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="hanldeConfirm">{{
        index ? '修 改' : '添 加'
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Notification } from 'element-ui'
import { defaultSetting } from '../../utils/config'
import { getChromeStorage, updateChromeStorage } from '../../utils'
const { JUMP_URL_DEFAULT } = defaultSetting
const {
  name: NAME,
  replaceStr: REPLACESTR,
  hostName: HOSTNAME,
  port: PORT
} = JUMP_URL_DEFAULT
import { initContextMenus } from '@/background/contextMenus'

export default {
  props: {
    visible: {
      type: Boolean,
      value: false
    }
  },
  data() {
    return {
      dialogFormVisible: true,
      jumpUrlData: {
        name: NAME,
        replaceStr: REPLACESTR,
        hostName: HOSTNAME,
        port: PORT
      },
      formLabelWidth: '120px',
      original: '{origin}{rest}',
      jumpUrlDataArr: [],
      index: ''
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 初始化
    async initData() {
      const search = window.location.search
      // ?index=0
      if (search) {
        // '0'
        this.index = (search.match(/index=(\d+?)/) || ['', ''])[1]
      } else {
        this.index = ''
      }

      const jumpUrlDataArr = await getChromeStorage('jumpUrlDataArr')
      if (Array.isArray(jumpUrlDataArr)) {
        // 浏览器存储的数据是数组
        this.jumpUrlDataArr = jumpUrlDataArr
      } else {
        // 非数组
        this.jumpUrlDataArr = []
      }
      if (this.index) {
        // 修改
        if (this.jumpUrlDataArr[this.index]) {
          this.jumpUrlData = this.jumpUrlDataArr[this.index]
        }
      } else {
        // 添加
        const jumpUrlData = await getChromeStorage('jumpUrlData')
        this.jumpUrlData = { ...this.jumpUrlData, ...jumpUrlData }
      }
    },
    // 重置
    hanldeReset() {
      this.jumpUrlData = JUMP_URL_DEFAULT
      // updateChromeStorage(this.jumpUrlData, 'jumpUrlData')
    },
    // 添加/修改
    hanldeConfirm() {
      if (!this.jumpUrlData.name) {
        alert('请填写规则名称')
        return
      }
      if (!this.jumpUrlData.hostName) {
        alert('请填写替换域名')
        return
      }
      if (this.index) {
        // 修改
        this.jumpUrlDataArr[this.index] = this.jumpUrlData
        updateChromeStorage(this.jumpUrlDataArr, 'jumpUrlDataArr')

        Notification.success({
          title: '修改成功',
          type: 'success'
        })
      } else {
        // 添加
        this.jumpUrlDataArr.push(this.jumpUrlData)
        updateChromeStorage(this.jumpUrlDataArr, 'jumpUrlDataArr')

        Notification.success({
          title: '添加成功',
          type: 'success'
        })
      }
      this.$nextTick(() => {
        // 更新网页右键菜单
        initContextMenus()
      })
      setTimeout(() => {
        this.handleClose()
      }, 1500)
    },
    // 关闭页面
    handleClose() {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        let { id } = tabs[0]
        chrome.tabs.remove(id)
      })
    }
  },
  watch: {
    visible(val) {
      this.dialogFormVisible = val
    },
    dialogFormVisible(val) {
      this.$emit('update:visible', val)
      this.handleClose()
    }
  }
}
</script>

<style scoped></style>
