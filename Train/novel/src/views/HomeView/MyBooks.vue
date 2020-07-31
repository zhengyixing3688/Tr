<template>
  <div class="mybooks">

    <van-nav-bar title="书架" left-text="返回"
      left-arrow @click-left="back">
     
    </van-nav-bar>
    <div v-if="isShow" class="bookrack-content content-1">
      <div class="imgBox">
        <img class="auto-img" src="../../assets/images/books.png" alt="图片未加载..." />
      </div>

      <p class="text">阅读变成一种习惯</p>
      <p class="text">也是一种享受</p>
      <p class="text">去书城逛逛吧</p>
    </div>
    <div v-else class="bookrack-content">
      <div class="book-box clearfix" @click="SkipDetail(arrs._id)" v-for="(arrs,index) in arrA" :key="index">
        <div class="img-box fl">
          <img v-lazy="imgKey(arrs.cover)" alt="图片加载ing..." />
        </div>
        <div class="text fl">
          <h3>{{arrs.title}}</h3>
          <div class="ify-l">
            分类:
            <span>{{arrs.majorCate}}</span> /
            <span>{{arrs.minorCate}}</span>
          </div>
        </div>
        <div class="del fr" @click.stop="deleteArr(index)">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrA: [],
      isShow: true,
    };
  },
  methods: {
    goDetail() {
      this.$router.go(-1);
    },
    Tjarr() {
      this.arrA=this.$store.state.MyBooksArr;
      console.log(this.arrA, "--");
      if (this.arrA.length != "") {
        this.isShow = false;
      }
      // window.localStorage.setItem(
      //   "arrA",
      //   JSON.stringify({
      //     expire: Date.now() + 1 * 60 * 60 * 1000,
      //     result: this.$store.state.MyBooksArr,
      //   })
      // );
      // console.log(this.arrA);
    },
    // 删除arrA
    deleteArr(index) {
      // console.log(index,'--')
      if (this.arrA.length == 0) {
        this.isShow = true;
      }
      this.arrA.splice(index, 1);
    },
    // 跳转到detail
    SkipDetail(id){
        this.$router.push({name:'Detail',query:{id}})
    },
    //解密图片
    imgKey(value) {
      return unescape(value).slice(7);
    },
    back(){
      this.$router.go(-1)
    }
  },
  created() {
    this.Tjarr();
    // const cacheArr = JSON.parse(window.localStorage.getItem("arrA"));
    // if (cacheArr && cacheArr.expire > Date.now()) {
    //   // 存在并且还没有过期
    //   this.arrA = cacheArr.result;
    // } else {
    //   // 已经过期
    //   this.Tjarr();
    // }
    // console.log(this.arrA);
  },
};
</script>

<style lang="less" scoped>
.bookrack-content {
  .book-box {
    height: 100px;
    margin: 10px 10px;
    background-color: #fff;
    .img-box {
      height: 80px;
      width: 70px;
      margin: 10px 10px;
      background-color: linen;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      width: calc(~"100% - 140px");
      h3 {
        font-size: 15px;
      }
      .ify-l {
        color: #999;
      }
    }
    .del {
      width: 30px;
      height: 20px;
      font-size: 6px;
      color: #999;
      text-align: right;
      margin-right: 6px;
    }
  }
}
.content-1 {
  text-align: center;
  font-size: 16px;
  padding-bottom: 50px;
  height: 100%;
  padding: 15px 20px;
  .imgBox {
    width: 144px;
    height: 144px;
    margin: 160px auto 0;
  }
  .text {
    text-align: center;
    color: lightsteelblue;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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