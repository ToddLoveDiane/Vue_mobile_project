<template>
  <div class="detail_top">
    <!-- 头部 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 标题 -->
    <van-cell>
      <template slot="title">
        <div class="mytitle">{{articleList.title}}</div>
      </template>
    </van-cell>
    <!-- 用户信息 -->
    <user :obj="articleList"></user>
    <!-- 文章内容不需要抽取 -->
    <van-cell>
      <template slot="title">
        <div class="article" v-html="articleList.content"></div>
      </template>
    </van-cell>
    <!-- 点赞和喜欢按钮 -->
    <likebtn :obj="articleList"></likebtn>
    <!--评论专区 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadComment">
      <div v-for="(item, index) in commentList" :key="index">
        <comment :arComment="item"></comment>
      </div>
    </van-list>

    <!-- 发送文章评论专区 -->
    <inputarea :obj="articleList" @getMyData="articleData"></inputarea>
  </div>
</template>

<script>
import user from "@/views/detail/components/user";
import likebtn from "@/views/detail/components/likebtn";
import comment from "@/views/detail/components/comment";
import inputarea from "@/views/detail/components/inputarea";
import { getDetail } from "@/api/articleList";
import { getComment } from "@/api/comment";

export default {
  components: {
    user,
    likebtn,
    comment,
    inputarea
  },
  data() {
    return {
      loading: false,
      finished: false,
      artId: this.$route.params.art_id,
      // 保存文章的详情
      articleList: {},
      //保存评论
      commentList: []
    };
  },
  methods: {
    //一进来就请求文章数据
    async getArticleDetail() {
      try {
        let res = await getDetail(this.artId);
        console.log(res);
        this.articleList = res;
      } catch (error) {
        this.$toast.fail("网络超时,请重新加载哦");
      }
    },
    //获取文章评论数据
    loadComment() {
      console.log(111);
    },
    articleData(value) {
      this.commentList.unshift({
        ...value.new_obj,
        art_id: value.art_id,
        com_id: value.com_id
      });
      //解构对象,并且添加2个新的属性
      console.log(111111);
      console.log(this.commentList);
      
      
    }
  },
  mounted() {
    this.getArticleDetail();
    this.articleData()
  }
};
</script>

<style lang='less' scoped>
.detail_top {
  margin-top: 46px;
  margin-bottom: 90px;
}

.van-nav-bar {
  background: #1989fa;
  z-index: 99 !important;
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}
.mytitle {
  font-size: 23px;
  font-weight: 700;
}
</style>