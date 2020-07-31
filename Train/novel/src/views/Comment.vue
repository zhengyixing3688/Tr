<template>
  <div class="comment">
    <div class="loading" v-if="showLoading">
      <img src="../assets/loading.svg" />
    </div>
    <van-nav-bar :title="tit" @click-left="backs" left-text="返回" left-arrow></van-nav-bar>
    <!--  -->
    <div class="assess">
      <van-list
        class="popup-list"
        v-model="load.loading"
        :finished="load.finished"
        :finished-text="load.loadingMsg"
        @load="onLoad"
        :offset="50"
      >
        <div
          class="assess-list clearfix"
          @click="ComDetail(i._id)"
          v-for="(i,index) in shortRevi"
          :key="index"
        >
          <div class="assess-l fl">
            <img v-lazy="imgKey(i.book.cover)" />
          </div>
          <div class="assess-r fl">
            <div class="assess-name">{{i.author.nickname}}</div>
            <div class="assess-text">{{i.content}}</div>
          </div>
        </div>
        <!-- <div
          class="assess-list clearfix"
        >
          <div class="assess-l fl">
            <img  />
          </div>
          <div class="assess-r fr">
            <div class="assess-name">----</div>
            <div class="assess-text">====</div>
          </div>
        </div> -->
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoading: false,
      id: this.$route.query.id,
      tit: this.$route.query.tit,
      shortRevi: [],
      shortReviDat: [],
      // 默认加载目录数量
      loadCount: 10,
      load: {
        // 是否加载 false表示加载
        // true为停止加载
        loading: true,
        finished: false,
        loadingMsg: "数据加载完毕...",
      },
    };
  },
  methods: {
    backs() {
      this.$router.go(-1);
    },
    // 评论
    MakeShort() {
      this.axios
        .get("http://novel.kele8.cn/book/short-reviews?book=" + this.id)
        .then((res) => {
          console.log(res, "0000000000res");
          if (res.status == 200) {
            this.shortReviDat = res.data.docs;
            this.shortRevi = this.shortReviDat.splice(0, this.loadCount);
            if (this.shortReviDat.length > 0) {
              this.load.loading = false;
            } else {
              this.load.loading = true;
              this.load.finished = true;
            }
          }
        })
        .catch((err) => {
          console.log(err, "0---------err");
        });
    },
    // 懒加载
    onLoad() {
      setTimeout(() => {
        this.shortRevi.push(...this.shortReviDat.splice(0, this.loadCount));
        this.load.loading = false;
        if (this.shortReviDat.length == 0) {
          this.load.loading = true;
          this.load.finished = true;
        }
      }, 1000);
    },
    //解密图片
    imgKey(value) {
      return unescape(value).slice(7);
    },
  },
  created() {
    this.MakeShort();
    console.log(this.id, "-");
  },
};
</script>

<style lang="less" scoped>
body{
    height: 100%;
}

.comment {
  height: 100%;
  width: 100%;
  position: fixed;
  .assess {
    height: calc(~"100% - 50px");
    overflow-y: auto;
    .popup-list {
      height: 100%;
      .assess-list {
        // height: 100%;
        // height: 63px;
        // max-height: 66px;
        background-color: #fff;
        padding: 10px 0;
        border-radius: 15px;
        margin: 8px 10px;
        border: 1px solid linen;
        .assess-l {
          width: 60px;
          height: 60px;
          margin: 3px 2px;
          border-radius: 50%;
          background: #999;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .assess-r {
          margin-left: 16px;
          height: 100%;
          width: calc(~"100% - 80px");
          .assess-name {
            font-size: 10px;
            color: #999;
            padding: 0 0 10px;
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .assess-text {
            width: 100%;
            height: 100%;
           
          }
        }
      }
    }
  }
}
/deep/ .van-list__loading {
  line-height: 24px;
}
/deep/ .van-list__finished-text {
  line-height: 24px;
}

/deep/ .van-nav-bar {
  background-color: rgb(250, 98, 98);
}
/deep/ .van-nav-bar__text {
  color: #fff;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-icon-arrow-left {
  color: #fff;
}
</style>