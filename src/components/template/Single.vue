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
      <div class="bar_time" :class="{active:true}"><span>{{'00:00'}}</span></div>
      <div class="bar_progress">
        <div class="bar_power">
          <div class="bar_touch"></div>
        </div>
      </div>
      <div class="bar_time"><span>{{'00:00'}}</span></div>
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
          <div class="img_box"></div>
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
              return  this.AudioUrl ='http://ws.stream.qqmusic.qq.com/C100'+this.$store.state.song.data.songid+'.m4a?fromtag=0&guid=126548448';
            }else{
              console.log('song2',this.$store.state.song)
              return  this.AudioUrl ='http://ws.stream.qqmusic.qq.com/C100'+this.$store.state.song.mid+'.m4a?fromtag=0&guid=126548448';
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
    // console.log(this.$store.state);
    this.TimeClass('00:00.40');
  },
  methods:{
    updateTime () {
        var Music = document.getElementById('music');//获取元素
        var updateCurrentTime,updateDuration//(当前时间 ，持续时间)
        updateCurrentTime = (parseInt(Music.currentTime / 60)>9?parseInt(Music.currentTime / 60):'0'+parseInt(Music.currentTime / 60))+':'+(parseInt(Music.currentTime%60)>9?parseInt(Music.currentTime%60):'0'+parseInt(Music.currentTime%60));
        updateDuration = (parseInt(Music.duration / 60)>9?parseInt(Music.duration / 60):'0'+parseInt(Music.duration / 60))+':'+(parseInt(Music.duration%60)>9?parseInt(Music.duration%60):'0'+parseInt(Music.duration%60));
        // console.log(updateCurrentTime,updateDuration);
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



