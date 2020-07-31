<template>
  <div class="booklist">
     <div class="loading" v-if="showLoading">
      <img src="../assets/loading.svg" />
    </div>
    <van-nav-bar :title="m" @click-left="back" left-text="返回" left-arrow>
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
           @click="goMBooks"
        >
          <path
            d="M264.154 952.655H64.31V224.11h199.844v728.545h-0.001z m-34.2-691.413H98.816v67.142h131.14v-67.142z m96.516-196.7h198.267v888.045H326.47V64.542z m168.989 34.214H360.143v69.235h135.315V98.756z m459.399 794.012L764.845 954.68 539.126 261.973l190.01-61.912 225.722 692.707zM708.125 245.964L583.438 286.59l20.798 63.834 124.686-40.627-20.797-63.833z m0 0"
            p-id="15151"
            fill="#fff"
          />
        </svg>
      </template>
    </van-nav-bar>
    
    <div class="books-list">
      <van-list
            class="popup-list"
            v-model="load.loading"
            :finished="load.finished"
            :finished-text="load.loadingMsg"
            @load="onLoad"
            :offset="50"
      >
      <div class="books-item clearfix" @click="clickSkip(item._id)" v-for="(item,index) in BooksArr" :key="index">
        <div class="img-l fl">
          <img v-lazy="imgKey(item.cover)"/>
        </div>
        <div class="books-r fl">
          <h3>{{item.title}}</h3>
          <div class="bos">
            <span>{{item.author}}</span>
            <span>|</span>
            <span>{{item.majorCate}}</span>
          </div>
          <p>{{item.shortIntro}}</p>
          <div class="rq">
            <span class="s1">
              {{playCountParse(item.latelyFollower)}}
              <span>人气</span>
            </span>
            <span class="s">|</span>
            <span class="s1">
              {{item.retentionRatio}}
              <span>读者留存</span>
            </span>
          </div>
        </div>
      </div>
      </van-list>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      g: this.$route.query.gender,
      m: this.$route.query.major,
      BooksArr:[],
      BooksArrData:[],
      showLoading:false,
      // 默认加载目录数量
      loadCount: 10,
      load: {
        // 是否加载 false表示加载
        // true为停止加载
        loading: true,
        finished: false,
        loadingMsg: "数据加载完毕..."
      }
    };
  },
  methods: {
    InfoData() {
      this.showLoading = true
      this.axios
        .get(
          "http://novel.kele8.cn/category-info?gender="+this.g+"&type=hot&major="+this.m+"&minor=&start=0&limit=200"
        )
        .then((res) => {
           this.showLoading = false
            if(res.status == 200){
                this.BooksArrData = res.data.books
                this.BooksArr = this.BooksArrData.splice(0,this.loadCount)
                console.log(res)
                if(this.BooksArrData.length > 0){
                  this.load.loading = false;
                }else{
                  this.load.loading = true;
                  this.load.finished = true;
                }
                // 
                window.localStorage.setItem("BooksArr",JSON.stringify({
                  expire:Date.now() + 1 * 60 *60 * 1000,
                  result:res.data.books
                }))
            }
            
          console.log(res, "-------resInfoData");
        })
        .catch((err) => {
          this.showLoading = false
          console.log(err, "======err");
        });
    },
    // 懒加载
    onLoad(){
      setTimeout(() =>{
        this.BooksArr.push(...this.BooksArrData.splice(0,this.loadCount));
        this.load.loading = false;
        // 如果没数据停止加载
        if(this.BooksArrData.length == 0){
          this.load.loading = true;
          this.load.finished = true;
        }
        console.log(this.BooksArr.length,'-=')
      },1000)
    },
    //解密图片
    imgKey(value) {
      return unescape(value).slice(7);
    },
    // 计算
    playCountParse: function(n) {
      if (n > 100000000) {
        return (n / 100000000).toFixed(1) + "亿";
      }
      if (n > 5000) {
        return (n / 10000).toFixed(1) + "万";
      }
    },
    clickSkip(id){
        this.$router.push({name:'Detail',query:{id}})
    },
    goMBooks(){
      this.$router.push({name:'MyBooks'})
    },
    back() {
      this.$router.push({ name: "Home" });
    },
  },
  created() {
      this.InfoData()
      const cacheBooksArr = JSON.parse(window.localStorage.getItem('BooksArr'))
      if(cacheBooksArr && cacheBooksArr.expire > Date.now()){
        // 存在并没过期
        this.BooksArr = cacheBooksArr.result
      }else{
         this.InfoData()
      }
    // console.log(this.g,this.m)
  },
};
</script>

<style lang="less" scoped>
.booklist{
    height: 100%;
}
.books-list {
    height: calc(~"100% - 46px");
    overflow-y: auto;
  .books-item {
    height: 110px;
    margin: 8px 8px;
    // background-color: #fff;
    border-bottom: 1px solid linen;
    .img-l {
      height: 100px;
      width: 80px;
      background: rgb(247, 217, 217);
      img {
        height: 100%;
        width: 100%;
      }
    }
    .books-r {
      margin-left: 10px;
      margin-top: 4px;
      width: calc(~"100% - 100px");
      h3 {
        margin: 0;
        color: #333;
        font-size: 14px;
      }
      .bos {
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
}
/deep/ .van-list__loading{
  line-height: 24px;
}
/deep/ .van-list__finished-text{
  line-height: 24px;
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