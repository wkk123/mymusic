import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        songlistInfo: [], // 获取该大类歌曲列表 与 第一首歌的信息
        songlist: [], // 歌曲列表
        index: 0, // 第几首歌曲
        song: { //歌曲
            id: null,
            mid: null,
            name: null,
            singer: null
        },
        playList: [], //当前
    },
    mutations: {
        // 计算  歌曲 信息 与列表
        setCountList(state, data) {
            state.songlist = data.songlist;
            state.songlistInfo = data.songlistInfo;
        },
        setPlayList(state, playList) {
            console.log('1', state, playList);
            state.index = playList.index;
            if (playList.songlist[playList.index].data) {
                state.playList.push({
                    'id': playList.songlist[state.index].data.songid,
                    'mid': playList.songlist[state.index].data.songmid,
                    'name': playList.songlist[state.index].data.songname,
                    'singer': playList.songlist[state.index].data.singer[0].name
                })
            } else if (playList.songlist[playList.index].musicData) {
                state.playList.push({
                    'id': playList.songlist[state.index].musicData.songid,
                    'mid': playList.songlist[state.index].musicData.songmid,
                    'name': playList.songlist[state.index].musicData.songname,
                    'singer': playList.songlist[state.index].musicData.singer[0].name
                })
            } else if (playList.songlist[playList.index].belongCD) {
                state.playList.push({
                    'id': playList.songlist[state.index].songid,
                    'mid': playList.songlist[state.index].songmid,
                    'name': playList.songlist[state.index].songname,
                    'singer': playList.songlist[state.index].singer[0].name
                })
            } else {
                state.playList.push(playList.songlist[state.index])
            }
            state.song = state.playList[state.playList.length - 1]
        },
    }
})