<template >
  <div class="essay" ref="essay"  :style="{backgroundColor:bjys}">
    <div class="loading" v-if="showLoading">
      <img src="../assets/loading.svg" />
    </div>
    <!-- 头部遮罩层 -->

    <div class="con-tex" ref="con_tex" >
      <!-- ----- -->
      <van-popup v-model="show" position="top" :style="{ height: '45px'}">
        <van-nav-bar :title="tit" left-text="返回" left-arrow @click-left="back" @click-right="r">
          <template #right>
            <van-icon name="bars" size="18" />
          </template>
        </van-nav-bar>

        <!-- ===== -->
      </van-popup>
      <!-- <div class="mask fr" v-show="show">
          <div class="home-a">---</div>
          <div class="home-a">---</div>
      </div>-->
      <van-popup v-model="show" class="vanPopup" position="bottom" :style="{ height: '150px' }">
        <div class="font">
          <div class="cut" @click="clickCut">-</div>
          <div class="line" ref="line">
            <div class="lWidth" :style="{width:widthL+'px',background:ys}" ref="lWidth"></div>
          </div>
          <div class="add" ref="add" @click="clickAdd">+</div>
        </div>
        <div class="turnBack">
          <div
            v-for="(back,index) in BackArr"
            :key="index"
            :class="{active:back.isActive}"
            @click="BackArrStyle(back,index)"
          >{{back.title}}</div>
        </div>
        <div class="bottom">
          <button @click="last">上一章</button>

          <div class="ml" @click="showMl">目录</div>
          <button @click="next">下一章</button>
        </div>
      </van-popup>

      <!-- ========= -->

      <!-- ------ -->
      <div
        class="EssayText"
        ref="EssayText"
        @click="showPopup"
        
        :style="{lineHeight:font+20 +'px',fontSize:font + 'px'}"
      >
        <h4>{{essay.title}}</h4>
        <p class="text" ref="text" v-for="(as,index) in a" :key="index">{{as}}</p>
        <!-- <br /> -->
      </div>
    </div>
    <div class="d" v-if="show1" @click="showPopup">
      <div class="content">
        <h3>{{tit}}</h3>
        <div class="listml">目录</div>
        <ul :class="{active:iid}" >
          <li
            class="li"
            v-for="(list,index2) in listlink"
            :key="index2"
            ref="li"
            :value="i"
            :class="i == index2 ? 'active' : ''"
            @click="clickMl(list.link,index2)"
          >{{index2+1}}-{{list.title}}</li>
        </ul>
      </div>
    </div>
    <!-- <button @click="next">---</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      tit: this.$route.query.tit,
      index:this.$route.query.index,
      showLoading: false,
      sid: [],
      listlink: [this.$route.query.link],
      essay: [],
      a: [],
      iid: [],
      index: 0,
      show: false,
      show1: false,
      index1: 0,
      widthL: 0,
      lWidth: null,
      add: null,
      line: null,
      ys: "",
      muys: "",
      v: "100%",
      font: 15,
      bjys: "",
      index2: 0,
      i:0,
      bol: false,
      moveTop:0,
      BackArr: [
        {
          title: "默认",
          BColor: "rgba(0, 0, 0, 0.1)",
          isActive: true
        },
        {
          title: "夜间",
          BColor: "rgba(0, 0, 0, 0.3)",
          isActive: false
        },
        {
          title: "护眼",
          BColor: "rgba(184,205,141)",
          isActive: false
        }
      ]
    };
  },
  methods: {
    // 获取书源
    getEssaySources(id) {
      this.axios
        .get(
          "http://novel.kele8.cn/book-sources?view=summary&book=" + id 
        )
        .then(result => {
          // console.log(result,'reeee')
         this.sid = result.data[0]._id;
          this.getEssayBookChapters(this.sid);
          console.log(this.sid)
        })
        .catch(err => {
          console.log(err, "============>err");
        });
    },
    // 获取章节
    getEssayBookChapters(sid) {
      this.axios
        .get("http://novel.kele8.cn/book-chapters/" + sid + "")
        .then(result => {
          this.listlink = result.data.chapters;
          
          // this.listlink.push(this.link)
          console.log(this.listlink, "============>getEssay");
          if (this.listlink.length != 0) {
            this.getEssayChapters(this.listlink[this.index].link);
          }
          // console.log();
        })
        .catch(err => {
          console.log(err, "----------err");
        });
    },
    // 获取章节内容
    getEssayChapters(link) {
      this.showLoading = true;
      // console.log(link, "=link");
      this.axios
        .get("http://novel.kele8.cn/chapters/" + encodeURIComponent(link))
        .then(result => {
          console.log(result)
          this.essay = result.data.chapter;
          this.iid = result.data.chapter.id;
          this.showLoading = false;
          // this.iid.className= 'active'
          
          console.log(this.essay, "=========this.essay");
          this.a = this.essay.cpContent.split("\n");
        })
        .catch(err => {
          this.showLoading = false;
          console.log(err, "----------------->err");
        });
    },
    //
    r() {
      console.log("x");
      this.show = true;
    },
    // 页面滚动
    
    // 下一页
    next() {
      
      // console.log( this.$refs.text.offsetHeight)
      if(this.i){
        this.index = this.i
        this.index += 1
      }else{
        this.index += 1;
      }
      
      if (this.index > this.listlink.length - 1) {
        this.index = 0;
      }
      this.$refs.essay.scrollTop = 0;
      this.getEssayChapters(this.listlink[this.index].link);
    },
    // 上一页
    last() {
      if(this.i){
        this.index = this.i
        this.index -= 1
      }else{
        this.index -= 1;
      }
      if (this.index <= 0) {
        this.index = 0;
      }
     this.$refs.essay.scrollTop = 0;
      this.getEssayChapters(this.listlink[this.index].link);
    },
    showPopup() {
      this.show = true;
      this.show1 = false;

      // console.log("xx",this.show)
    },
    showMl() {
      this.show1 = true;
      this.show = false;
      console.log("xx", this.show1);
    },
    // 点击
    clickAdd() {
      this.index1++;

      this.widthL = this.index1 * 100;
      this.font += 2;
      if (this.widthL >= 298) {
        this.widthL = 298;
        this.font = 21;
      }
    },
    // 点击目录
    clickMl(link, index) {
      this.i = index
      console.log(this.i,'indexclickMl')
      this.getEssayChapters(link);
      // console.log('xx',link)
    },
    clickCut() {
      this.index1--;

      this.widthL = this.index1 * 100;
      this.font -= 2;
      if (this.widthL <= 0) {
        this.widthL = 0;
        this.font = 15;
      }
      // this.ys = this.widthL;
      console.log("x", this.widthL);
    },
    BackArrStyle(item, index) {
      // console.log("this.$refs.essay", this.$refs.essay);
      // console.log(this.BackArr[index].BColor);
      this.bjys = this.BackArr[index].BColor;
      if (item.isActive) {
        return;
      }
      for (let i = 0; i < this.BackArr.length; i++) {
        if (this.BackArr[i].isActive) {
          this.BackArr[i].BColor;
          this.BackArr[i].isActive = false;
          break;
        }
      }
      item.isActive = true;
    },
    back() {
      // console.log("---");
      this.$router.go(-1);
      this.show = false;
    },
  
  },
  created() {
    this.getEssaySources(this.id);
  },

};
</script>

