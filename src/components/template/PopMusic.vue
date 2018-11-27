<template>
  <div id="PopMusic" class="PopMusic">
    <div class="Popbackground">
      <div class="picture_imgbox"></div>
      <img class="pic_img" :class="FilterClass(filter)" :src="topinfo.pic_v12" alt="">
    </div>
    <div class="topinfo">
      <div id="picture" class="top_picture">
        <div class="top_title">
          <div class="title_nav">
            <h3 class="ListName">
              <span>{{topinfo.ListName}}</span>
              <span>{{'第'+OtrosData.day_of_year+'天'}}</span>
            </h3>
            <p class="updata">{{OtrosData.update_time+'更新'}}</p>
          </div>
          <div class="title_msg">
            <div class="msg_flag">
              <ul class="msg_Num clearfix">
                <li :key="key" class="fl" :class="setClassName(item,key)" v-for="(item,key) in CommentClassList"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="top_nav">
      <ul class="top_navbox" :class="{active:isFixed}">
        <li class="navbox_item" @click="TopNavbox(1)" :class="{active:isNavFlag===1}">
          <h5>单曲</h5>
          <i class="navbox_flag"></i>
        </li>
        <li class="navbox_item" @click="TopNavbox(2)" :class="{active:isNavFlag===2}">
          <h5>详情</h5>
          <i class="navbox_flag"></i>
        </li>
      </ul>
      <ul class="top_payNavs" v-if="isNavFlag!==2">
        <li class="payNavs_item" @click="PaYNavs(1)" :class="{active:isPaYFlag===1}">
          <i class="Navs_flag">
            <img src="./../../assets/images/icon/play.png" alt="">
          </i>
          <h3 class="Navs_title">全部播放</h3>
        </li>
        <li class="payNavs_item" @click="PaYNavs(2)" :class="{active:isPaYFlag===2}">
          <i class="Navs_flag">
            <img src="./../../assets/images/icon/down1.png" alt="">
          </i>
          <h3 class="Navs_title"></h3>
        </li>
        <li class="payNavs_item" @click="PaYNavs(3)" :class="{active:isPaYFlag===3}">
          <i class="Navs_flag">
            <img src="./../../assets/images/icon/dispose.png" alt="">
          </i>
          <h3 class="Navs_title"></h3>
        </li>
      </ul>
    </div>
    <div v-if="isNavFlag===2" class="Topinfo_info">
      <div v-html="topinfo.info"></div>
    </div>
    <div class="PopMusic_list" v-if="isNavFlag!==2">
      <ul class="PopMusic_songlist">
        <!-- <router-link v-for="(item,index) in songlist" :to="{name:'Single',query:{id:item.data.singer[0].id}}" v-bind:key="item.cur_count"  @click="plays(item,index)" :class="{active:isSongFlag === index}"> -->
          <li class="songlist_item" v-for="(item,index) in songlist" @click="plays(item,index)" v-bind:key="item.data.songid" :class="{active:isSongFlag === index}">
          <!-- <li class="songlist_item"> -->
            <div class="item_info" >
              <div class="item_flag" :class="{active:isSongFlag === index}"></div>
              <div class="item_num">
                <span class="serial_number">{{index+1}}</span>
                <div class="num_bottom">
                  <i class="num_flag"></i>
                  <span class="num_count">{{item.in_count|percentage}}</span>
                </div>
              </div>
              <div class="item_title">
                <h3 class="title_songname">
                  <span class="SonGName_name">{{item.data.songname}}</span>
                  <span class="SonGName_OneSelf" v-if="item.data.isonly===1">{{item.data.isonly===1?'独家':''}}</span>
                </h3>
                <p class="title_singer">{{item.data.singer[0].name + '·' + item.data.albumname}}</p>
              </div>
              <div class="item_more">
                <div class="more_mv">
                  <span v-if="item.vid&&item.vid.Fstatus">MV</span>
                </div>
                <div class="more_flag">
                  <span>···</span>
                </div>
              </div>
            </div>
          </li>
        <!-- </router-link> -->
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name:'PopMusic',
    data () {
      return {
        songlist:[],//歌曲列表
        topinfo:{},//顶部信息
        OtrosData:{},//其他信息
        isNavFlag:1,//单曲 详情 切换（默认单曲）
        isPaYFlag:1,//播放全部 下载多选 切换 （默认 播放全部）
        isSongFlag:null,//选中
        CommentClassList:[],//评论数字
        isFixed:false,//固定
        filter:0,
      }
    },
    created(){
    },
    mounted () {
      document.getElementById('PopMusic').addEventListener('scroll', this.handleScroll)
    },
    filters:{
      percentage: num => {
        return Math.floor(parseFloat(num)*100)/100 +'%';
      },
    },
    beforeMount () {
      // console.log(this.$route.query.id);
      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
        params: {
          topid: this.$route.query.id,
          format: 'jsonp',
          inCharset: 'utf8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'yqq',
          needNewCode: 0
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {
        let info = response.data;
          this.$store.commit('setCountList',{
            songlist: response.data.songlist,
            songlistInfo: response.data
          })
          if(info.code ===0){
            this.songlist = info.songlist;
            this.topinfo = info.topinfo
            this.OtrosData = info;
            delete this.OtrosData.code;
            delete this.OtrosData.songlist;
            delete this.OtrosData.topinfo;
            this.CommentNum(this.OtrosData.comment_num);
          }
      })
    },
    methods:{
      plays(data,index){
        this.isSongFlag = index;
        this.$store.commit('setPlayList',{
          index:index,
          songlist:this.songlist,
        })
        // console.log('data',data,index);
        this.$router.push({name:'Single',query:{id:data.data.songid}});
      },
      btn(){
        this.message = '123';
      },
      // 切换 单曲 详情
      TopNavbox:function(num){
        this.isNavFlag = num;
      },
      // 切换 播放全部 下载多选
      PaYNavs:function(num){
        this.isPaYFlag = num;
      },
      handleTouchMove(e) {
          let scrollTop = document.getElementById('PopMusic').scrollTop;
          let clientHeight = document.getElementById('PopMusic').clientHeight;
      },
      handleScroll (e) {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.getElementById('PopMusic').scrollTop
        var clientHeight = document.querySelector('#picture').clientHeight;
        this.filter = scrollTop;
        if((clientHeight - 80) < scrollTop){
          this.isFixed = true;
          document.getElementById('headbox').style.backgroundColor="#000000";
          this.$route.meta.title = this.topinfo.ListName+'第'+this.OtrosData.day_of_year+'天';
        }else{
          this.isFixed = false;
          document.getElementById('headbox').style.backgroundColor="transparent";
        }
      },
      FilterClass(scrollTop){
        if(1 >scrollTop){
          return;
        }else if(50>scrollTop ){
          return 'filter1';
        }else if(100>scrollTop ){
          return 'filter2';
        }else if(150 > scrollTop ){
          return 'filter3';
        }else if(200 > scrollTop ){
          return 'filter3';
        }
      },
      // 评论类名数字处理
      CommentNum(Num){
        var NumStr = String(Num);
        if(Num>=999){
          this.CommentClassList=[9,9,9];
        }else{
          this.CommentClassList = String(Num).split("");
        }
      },
      // 类名处理
      setClassName(item,key){
        return 'Num'+item;
      },
    },
  }
</script>

<style scoped>
</style>
