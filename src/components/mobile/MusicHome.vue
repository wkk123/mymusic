<template>
  <div id="MusicHome" class="homemusic">
    <div class="MHhead_box">
      <ul class="MHhead">
        <li class="Head_item">
          <img src="./../../assets/images/icon/list.png" alt="list">
        </li>
        <router-link class="Head_item" @click="HeadItem(1)" :to="{name:'Ranking'}" >
          <li class="Head_item" :class="{'active':true}">我的</li>
        </router-link>
        <router-link class="Head_item"  @click="HeadItem(2)" :to="{name:'Ranking'}" >
          <li class="Head_item" :class="{'active':true}">音乐馆</li>
        </router-link>
        <router-link class="Head_item" @click="HeadItem(3)" :to="{name:'Ranking'}" >
          <li :class="{'active':true}">排行</li>
        </router-link>
        <li class="Head_item">
          <img src="./../../assets/images/icon/add.png" alt="add">
        </li>
      </ul>
      <div class="MHhead_input">
        <input type="text" class="MHhead_search" placeholder="搜索" name="" id="">
      </div>
      <div class="MHhead_img">
        <wc-swiper>
          <wc-slide v-for="(slide, key) in slidelist" :key="key">
            <a :href="slide.linkUrl">
              <img :src="slide.picUrl" :alt="slide.id">
            </a>
          </wc-slide>
        </wc-swiper>
      </div>
    </div>
    <div class="MusicList">
      <ul class="Music_list">
        <SongList :songlist="RSonglist"></SongList>
      </ul>
    </div>
  </div>
</template>

<script>
  import SongList from './../template/songlist.vue'
  export default {
    name:'MusicHome',
    components:{
      SongList
    },
    data () {
      return {
        slidelist:[],//滑动列表
        RSonglist:[],//推荐歌曲列表
      }
    },
    beforeMount () {
      this.$http.jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',{
        params: {
          g_tk: 5381,
          uin: 0,
          format: 'jsonp',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          _: 1548400415934,
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {
        let info = response.data;
        this.slidelist = info.data.slider;
        console.log(this.slidelist);
      })
    },
    created() {
      this.Recommend();
    },
    methods:{
      // 点击head 
      HeadItem(arg){

      },
      Recommend(){
        this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',{
          params: {
            g_tk: 5381,
            uin: 0,
            format: 'jsonp',
            inCharset: 'utf-8',
            outCharset: 'utf-8¬ice=0',
            platform: 'h5',
            needNewCode: 1,
            tpl: 3,
            page: 'detail',
            type: 'top',
            topid: 26,
            _: 1520777874472,
          },
          jsonp: 'jsonpCallback'
        }).then(function (response) {
          let info = response.data;
          this.RSonglist = info.songlist;
          console.log(info);
          console.log(info.topinfo.ListName);
        })
      },
      SubmitSearch(val){
        this.$http.jsonp('https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',{
          params: {
            g_tk:5381,
            uin:0,
            format:jsonp,
            inCharset:utf-8,
            outCharset:'utf-8%C2%ACice=0',
            platform:'h5',
            needNewCode:1,
            w:val,
            zhidaqu:1,
            catZhida:1,
            t:0,
            flag:1,
            ie:utf-8,
            sem:1,
            aggr:0,
            perpage:20,
            n:20,
            p:1,
            remoteplace:'txt.mqq.all',
            _:1520833663464
          },
          jsonp: 'jsonpCallback'
        }).then(function (response) {
          let info = response.data;
          console.log(info);
          console.log(info.topinfo.ListName);
        })
      }
    },


}
</script>

<style>
</style>

