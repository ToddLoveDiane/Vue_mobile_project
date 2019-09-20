<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(keyword)"
      bind:cancel="onCancel"
    />
    <!-- 模糊检索显示 -->
    <van-cell-group v-if="keywordList.length !==0">
      <van-cell
        @click="onSearch(item.item)"
        v-for="(item, index) in keywordList"
        :key="index"
        icon="search"
      >
        <!-- 这里是单标签,上面的值取不到 -->
        <template slot="title">
          <div v-html="item.colorItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell title="历史搜索">
        <template slot="right-icon">
          <van-icon name="delete" @click="delAll" />
        </template>
      </van-cell>
      <!-- 搜索结果的渲染 -->
      <van-cell
        @click="onSearch(item)"
        v-for="(item, index) in keyStorage"
        :key="index"
        :title="item"
        icon="search"
      >
        <template slot="right-icon">
          <van-icon name="close" @click="delOne" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { likeKeyWord } from "@/api/articleList";
export default {
  data() {
    return {
      keyword: "",
      //用来保存数据
      keywordList: [],
      //如果有就拿出来,没有就为空
      keyStorage: JSON.parse(window.localStorage.getItem("search")) || [],
      //定时器
      timer: null,
      //是否展示
      isShow: false
    };
  },
  methods: {
    //1.数据的渲染,搜索的防抖,关键词的高亮,点击删除单条,全部,点击搜索历史发送请求,自动置顶
    onSearch(keyword) {
      //1.置顶的操作
      this.keyStorage.unshift(keyword);
      //2.去重
      //   this.keyStorage = Array.from(set(this.keyStorage));
      this.keyStorage = [...new Set(this.keyStorage)];
      //3.保存到本地
      window.localStorage.setItem("search", JSON.stringify(this.keyStorage));
      //
    },
    delAll() {
      this.keyStorage = [];
      window.localStorage.setItem("search", JSON.stringify(this.keyStorage));
    },
    delOne(index) {
      this.keyStorage.splice(index, 1);
      window.localStorage.setItem("search", JSON.stringify(this.keyStorage));
    }
  },
  watch: {
    keyword: function(val, oldVal) {
      //如果在2s内再次进入计时器
      if (this.timer) {
        clearTimeout(this.timer);
      }
      //防抖
      this.timer = setTimeout(async () => {
        //1.去掉空格以后的字符串长度
        if (!val.trim().length) {
          this.keywordList = [];
          return;
        }
        //2.发送请求到服务器,拿到数据渲染
        let res = await likeKeyWord(val);
        this.keywordList = res.options;
        //3.遍历对象
        this.keywordList = this.keywordList.map(item => {
          return {
            // 包含 span
            colorItem: item
              .split(val)
              .join(`<span style="color: aqua">${this.keyword}</span>`),
            // 不包含 span
            item: item
          };
        });
      }, 500);
    }
  }
};
</script>

<style>
</style>