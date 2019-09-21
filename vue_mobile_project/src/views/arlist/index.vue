<template>
  <div class="list">
    <!-- 导航头部 -->
    <van-nav-bar fixed title="搜索列表" left-arrow @click-left="$router.back()" />
    <!-- router.back回到上一个页面 -->
    <div id="top"></div>
    <!-- 列表集合 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
      <van-cell-group>
        <van-cell :title="item.aut_name" v-for="(item, index) in dataList" :key="index">
          <template slot="label">
            <div @click="toDetail(item.art_id)">{{ item.title }}</div>
            <van-grid :column-num="3">
              <van-grid-item @click="comment" text="评论" />
              <van-grid-item text="点赞" />
              <van-grid-item text="收藏" />
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { searchKey } from "@/api/articleList";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      dataList: [],
      key: this.$route.params.key,
      // 这里的key是对应路由中的key
      page: 0,
      per_page: 10
    };
  },

  methods: {
    async getData() {
      try {
        //刷新下一页
        this.page++;
        let res = await searchKey({
          page: this.page,
          per_page: this.per_page,
          key: this.key
        });
        console.log(res);

        //数组的扩增
        this.dataList = [...this.dataList, ...res.results];
        //判断是否拉完
        if (this.dataList.length === res.total_count) {
          this.finished = true;
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    comment() {
      //判断用户是否登录,如果登录可以,没有登录跳转到登录页面
      this.$login();
    },
    toDetail(art_id) {
      this.$router.push("/detail/" + art_id);
    }
  }
};
</script>

<style lang='less' scoped>
.list {
  margin-top: 46px;
}

.van-nav-bar {
  background: #1989fa;
  z-index: 99 !important;
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}

.van-cell {
  border-bottom: 10px solid #eee;
}

.mylink {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>