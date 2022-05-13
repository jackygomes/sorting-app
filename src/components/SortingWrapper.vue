<template>
  <div class="wrapper">
    <h2 class="header">
      Sorting Training System
      <button class="button" id="show-modal" @click="showModal = true">Start sorting!</button>
    </h2>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <PopUp :show="showModal" @close="showModal = false">
    </PopUp>
  </Teleport>
  </div>
</template>

<script>
import PopUp from './PopUpModal.vue'
export default {
  name: 'sorting-main',
  data() {
    return {
      showModal: false
    }
  },
  components:{
    PopUp
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid #ddd;
  padding: 20px;
  width: 80%;
  margin: 0 auto;
  border-radius: 3px;
  background-color: #F5F5F5;

  .header {
    text-align: left;
    overflow: hidden;
  }
  .button {
    float: right;
  }
}
</style>