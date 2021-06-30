<template>
  <el-dialog title="修改默认设置" :visible.sync="dialogFormVisible">
    <el-form :model="jumpUrlData">
      <el-form-item label="http协议" :label-width="formLabelWidth">
        <el-input v-model="jumpUrlData.http" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="域名" :label-width="formLabelWidth">
        <el-input v-model="jumpUrlData.hostName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="端口" :label-width="formLabelWidth">
        <el-input v-model="jumpUrlData.port" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="url参数匹配正则" :label-width="formLabelWidth">
        <el-input
          v-model="jumpUrlData.urlParamsReg"
          autocomplete="off"
        ></el-input>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="hanldeReset">重置</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="hanldeConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Notification } from 'element-ui'
import { defaultSetting } from '../../utils/config'
import { getChromeStorage, updateChromeStorage } from '../../utils'
const { JUMP_URL_DEFALUT } = defaultSetting
const {
  http: HTTP,
  hostName: HOSTNAME,
  port: PORT,
  urlParamsReg: URLPARAMSREG
} = JUMP_URL_DEFALUT

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
        http: HTTP,
        hostName: HOSTNAME,
        port: PORT,
        urlParamsReg: URLPARAMSREG
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 初始化
    async initData() {
      const jumpUrlData = await getChromeStorage('jumpUrlData')
      jumpUrlData && (this.jumpUrlData = jumpUrlData)
    },
    hanldeReset() {
      this.jumpUrlData = JUMP_URL_DEFALUT
      updateChromeStorage(this.jumpUrlData, 'jumpUrlData')
    },
    hanldeConfirm() {
      updateChromeStorage(this.jumpUrlData, 'jumpUrlData')

      Notification.success({
        title: '修改成功',
        type: 'success'
      })
      setTimeout(() => {
        this.handleClose()
      }, 500)
    },
    handleClose() {
      // 关闭页面
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
