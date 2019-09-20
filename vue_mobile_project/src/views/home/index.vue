<template>
  <div class="home">
    <!-- 头部 -->
    <van-nav-bar title="首页" />
    <!-- channel -->
    <van-tabs v-model="myactive">
      <van-tab v-for="(item,index) in channelList" :key="index" :title="item.name">
        <!-- 下拉刷新组件 -->
        <van-pull-refresh v-model="item.refreshloading" @refresh="onRefresh(item)">
          <!-- list组件 -->
          <van-list
            v-model="item.uploading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(data,index) in item.articlelist" :key="index" :title="data.title">
              <!-- data为undefined原因是没有把下面遍历的结构放到cell里面,把单标签改为双标签即可 -->
              <template slot="label">
                <van-grid v-if="data.cover.type>0" :border="false" :column-num="3">
                  <van-grid-item v-for="(image,index) in data.cover.images" :key="index">
                    <van-image :src="image" lazy-load />
                  </van-grid-item>
                </van-grid>
                <!-- 下面是品论 -->
                <!-- 下方的span -->
                <div class="mymess">
                  <div class="left">
                    <span>{{ data.aut_name }}</span>
                    <span>评论 {{ data.comm_count}}</span>
                    <span>{{ data.pubdate | timeformat}}</span>
                  </div>
                  <div class="right">
                    <van-icon name="close" @click="showDialog(data.aut_id,data.art_id)" />
                    <!-- 这里可以传入作者和文章的id -->
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- icon -->
      <div class="myicon" slot="nav-right" @click="showModel">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 对话框,接受子组件传过来的值 -->
    <mydialog v-model="hideDialog" @hideEle="hideEle" :authorId="authorId" :articleId="articleId"></mydialog>
  </div>
</template>

<script>
import { userchannel } from "@/api/channel";
import { getArticle } from "@/api/articleList";
import mydialog from "@/views/home/dialog";
export default {
  data() {
    return {
      myactive: 0,
      show: false,
      channelList: [],
      hideDialog: false,
      authorId: 0,
      articleId: 0
    };
  },
  components: { mydialog },
  methods: {
    //上拉刷新load
    async onLoad() {
      //页面一进来就会默认加载onload事件,下拉刷新调用,上拉触底调用
      //1.获取当前频道的对象
      let mychannel = this.channelList[this.myactive];
      let channel_id = mychannel.id;
      //如果为null说明数据不存在,设置属性
      if (mychannel.pre_timestamp === null) {
        mychannel.finished = true;
        mychannel.uploading = false;
        return;
      }
      //2.判断是否为第一次刷新,请求的历史时间戳为0,没有刷新
      if (mychannel.pre_timestamp === 0) {
        //没有刷新就请求数据
        let res = await getArticle({
          channel_id: channel_id,
          timestamp: Date.now(),
          with_top: 1
        });
        console.log(res);

        mychannel.articlelist = res.results;
        //动态刷新channellist
        this.channelList = [...this.channelList];
        //设置时间戳
        mychannel.pre_timestamp = res.pre_timestamp;
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
        //继续设置时间戳:这是切换频道时保证时间戳不为Null
        mychannel.pre_timestamp = res.pre_timestamp;
      }
      mychannel.refreshloading = false;
      mychannel.uploading = false;
    },
    //下拉刷新
    async onRefresh(item) {
      //拿到当前频道的id
      let mychannel = this.channelList[this.myactive];
      //每次下拉刷新就清空数组,重新渲染数据
      this.$set(mychannel, "articlelist", []);
      this.$set(mychannel, "finished", false);
      this.$set(mychannel, "uploading", false);
      this.$set(mychannel, "pre_timestamp", 0);
      this.onLoad();
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
      //forEach动态遍历属性
      this.channelList.forEach(item => {
        this.$set(item, "articlelist", []);
        this.$set(item, "uploading", false);
        this.$set(item, "refreshloading", false);
        this.$set(item, "finished", false);
        this.$set(item, "pre_timestamp", 0);
      });
    },
    // 将弹出层显示
    showModel() {
      this.show = true;
    },
    //传值给dialog组件
    showDialog(autId, artId) {
      this.authorId = autId;
      this.hideDialog = true;
      this.articleId = artId;
    },
    //删除文章
    hideEle(artId) {
      let res = this.channelList[this.myactive].article;
      console.log(res);
      //先遍历数组
      article.forEach(item, index => {
        //id相等则删除
        if (item.art_id === artId) {
          res.splice(index, 1);
          return;
        }
      });
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

.mymess {
  display: flex;
  justify-content: space-between;
  .left {
    span {
      margin-right: 10px;
    }
  }
}
</style>