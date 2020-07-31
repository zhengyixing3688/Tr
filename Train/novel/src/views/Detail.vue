<template>
  <div class="detail">
    <div class="loading" v-if="showLoading">
      <img src="../assets/loading.svg" />
    </div>
    <van-nav-bar title="书籍详情" @click-left="backs" left-text="返回" left-arrow>
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
    <div class="books-list">
      <div class="books-item clearfix">
        <div class="img-l fl">
          <img v-lazy="imgKey(DetailArr.cover)" />
        </div>
        <div class="books-r fl">
          <h3>{{DetailArr.title}}</h3>
          <div class="bos">
            <span>{{DetailArr.author}}</span>
            <span>|</span>
            <span>{{DetailArr.minorCate}}</span>
            <span>{{playCountParse(DetailArr.wordCount)}}</span>
          </div>

          <div class="rq">
            <span class="s1">
              {{playCountParse(DetailArr.latelyFollower)}}
              <span>人气</span>
            </span>
            <span class="s">|</span>
            <span class="s1">
              {{DetailArr.retentionRatio}}%
              <span>读者留存</span>
            </span>
          </div>
          <div class="ify">
            {{DetailArr.title}}:
            <span>{{DetailArr.majorCate}}</span> /
            <span>{{DetailArr.minorCateV2}}</span>
          </div>
        </div>
      </div>
      <!-- 人气 -->
      <div class="xl-rq">
        <div class="rq-l">
          <p class="p1">追人气</p>
          <p class="p2">{{playCountParse(DetailArr.latelyFollower)}}</p>
        </div>
        <div class="dz-c">
          <p class="p1">读者留存率</p>
          <p class="p2">{{DetailArr.retentionRatio}}%</p>
        </div>
        <div class="ts-r">
          <p class="p1">日更字数/天</p>
          <p class="p2">{{DetailArr.serializeWordCount}}</p>
        </div>
      </div>
      <!--  -->
      <!-- 简介 -->
      <van-row class="about">
        <van-col span="22" offset="1">
          <h3>简介</h3>
          <div class="content" :class="{show:addClass}">{{DetailArr.longIntro}}</div>
          <span v-if="addClass" @click="iconDown" class="iconfont icon-Down fr">
            <img src="../assets/icons-x.png" />
          </span>
          <span v-if="!addClass" @click="iconUp" class="iconfont icon-shangla1 fr">
            <img src="../assets/icons-s.png" />
          </span>
        </van-col>
      </van-row>
      <!-- 目录 -->
      <div class="catalog">
        <van-cell title="目录" is-link @click="isShowFn" />
      </div>
      <!--  -->
      <van-popup class="v-popup" v-model="isShow" round position="bottom">
        <div class="popup-text">目录</div>
        <van-list class="popup-list">
          <div
            class="popup-item"
            :value="ii"
            @click="goEssay(index,DetailArr._id,DetailArr.title)"
            v-for="(i,index) in listlink"
            :key="index"
            :class="ii == index ? 'active' : ''"
          >{{i.title}}</div>
        </van-list>
      </van-popup>
      <!-- 热门评价 -->
      <div class="assess">
        <div class="pl clearfix">
          <h3 class="fl">热门评价</h3>
          <div class="sx fr">
            <span class="s" @click="MakeShort()">换一批</span>
            <i class="i">
              <img src="../assets/sx.png" />
            </i>
          </div>
        </div>

        <div
          class="assess-list clearfix"
          @click="ComDetail(id,i.book.title)"
          v-for="(i,index) in arrNews"
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
        <!--  -->

        <!--  -->
      </div>
      <!-- 推荐 -->
      <div class="recommd">
        <div class="rec-tit clearfix">
          <h3 class="fl h3">你可能感兴趣</h3>
          <h3 class="rec-gd fr" @click="ClickMore(id)">更多</h3>
        </div>
        <div class="content">
          <div class="recon-cont" @click.stop="dj(i._id)" v-for="(i,index) in SpliceTasteArr" :key="index">
            <div class="img">
              <img v-lazy="imgKey(i.cover)" />
            </div>
            <p>{{i.title}}</p>
          </div>
          <!--  -->
          <!--  -->
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="foot" v-if="DetailArr.length != 0">
      <span
        class="addBook"
        :value="ii"
        :class="bs == true ? 'active' : ''"
        @click="myBooksTj(ii)"
      >＋加书架</span>
      <span class="look" @click="SkipEassy(DetailArr._id,DetailArr.title)">开始阅读</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      isActive: false,
      addClass: true,
      // 是否显示目录
      isShow: false,
      DetailArr: [],
      mlArr: [],
      ii: 0,
      bs: false,
      listlink: [],
      showLoading: false,
      shortRevi: [],
      arrNews: null,
      TasteArr:[],
      SpliceTasteArr:[],
      // arr:this.$store.state.MyBooksArr
    };
  },
  methods: {
    backs() {
      this.$router.go(-1);
    },
    // 显示目录
    isShowFn() {
      this.isShow = true;
    },
    //书籍详情
    DetailData(id) {
      this.showLoading = true;
      this.axios
        .get("http://novel.kele8.cn/book-info/" +id)
        .then((res) => {
          if (res.status == 200) {
            this.showLoading = false;
            this.DetailArr = res.data;
            console.log(this.DetailArr);
            this.$store.state.DelHistory.push(this.DetailArr.title);
          }
          // console.log(res,'0---res')
        })
        .catch((err) => {
          this.showLoading = false;
          console.log(err, "err--------->");
        });
    },
    // 评论
    MakeShort(id) {
      this.axios
        .get("http://novel.kele8.cn/book/short-reviews?book=" + id)
        .then((res) => {
          console.log(res, "0000000000res");
          if (res.status == 200) {
            this.shortRevi = res.data.docs;
            let arr = [...this.shortRevi];
            this.arrNews = [];
            for (let i = 0; i < 4; i++) {
              let r = Math.floor(Math.random() * arr.length);
              this.arrNews.push(...arr.splice(r, 1));
            }
          }
          console.log(this.arrNews, "--");
        })
        .catch((err) => {
          console.log(err, "0---------err");
        });
    },
    goEssay(index,id,tit) {
      this.ii = index;
      // this.getEssayChapters(this.listlink[this.ii].link)
      console.log(this.listlink[this.ii].link)
      this.$router.push({ name: "Essay" ,
      query:{
        link:this.listlink[this.ii].link,
        id,
        tit
        }
      });
    },
    //解密图片
    imgKey(value) {
      return unescape(value).slice(7);
    },
    // 计算
    playCountParse: function (n) {
      if (n > 100000000) {
        return (n / 100000000).toFixed(1) + "亿";
      }
      if (n > 5000) {
        return (n / 5000).toFixed(1) + "万";
      }
    },
    SkipEassy(id, tit) {
      this.$router.push({
        name: "Essay",
        query: {
          id,
          tit,
        },
      });
    },
    // 添加书架
    myBooksTj(index) {
      //  this.$store.state.MyBooksArr.push(this.DetailArr)
      if (this.$store.state.MyBooksArr.length == 0) {
        this.$store.state.MyBooksArr.push(this.DetailArr);
        this.bs = true;
      } else {
        let a = this.$store.state.MyBooksArr;
        let i = this.$store.state.MyBooksArr.length - 1;
        console.log(a[i], this.DetailArr._id, "--=");
        if (a[index]._id == this.DetailArr._id) {
          return;
        } else {
          this.$store.state.MyBooksArr.push(this.DetailArr);
        }
      }
    },
    // 感兴趣的
   Interestedata(){
      this.axios
        .get('http://novel.kele8.cn/recommend/'+this.id)
        .then(res =>{
          console.log(res,"res---------->")
          // if(res.status == 200){
            this.TasteArr = res.data.books
            
            this.SpliceTasteArr = this.TasteArr.splice(0,4)
            console.log(this.SpliceTasteArr,'-=-')
          // }
          
        }).catch(err =>{
          console.log(err,'---------->err');
        })
    },
    // 点击更多
    ClickMore(id){
      console.log('x')
      this.$router.push({name:'More',query:{id}})
    },
    // 
    dj(id){
      // console.log(id)
      this.DetailData(id)
      this.MakeShort(id)
      // this.DetailData(id)
    },
    //上拉
    iconUp() {
      this.addClass = true;
    },

    //下拉
    iconDown() {
      this.addClass = false;
    },
    // 跳转到书架
    SkipMB() {
      this.$router.push({ name: "MyBooks" });
    },
    // 评论跳转到所有评论页面
    ComDetail(id, tit) {
      this.$router.push({ name: "Comment", query: { id, tit } });
    },
    // 目录
    // 获取书源
    getEssaySources(id) {
      this.axios
        .get(
          "http://novel.kele8.cn/book-sources?view=summary&book=" + id + ""
        )
        .then((result) => {
          this.sid = result.data[0]._id;
          this.getEssayBookChapters(this.sid);
          // console.log(this.sid)
        })
        .catch((err) => {
          console.log(err, "============>err");
        });
    },
    // 获取章节
    getEssayBookChapters(sid) {
      this.axios
        .get("http://novel.kele8.cn/book-chapters/" + sid + "")
        .then((result) => {
          this.listlink = result.data.chapters;

          // this.listlink.push(this.link)
          console.log(result.data)
          console.log(this.listlink, "============>getEssay");
          // if (this.listlink.length != 0) {
          // this.getEssayChapters(this.listlink[this.ii].link);
          // }
          // console.log();
        })
        .catch((err) => {
          console.log(err, "----------err");
        });
    },
    // 获取章节内容
    // getEssayChapters(link) {
    //   // this.showLoading = true;
    //   // console.log(link, "=link");
    //   this.axios
    //     .get("http://novel.kele8.cn/chapters/" + encodeURIComponent(link))
    //     .then((result) => {
    //       this.mlArr = result.data.chapter;
    //       // this.iid = result.data.chapter.id;
    //       // this.showLoading = false;
    //       // // this.iid.className= 'active'
    //       // document.documentElement.scrollTop = 0;
    //       console.log(this.mlArr, "=========this.essay");
    //       // this.a = this.essay.cpContent.split("\n");
    //     })
    //     .catch((err) => {
    //       // this.showLoading = false;
    //       console.log(err, "----------------->err");
    //     });
    // },

    //
  },
  
  created() {
    
    this.getEssaySources(this.id);
    this.MakeShort(this.id);
    this.Interestedata()
    this.DetailData(this.id);
    // console.log(this.id,'ii')
    // this.getEssaySources();
    // this.myBooksTj()
    // console.log(this.$store.state.MyBooksArr,'--');
  },
 
};
</script>

