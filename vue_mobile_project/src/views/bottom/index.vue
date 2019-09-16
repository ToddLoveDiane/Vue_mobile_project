<template>
  <div>
    <!-- 因为下面的内容是固定的，单独抽取成组件，四个页面要用到同一个 bottom 
    在 bottom 中添加子路由容器 --->
    <!-- 利用home页面来渲染这个组件 -->
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style>
</style>