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
            <h3 class="ListName" v-if="false">
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
        <SongList :songlist="songlist"></SongList>
      </ul>
    </div>
  </div>
</template>

<script>
  import SongList from './songlist.vue'
  export default {
    name:'PopMusic',
    components:{
      SongList
    },
    data () {
      return {
        songlist:[],//歌曲列表
        topinfo:{},//顶部信息
        OtrosData:{},//其他信息
        isNavFlag:1,//单曲 详情 切换（默认单曲）
        isPaYFlag:1,//播放全部 下载多选 切换 （默认 播放全部）
        CommentClassList:[],//评论数字
        isFixed:false,//固定
        filter:0,
      }
    },
    watch:{
      $route(to, from){
        console.log(this.$route.meta);
      }
    },
    created(){
    },
    mounted () {
      document.getElementById('PopMusic').addEventListener('scroll', this.handleScroll)
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
        console.log('data',data,index);
        this.GetvKey();
        // this.$router.push({name:'Single',query:{id:data.data.songid}});
      },
      // 获取vkey
      GetvKey(){
        this.$http.jsonp('https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg', {
          params: {
            // g_tk:5381,
            // jsonpCallback:'MusicJsonCallback8128692786796425',
            // loginUin:0,
            // hostUin:0,
            // format: 'jsonp',
            // inCharset: 'utf8',
            // outCharset: 'utf-8',
            // notice: 0,
            // platform: 'yqq',
            // needNewCode: 0,
            // cid:205361747,
            // callback:'MusicJsonCallback8128692786796425',
            // uin:0,
            // songmid:'001uxkNp3a7Qkv',
            // filename:'C400001uxKNp3a7Qkv.m4a',
            // guid:504753841,
            g_tk: 5381,
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            format: 'json',
            songmid: 227979850,
            filename:'C400' + 227979850 +'.m4a',
            guid:2617295690,
            platform:'yqq',
            loginUin:0,
            hostUin: 0,
            needNewCode: 0,
            uin:0,
            cid:205361747,
          },
          jsonp: 'jsonpCallback'
        }).then(function (response) {
          let info = response.data;
          console.log('info',info);
        })
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
        var TableHeader = '';
        if((clientHeight - 80) < scrollTop){
          this.isFixed = true;
          document.getElementById('headbox').style.backgroundColor="#000000";
          if(this.OtrosData.day_of_year){
            TableHeader=this.topinfo.ListName+'第'+this.OtrosData.day_of_year+'天';
          }else{
            TableHeader=this.topinfo.ListName;
          }
          document.getElementById('head_text').innerHTML=TableHeader;
        }else{
          this.isFixed = false;
          document.getElementById('headbox').style.backgroundColor="transparent";
          document.getElementById('head_text').innerHTML='';
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
