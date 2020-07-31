<template>
  <div class="relateto">
    
    <van-nav-bar title="书籍相关" @click-left="backs" left-text="返回" left-arrow>
      <template #right>
        <svg
          t="1594949373600"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="15150"
          width="24"
          height="24"
          @click="SkipMB"
        >
          <path
            d="M264.154 952.655H64.31V224.11h199.844v728.545h-0.001z m-34.2-691.413H98.816v67.142h131.14v-67.142z m96.516-196.7h198.267v888.045H326.47V64.542z m168.989 34.214H360.143v69.235h135.315V98.756z m459.399 794.012L764.845 954.68 539.126 261.973l190.01-61.912 225.722 692.707zM708.125 245.964L583.438 286.59l20.798 63.834 124.686-40.627-20.797-63.833z m0 0"
            p-id="15151"
            fill="#fff"
          />
        </svg>
      </template>
    </van-nav-bar>
    <!--  -->
    <div class="books-item clearfix">
        <div class="img-l fl">
          <img  />
        </div>
        <div class="books-r fl">
          <h3>00</h3>
          <div class="bos">
            <span>==</span>
            <span>|</span>
            <span>000</span>
            <span>zzzzz</span>
          </div>

          <div class="rq">
            <span class="s1">
              aaa
              <span>人气</span>
            </span>
            <span class="s">|</span>
            <span class="s1">
              mmmm
              <span>读者留存</span>
            </span>
          </div>
          <div class="ify">
            分类:
            <span>玄幻</span> /
            <span>东方玄幻</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            tit:this.$route.query.item
        }
    },
    methods:{
        backs(){
            this.$store.state.DelHistory.push(this.tit)
            this.$router.go(-1)
        },
        SkipMB(){
            this.$router.push({name:'MyBooks'})
        }
    }
};
</script>

<style lang="less" scoped>
.books-item {
    height: 110px;
    overflow: hidden;

    // margin-top: 10px;

    border-bottom: 1px solid linen;
    .img-l {
      height: 95px;
      width: 80px;
      margin-left: 20px;
      margin-top: 5px;
      background: rgb(247, 217, 217);
      img {
        height: 100%;
        width: 100%;
      }
    }
    .books-r {
      margin-left: 10px;
      margin-top: 8px;
      width: calc(~"100% - 110px");
      .ify {
        font-size: 10px;
        color: #999;
      }
      h3 {
        margin: 0 0 5px 0;
        color: #333;
        font-size: 14px;
        // margin-bottom: 5px;
      }
      .bos {
        margin: 5px 0;
        span {
          color: #999;
          margin-right: 15px;
        }
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
      }
      .rq {
        margin: 5px 0;
        span {
          color: #999;
        }
        .s1 {
          color: red;
          span {
            color: #999;
          }
        }
        .s {
          margin: 0 10px;
        }
      }
    }
  }

/deep/ .van-nav-bar {
  background-color: rgb(253, 75, 75);
}
/deep/ .van-nav-bar__text {
  color: #fff;
  font-size: 14px;
}
/deep/ .van-nav-bar__title {
  color: #fff;
  font-size: 16px;
}
/deep/ .van-icon-arrow-left {
  color: #fff;
  font-size: 14px;
}
/deep/ .van-nav-bar{
  height: 40px;
}
</style>