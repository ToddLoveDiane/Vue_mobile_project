<template>
  <div class="home">
    <!-- 头部 -->
    <van-nav-bar title="首页" />
    <!-- channel -->
    <van-tabs v-model="myactive">
      <van-tab v-for="(item,index) in channelList" :key="index" :title="item.name">
        <!-- 下拉刷新组件 -->
        <van-pull-refresh v-model="item.refreshloading" @refresh="onRefresh(item)">
          <!-- 列表组件 -->
          <van-list
            v-model="item.uploading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(data,index) in item.articlelist" :key="index" :title="data.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- icon -->
      <div class="myicon" slot="nav-right" @click="showModel">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出框 -->
    <van-popup @click="showModel" v-model="show" position="bottom" :style="{ height: '80%' }">
      <van-grid>
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { userchannel } from "@/api/channel";
import { getArticle } from "@/api/articleList";
export default {
  data() {
    return {
      myactive: 0,
      show: false,
      channelList: []
    };
  },
  methods: {
    //上拉刷新load
    async onLoad() {
      //页面一进来就会默认加载onload事件,下拉刷新调用,上拉触底调用
      //1.获取当前频道的对象
      let mychannel = this.channelList[this.myactive];
      let channel_id = mychannel.id;
      //2.判断是否为第一次刷新,请求的历史时间戳为0,没有刷新
      if (mychannel.pre_timestamp === 0) {
        //没有刷新就请求数据
        let res = await getArticle({
          channel_id: channel_id,
          timestamp: Date.now(),
          with_top: 1
        });
        mychannel.articlelist = res.results;
        //动态刷新channellist
        this.channelList = [...this.channelList];
        //设置时间戳
        mychannel.pre_timestamp = res.pre_timestamp;
        //默认刷新
        mychannel.refreshloading = false;
        mychannel.uploading = false;
      } else {
        let res = await getArticle({
          channel_id: channel_id,
          timestamp: mychannel.pre_timestamp,
          with_top: 1
        });
        //往数组中添加数据
        mychannel.articlelist = [...mychannel.articlelist, ...res.results];
        //动态刷新数据
        this.channelList = [...this.channelList];
        //继续设置时间戳
        mychannel.pre_timestamp = res.pre_timestamp;
        //默认刷新
        mychannel.refreshloading = false;
        mychannel.uploading = false;
      }
    },
    //下拉刷新
    async onRefresh(item) {
      //拿到当前频道的id
      let mychannel = this.channelList[this.myactive];
      mychannel.articlelist = [];
      mychannel.finished = false;
      mychannel.uploading = false;
      mychannel.pre_timestamp = 0;
      //手动加载数据
      let res = await getArticle({
        channel_id: mychannel.id,
        timestamp: Date.now(),
        with_top: 1
      });
      mychannel.article = res.results;
      mychannel.pre_timestamp = res.pre_timestamp;
      mychannel.refreshLoading = false;
      this.channelList = [...this.channelList];
    },
    //获取频道数据
    async getChannel() {
      //拿到所有的数据
      let res = this.$store.state;
      if (res) {
        let user = await userchannel();
        this.channelList = user.channels;
      } else {
        //没有登录,查看缓存中是否有
        let user = JSON.parse(window.localStorage.getItem("channel"));
        if (user) {
          //如果有设置,就直接赋值
          this.channelList = user;
        } else {
          //没登录没设置
          let user = await userchannels();
          this.channelList = user.channels;
        }
      }
      //动态添加属性
      this.setData();
    },
    //动态添加属性
    setData() {
      this.channelList.forEach(item => {
        item.articlelist = [];
        item.uploading = false;
        item.refreshloading = false;
        item.finished = false;
        item.pre_timestamp = 0;
      });
    },
    // 将弹出层显示
    showModel() {
      this.show = true;
    }
  },
  mounted() {
    this.getChannel();
  }
};
</script>

<style lang='less' scoped>
.home {
  margin-bottom: 90px;
  margin-top: 50px;
}
.home /deep/ .van-tabs__wrap {
  position: fixed;
  top: 50px;
  z-index: 999;
  left: 0px;
  width: 90%;
}
.myicon {
  position: fixed;
  top: 63px;
  right: 10px;
}
.van-cell {
  height: 100px;
}
</style>