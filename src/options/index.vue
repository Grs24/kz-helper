<template>
  <div class="options-page">
    <JumpUrlDialog :visible.sync="JumpUrlDialogShow"></JumpUrlDialog>
  </div>
</template>

<script>
import JumpUrlDialog from './module/JumpUrlDialog.vue'

export default {
  name: 'app',
  components: { JumpUrlDialog },
  data() {
    return {
      JumpUrlDialogShow: true
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
