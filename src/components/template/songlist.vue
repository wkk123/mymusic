<template>
  <div class="songlist">
    <li class="songlist_item" v-for="(item,index) in songlist" @click="plays(item,index)" v-bind:key="item.data.songid" :class="{active:isSongFlag === index}">
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
  </div>
</template>
<script>
export default {
  name:'List',
  props:{
    songlist:{
      type:Array,
      default:'',
    }
  },
  data(){
    return{
      isSongFlag:null,//选中
    }
  },
  filters:{
    percentage: num => {
      return Math.floor(parseFloat(num)*100)/100 +'%';
    },
  },
  methods: {
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
  },
}
</script>
<style>
@import "./../../assets/css/main/songlist.css";
</style>


