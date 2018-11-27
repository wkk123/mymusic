<template>
  <div class="Single">
    <div class="Single_lyrics">
      <div class="lyrics_box">
        <div class="lyrics_disc"></div>
        <div class="lyrics_info">
          <p class="lyrics_item" :class="TimeClass(item[0][0])" v-for="item in lyric" :key="item[0][0]">{{item[1]}}</p>
        </div>
      </div>
    </div>
    <div class="Single_audio">
      <audio id="music" class="audio_box" @timeupdate="updateTime" autoplay="false" :src="AudioUrl"></audio>
    </div>
    <div class="Single_bar">
      <div class="bar_time" :class="{active:true}"><span>{{updateCurrentTime}}</span></div>
      <div class="bar_progress" id="progress">
        <div class="bar_power" v-bind:style="{width:PowerWidth}">
          <div class="bar_touch" id="BarTouch" v-bind:style="{left:BarTouch}"></div>
        </div>
      </div>
      <div class="bar_time"><span>{{updateDuration}}</span></div>
    </div>
    <div class="Single_nav">
      <ul class="Nav_box">
        <li class="Nav_switch">
          <div class="box" :class="{active0:true}"></div>
        </li>
        <li class="Nav_go">
          <div class="box">
            <div class="img_box"></div>
          </div>
        </li>
        <li class="Nav_play">
          <div class="box">
            <div class="img_box"></div>
          </div>
        </li>
        <li class="Nav_retreat">
          <div class="box">
            <div class="img_box"></div>
          </div>
        </li>
        <li class="Nav_list">
          <div class="box"></div>
        </li>
      </ul>
      <ul class="Nav_min">
        <li class="item_box">
          <div class="img_box"></div>
        </li>
        <li class="item_box">
          <div class="img_box"></div>
        </li>
        <li class="item_box">
          <div class="img_box"></div>
        </li>
        <li class="item_box">
          <div class="img_box">
            <!-- <div class="msg_box">
              <ul class="msg_Num clearfix">
                <li class="fl"></li>
                <li class="fl"></li>
                <li class="fl"></li>
              </ul>
            </div> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Base64 from './../../assets/js/base/base64.js'
export default {
  name:'Single',
  data(){
    return{
      song:'',//歌曲
      lyric:[],//歌词
      AudioUrl:'',//歌曲 ~ url
      updateCurrentTime:'00:00',//当前时间
      updateDuration:'00:00',//时长
      PowerWidth:'0%',//进度条长度
      BarTouch:'',//点点
    }
  },
  beforeCreate(){
    this.song = this.$store.state.song;
    console.log(this.song);
    this.$http.jsonp('https://api.darlin.me/music/lyric/' + this.$route.query.id, {
          jsonp: 'callback'
        }).then(function (response) {
          console.log('res',response.data);
          if(response.data.code ===0){
            this.$store.state['lyric'] = Base64.decode(response.data.lyric).split('[').slice(5)
            .map(str => { let t = str.split(']')
              return {[t[0]]: [[t[0]], t[1]]}
            }).reduce((a, b) => {
              return {...a, ...b}
            })
            // console.log(this.$store.state.lyric);
            this.lyric =this.$store.state.lyric;
            console.log(this.lyric);
            if(this.song.id === 'undefined'){
              console.log('song1',this.$store.state.song);
              return  this.AudioUrl ='http://ws.stream.qqmusic.qq.com/C400'+this.$store.state.song.data.songid+'.m4a?fromtag=66&guid=9515452293';
            }else{
              console.log('song2',this.$store.state.song)
              return  this.AudioUrl ='http://ws.stream.qqmusic.qq.com/C400'+this.$store.state.song.mid+'.m4a?fromtag=66&guid=9515452293';
              // http://dl.stream.qqmusic.qq.com/C400000Md1wq0vnwzE.m4a?guid=9515452293&vkey=DDE1F7566D76D5A63F0BA27655E6069CFECD9BC0A1A4BC7FDE3E98DBB1C5104B694EC847F96F54C0F499C969E0603481E66428F2EDFD223E&uin=0&fromtag=66
              // http://dl.stream.qqmusic.qq.com/C400004Q0PQm2qkYEK.m4a?guid=9515452293&vkey=D44B6E2269C0B7C4598D6036FA27A7A015DCE54EC8D04BA1D7E0D4C75F385ECDD1E5F12A93867C37447B91B5CEFE615603B0DD682E21F9BD&uin=0&fromtag=66
              // https://u.y.qq.com/cgi-bin/musicu.fcg?callback=getplaysongvkey5395160684430504&g_tk=5381&jsonpCallback=getplaysongvkey5395160684430504&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22req%22%3A%7B%22module%22%3A%22CDN.SrfCdnDispatchServer%22%2C%22method%22%3A%22GetCdnDispatch%22%2C%22param%22%3A%7B%22guid%22%3A%229515452293%22%2C%22calltype%22%3A0%2C%22userip%22%3A%22%22%7D%7D%2C%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%229515452293%22%2C%22songmid%22%3A%5B%22004Q0PQm2qkYEK%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%220%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A0%2C%22format%22%3A%22json%22%2C%22ct%22%3A20%2C%22cv%22%3A0%7D%7D
              // https://u.y.qq.com/cgi-bin/musicu.fcg?callback=getplaysongvkey9907354691249837&g_tk=5381&jsonpCallback=getplaysongvkey9907354691249837&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22req%22%3A%7B%22module%22%3A%22CDN.SrfCdnDispatchServer%22%2C%22method%22%3A%22GetCdnDispatch%22%2C%22param%22%3A%7B%22guid%22%3A%229515452293%22%2C%22calltype%22%3A0%2C%22userip%22%3A%22%22%7D%7D%2C%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%229515452293%22%2C%22songmid%22%3A%5B%22000Md1wq0vnwzE%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%220%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A0%2C%22format%22%3A%22json%22%2C%22ct%22%3A20%2C%22cv%22%3A0%7D%7D
            }
          }
        })

  },
  watch:{
    // song(song){
    //   console.log(song);
    // }
  },
  mounted () {
  },
  created(){

  },
  methods:{
    updateTime() {
        var Music = document.getElementById('music');//获取元素
        if(Music.currentTime&&Music.duration){
          var CurrentTime =Music.currentTime;
          var Duration=Music.duration;//(当前时间 ，持续时间)
          this.updateCurrentTime = (parseInt(CurrentTime / 60)>9?parseInt(CurrentTime / 60):'0'+parseInt(CurrentTime / 60))+':'+(parseInt(CurrentTime%60)>9?parseInt(CurrentTime%60):'0'+parseInt(Music.currentTime%60));
          this.updateDuration = (parseInt(Duration / 60)>9?parseInt(Duration / 60):'0'+parseInt(Duration / 60))+':'+(parseInt(Duration%60)>9?parseInt(Duration%60):'0'+parseInt(Duration%60));
          var BarTouch = document.getElementById('BarTouch').offsetWidth;
          var progress = document.getElementById('progress').offsetWidth;
          this.PowerWidth = (CurrentTime/Duration)*progress+'px';
          this.BarTouch =(CurrentTime/Duration)*(progress - BarTouch)+'px'
        }
    },
    TimeClass(Time){
      if(Time.indexOf('offset:')!==-1){return 'Start';}
      Time = Time.toString();
      var time1 =Time.split(':');
      var time2 =time1[1].split('.');
      Time = Number(time1[0])*60+ Number(time2[0])+parseInt(time2[1])/100;
      return Time.toString();
    },

  }
}
</script>