<style lang="less" scoped>
html ,body{
  height: 100%;
}
p,
h4 {
  margin: 0;
  padding: 0;
  
}
// .EssayText{
  
//   // height:100%;
// }
.essay {
  height: 100%;
  overflow-y: auto;
  position: fixed;
  .d {
    position: absolute;
    top: -18px;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    border-radius: 10px;
    // background: rgb(252, 247, 247);
    .content {
      width: 70%;
      height: 100%;
      position: relative;
      background: rgb(252, 247, 247);
      h3 {
        // margin: 20px 10px;
        padding: 10px 10px;
        margin-bottom: 0;
      }
      .listml {
        // margin-left: 10px;
        margin: 5px 10px;
        padding: 5px 10px;
        color: #ccc;
        border-bottom: 1px solid linen;
      }
      ul {
        // position: relative;
        position: absolute;
        height: 100%;
        width: 100%;
        overflow-y: auto;
        li {
          // position: absolute;
          // height: 100%;
          color: #999999;
          font-size: 14px;
          padding: 15px 30px;
          border-bottom: 1px solid linen;
          background: rgb(252, 247, 247);
          &.active {
            color: red;
          }
        }
      }
    }
  }
  .con-tex {
    height: 100%;

    .mask {
      width: 300px;
      height: 200px;
      background-color: red;
      display: inline-block;
      z-index: 1200000 !important;
      margin-top: 30px;
    }
    h4 {
      padding: 15px 0 0 0;
      margin-left: 30px;
      font-size: 20px;
      color: #333;
    }
    .text {
      height: 100%;
      padding: 5px 22px;
      line-height: 25px;
      white-space: pre-wrap;
      text-indent: 20px;
      overflow-y: auto;
      // font-size: 40px;
      //  white-space: pre;
    }
    .van-cell {
      height: 100%;
    }
    .vanPopup {
      // margin: 20px 0;
      .font {
        height: 26px;
        display: flex;
        // background: #ccc;
        align-items: center;
        justify-content: center;
        // padding: 20px 30px;
        margin: 15px 0;
        .add {
          text-align: center;
          line-height: 16px;
          height: 15px;
          width: 15px;
          margin: 0 10px;
          background-color: rgb(209, 195, 195);
          color: white;
          border-radius: 15px;
          &.active {
            background: red;
          }
        }
        .line {
          width: 79%;
          // flex: 1;
          height: 6px;
          // padding: 0 20px;
          background: rgb(209, 195, 195);
          .lWidth {
            width: 100%;
            // width: calc(~"90% - 60px");
            height: 6px;
            line-height: 6px;
            background: red;
          }
        }
        .cut {
          height: 15px;
          width: 15px;
          text-align: center;
          margin: 0 10px;
          line-height: 15px;
          background-color: rgb(209, 195, 195);
          color: white;
          border-radius: 15px;
        }
      }
      .turnBack {
        display: flex;
        margin: 5px 0;
        justify-content: space-around;
        div {
          color: white;
          font-size: 15px;
          font-weight: lighter;
          width: 100px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #535353;
          // border-radius: 15px;
          text-align: center;
          div.mr {
            display: inline-block;
            width: 240px;
            height: 80px;
            border-radius: 20px;
          }
          div.yj {
            display: inline-block;
            width: 240px;
            height: 80px;
            border-radius:20px;
          }
          div.hy {
            display: inline-block;
            width: 240px;
            height: 80px;
            border-radius: 20px;
          }
          &.active {
            border: 1px solid red;
            color: red;
          }
        }
      }
      .bottom {
        display: flex;
        margin: 15px 0;
        justify-content: space-around;

        button {
          color: white;
          outline: none;
          border: none;
          background: none;
        }
        .ml {
          // width: 100px;
          // height: 100px;

          color: rgba(213, 230, 217, 0.76);
        }
      }
    }
  }
}
/deep/ .van-popup--top {
  z-index: 3009 !important;
}
/deep/ .van-overlay {
  background-color: rgba(0, 0, 0, 0, 0.1);
  // z-index:;
  z-index: 2009;
}

// /deep/ .van-popup--bottom {
//   z-index: -1;
// }
// /deep/ .van-hairline--bottom{
//   // z-index: 3010 !important;
// }
/deep/ .van-nav-bar {
  height: 100%;

  background-color: rgba(0, 0, 0, 0, 0.1);
}
/deep/ .van-popup {
  background-color: rgba(50, 51, 52, 0.7);
}

/deep/ .van-icon {
  color: white;
  font-size: 12px;
}
/deep/ .van-nav-bar__text {
  color: white;
  font-size: 12px;
}
/deep/ .van-nav-bar__title {
  color: white;
  font-size: 15px;
}
</style>