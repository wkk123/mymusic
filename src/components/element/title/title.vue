<template>
  <div class="head">
    <ul class="headbox" id="headbox" :style="headStyle">
      <li class="head_btn">
        <i class="icon" :class="leftBtn()" @click="leftBtnEvent"></i>
      </li>
      <li class="head_text" id="head_text">{{title}}</li>
      <li class="head_btn">
        <i class="icon" :class="rightBtn()" @click="rightBtnEvent"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'headbox',
    props:{
      title:{
        type:String,
        default:'排行',
        required:true,
      },
      fontColor:{
        type:String,
        default:'',
      },
      backColor:{
        type:String,
        default:'',
      },
      leftBtnTyple:{
        type:String,
        default:'',
      },
      rightBtnTyple:{
        type:String,
        default:'',
      },
    },
    data () {
      return {
      }
    },
    computed:{
      headStyle(){
        return {
          background:this.backColor,
          color :this.fontColor
        }
      }
    },
    methods:{
      // 后退
      GoBack(){
        this.$router.back(-1)
      },
      // 设置
      more(){
        console.log('more');
      },
      // 左边操作
      leftBtnEvent(){
        switch(this.leftBtnTyple){
          case 'back':
            this.GoBack()
            return;
          case null:
            return;
        }
      },
      // 右边操作
      rightBtnEvent(){
        switch(this.rightBtnTyple){
          case 'more':
            this.more();
          case null:
            return;
        }
      },
      // 左边样式
      leftBtn(){
        switch(this.leftBtnTyple){
          case 'back':
            return 'back';
          case 'null':
            return;
        }
      },
      // 右边样式
      rightBtn(){
        switch(this.rightBtnTyple){
          case 'more':
            return 'more';
          case 'null':
            return;
        }
      },
    }
  }
</script>

<style scoped>
.head{
  width:100%;
  height:0.9rem;
  position: fixed;
  z-index: 100000;
}
.headbox{
  width:100%;
  height:0.9rem;
  line-height:0.9rem;
  background:#FF286B;
  text-align: center;
  font-size:0.32rem;
  color:#ffffff;
  letter-spacing: 0.1rem;
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
}
.head_text{
  width:calc(100% - 1.8rem);
  height:0.9rem;
}
.head_btn{
  width:0.9rem;
  height:0.9rem;
}
.head_btn .icon{
  margin:0.15rem;
  display: flex;
}
.head_btn:first-child .icon.back{
  background-image: url('./../../../assets/images/icon/1.png');
  background-position: -20px -125px;
  width:0.6rem;
  height:0.6rem;
}
.head_btn:last-child .icon.more{
  background-image: url('./../../../assets/images/icon/more.png');
  background-repeat: no-repeat;
  background-position: 0;
  background-size: 0.6rem;
  width:0.6rem;
  height:0.6rem;
}
</style>


