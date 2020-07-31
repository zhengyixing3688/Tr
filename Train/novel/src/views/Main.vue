<template>
  <div>
    <van-tabbar v-model="current" @change="toggleTab" active-color="red" inactive-color="black">
      <van-tabbar-item
        :icon="item.icon"
        v-for="(item , index) in tabData"
        :key="index"
      >{{item.title}}</van-tabbar-item>
    </van-tabbar>
    <!--  -->
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar> -->

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      tabData: [
        {
          title: "首页",
          icon: "wap-home-o",
          name: "Home",
          url: "/main/home",
        },
        {
          title: "书架",
          icon: "smile-o",
          name: "MyBooks",
          url: "/main/mybooks",
        },
        {
          title: "排行榜",
          icon: "apps-o",
          name: "RankingList",
          url: "/main/rankinglist",
        },
        {
          title: "搜索",
          icon: "search",
          name: "Search",
          url: "/main/search",
        },
      ],
    };
  },
  created() {
    let hash = location.hash.slice(1);
    for (let i = 0; i < this.tabData.length; i++) {
      if (this.tabData[i].url == hash) {
        this.current = i;
        break;
      }
    }
  },
  methods: {
    toggleTab(index) {
      this.$router.push({ name: this.tabData[index].name });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-tabbar--fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
}
/deep/ .van-tabbar-item {
  float: left;
}
</style>