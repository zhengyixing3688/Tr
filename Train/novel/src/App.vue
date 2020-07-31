<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(to  bottom, rgb(235, 224, 224) , rgb(233, 233, 230));
  // /deep/ .van-nav-bar__title {
  //   color: #fff;
  // }
  // /deep/ .van-nav-bar__text,
  // /deep/ .van-nav-bar .van-icon {
  //   color: #fff;
  // }
  // 搜索框样式
  .van-search__content {
    border-radius: 20px;
    box-shadow: inset 1px 1px 2px 1px #ddd;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .van-field__left-icon .van-icon {
    color: red;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 120px;
    text-align: center;
  }
  .auto-img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .clearfix::after {
    display: block;
    content: "";
    clear: both;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(245, 173, 173, 0.3);
  display: flex;
  z-index: 999;
  justify-content: center;
  align-items: center;
  img {
    width: 38px;
  }
}
/deep/ .van-list__loading{
  line-height: 24px;
}
/deep/ .van-list__finished-text{
  line-height: 24px;
}
</style>
