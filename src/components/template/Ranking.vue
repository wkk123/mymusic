<template>
  <div class="Ranking">
    <div class="Ranking_box">
      <header class="Ranking_head">{{header}}</header>
      <ul class="RankingList">
        <li v-for="(item,index) in MusicList" class="Ranking_item" v-bind:key="item.id">
          <router-link @click="play(item.id)" :to="{name:'PopMusic',query:{id:item.id}}">
            <div class="clearfix" >
              <div class="Ranking_img fl">
                <img :src="item.picUrl" :alt="item.topTitle">
                <ul class="cleafix Ranking_num">
                  <li class="fl num_Count clearfix">
                    <i class="num_flag fl"></i>
                    <span class="fl">{{item.listenCount|Filters1}}</span>
                  </li>
                  <li class="fl num_switch">
                    <div class="num_play" :class="{active:isPlay ===index}" @click="PlayMusic(index)"></div>
                  </li>
                </ul>
              </div>
              <ul class="Ranking_list fl clearfix">
                <li class="list_item fl overflow-hidden1" v-for="(it,index) in item.songList" v-bind:key="index">
                  <span class="list_index">{{index+1}}</span>
                  <span class="list_song ">{{it.songname}}</span>
                  <span class="list_singer">{{'-'+it.singername}}</span>
                </li>
              </ul>
              <div class="Ranking_flag fr">
                <i class="flag"></i>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Ranking',
  data () {
    return {
      header:'QQ音乐巅峰榜',
      head:'my-music',
      List:[],
      ToPid:[{id:3},{id:5},{id:6},{id:16},{id:17},{id:18},{id:19},{id:23},{id:26}],
      num:0,
      ID:'',
      MusicList:[],
      isPlay:'',//音乐播放
    }
  },
  created(){
  },
  mounted(){
    // 加载项 音乐列表
    this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
      params: {
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
      },
      jsonp: 'jsonpCallback'
    }).then(function (response) {
      // console.log(response.data);
      this.MusicList = response.data.data.topList;
      // console.log('GetList',this.MusicList);
    })
  },
  methods: {
    // 点击 进入某一类
    play (id) {
      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
        params: {
          topid: id,
          format: 'jsonp',
          inCharset: 'utf8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'yqq',
          needNewCode: 0
        },
        jsonp: 'jsonpCallback'
      }).then(function (response) {
        this.$store.commit('setCountList',{
          songlist: response.data.songlist,
          songlistInfo: response.data
        })
        // console.log('3',response.data);
      })
    },
    PlayMusic(index){
        console.log('index',index);
        this.isPlay = index;
    },
  },
  //过滤器
  filters:{
    Filters1: num => {
        return Math.round(num / 1000) / 10 + '万'
    }
  }
}
</script>
