<template>
  <div class="music">
    <Headerbox
    v-if="$route.meta.headShow"
    :title="$route.meta.cname"
    :fontColor="$route.meta.font"
    :backColor="$route.meta.bgcolor"
    :leftBtnTyple="$route.meta.left"
    :rightBtnTyple="$route.meta.right"
    ></Headerbox>
    <div class="main" :class="!$route.meta.navShow?'active':''">
      <router-view></router-view>
    </div>
    <navbar v-if="$route.meta.navShow"></navbar>
  </div>
</template>

<script>
  import Headerbox from './../element/title/title.vue'
  import navbar from './../element/navbar/navbar.vue'
  export default {
    name:'mobile',
    components:{
      Headerbox,navbar
    },
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
.music{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  background:#f0f0f0;
}
.main{
  width: 100%;
  height:calc(100% - 1.0rem)
}
.main.active{
  height:calc(100%)
}
</style>

