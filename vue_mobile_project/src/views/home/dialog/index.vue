<template>
  <van-dialog :value="value" @input="$emit('input',$event)" :showConfirmButton="false">
    <van-cell-group v-if="!isShow">
      <van-cell title="隐藏文章" @click="hideAr" />
      <van-cell title="举报" is-link @click="isShow=true" />
      <van-cell title="拉黑" />
    </van-cell-group>
    <!-- 举报的内容 -->
    <van-cell-group v-if="isShow">
      <van-cell icon="arrow-left" @click="isShow=false" />
      <van-cell
        @click="repArticle(item.value)"
        v-for="(item, index ) in itemList"
        :key="index"
        :title="item.name"
        icon="fire-o"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { hideArticle, reportArticlem, blackList } from "@/api/articleList";
export default {
  props: ["value", "authorId", "articleId"],
  data() {
    return {
      itemList: [
        { value: 0, name: "其他问题" },
        { value: 1, name: "标题夸张" },
        { value: 2, name: "低俗色情" },
        { value: 3, name: "错别字多" },
        { value: 4, name: "旧闻重复" },
        { value: 5, name: "广告软文" },
        { value: 6, name: "内容不实" },
        { value: 7, name: "涉嫌违法犯罪" },
        { value: 8, name: "侵权" }
      ],
      isShow: false
    };
  },
  methods: {
    //点击隐藏文章
    async hideAr() {
      try {
        //发送请求,拿到数据
        await hideArticle(this.articleId);
        //将需要隐藏的这个id传回给Home组件,这样下次刷新就不会出现
        this.$emit("hideEle", this.articleId);
        //隐藏成功
        this.$toast.success("隐藏成功!");
      } catch (error) {
        this.$toast.fail("隐藏失败!");
      } finally {
        this.$emit("input", false);
        //这个是隐藏dialog
      }
    },
    //举报文章
    async repArticle(value) {
      try {
        await reportArticle({
          target: this.articleId,
          type: value
        });
        this.$toast.success("举报成功!");
      } catch (error) {
        //错误有两条,如果已经举报过了就要提示不要重复举报
        if (error.message.indexOf("409")) {
          this.$toast.fail("该文章已被您举报,请勿重试!");
        } else {
          this.$toast.fail("举报失败");
        }
      } finally {
        //隐藏面板,并关闭更多功能
        this.isShow = false;
        this.$emit("input", false);
      }
    },
    //拉黑文章
    async doBlack() {
      try {
        await blackList(this.authorId);
        this.$toast.success("拉黑成功!");
      } catch (error) {
        this.$toast.fail("拉黑失败!");
      } finally {
        //隐藏面板
        this.$emit("input", false);
      }
    }
  }
};
</script>

<style>
</style>