<style lang="less" scoped>
.detail {
  background-color: #fff;
  height: 100%;
  width: 100%;
  position: fixed;
  .about {
    width: 100%;
    border-bottom: 1px solid linen;
    h3 {
      margin: 10px 0;
      font-weight: normal;
    }
    .content {
      font-size: 12px;
      line-height: 24px;
      padding: 2px 3px;
      color: #333;
      border-radius: 15px;
      background-color: rgb(248, 242, 242);
      &.show {
        height: 50px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    span {
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .v-popup {
    padding: 10px;
    box-sizing: border-box;
    height: 45%;
    .popup-text {
      text-align: center;
      height: 40px;
      line-height: 30px;
      color: #333;
      font-size: 18px;
    }
    .popup-list {
      height: calc(~"100% - 40px");
      overflow-y: auto;
      font-size: 16px;
      box-shadow: inset 1px 1px 3px #ddd;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: lightsteelblue;
      }
      .popup-item {
        color: #999999;
        font-size: 14px;
        padding: 15px 30px;
        border-bottom: 1px solid linen;
        background: rgb(252, 247, 247);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.active {
          color: red;
        }
      }
    }
  }
  .assess {
    .pl {
      height: 40px;
      h3 {
        margin-left: 10px;
        font-size: 14px;
        margin-bottom: 0;
      }
      .sx {
        // height: 20px;
        margin-right: 8px;
        display: flex;
        width: 60px;
        margin-top: 15px;
        line-height: 20px;
        vertical-align: middle;
        // background: rgb(207, 233, 90);
        .s {
          width: 40px;
          height: 20px;
          // margin-top: 2px;
          // margin-bottom: 5px;
          line-height: 20px;
          color: #999;
          display: inline-block;
        }
        .i {
          width: 18px;
          height: 18px;
          line-height: 20px;
          display: inline-block;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }

    .assess-list {
      height: 66px;
      // padding: 20px 0;
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
        }
      }
    }
  }
  .foot {
    height: 46px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    line-height: 46px;
    text-align: center;
    overflow: hidden;
    box-sizing: border-box;
    span {
      width: 50%;
      font-size: 14px;
      color: re;
      background-color: #fff;
      border: 1px solid red;
      &.addBook.active {
        background-color: #eee;
        color: red;
      }
      &.look {
        color: #fff;
        background-color: rgb(250, 98, 98);
      }
    }
  }
}
.books-list {
  height: calc(~"100% - 100px");
  overflow-y: auto;
  background-color: #fff;
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
  .xl-rq {
    display: flex;
    justify-content: space-between;
    text-align: center;

    .rq-l {
      width: 30%;
      height: 60px;
      //   background: red;
    }
    .dz-c {
      width: 30%;
      height: 60px;
      //   background: red;
    }
    .ts-r {
      width: 30%;
      height: 60px;
      //   background: red;
    }
    p {
      height: 20px;
      margin: 0;
      padding: 0;
      width: 100%;
      line-height: 40px;
    }
    .p1 {
      font-size: 12px;
      color: #999;
    }
    .p2 {
      font-size: 14px;
      color: #333;
    }
  }
  .recommd {
    height: 180px;
    margin: 10px 10px;
    overflow: hidden;
    background-color: #fff;
    .rec-tit {
      border-bottom: 1px solid linen;
      border-top: 1px solid linen;
      .rec-gd {
        color: red;
      }
    }
    .content {
      margin-top: 10px;
      display: flex;
      height: 120px;
      justify-content: space-around;
      // width: 100%;
      .recon-cont {
        width: 20%;
        height: 100px;
        .img {
          width: 100%;
          height: 90px;
          background: #ccc;
          img {
            height: 100%;
            width: 100%;
          }
        }
        p {
          text-align: center;
          // margin-left: 4px;
          margin-top: 5px;
          margin-bottom: 0;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
        }
      }
    }
  }
}
.catalog {
  border-bottom: 1px solid linen;
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
/deep/ .van-nav-bar {
  height: 40px;
}
</style>