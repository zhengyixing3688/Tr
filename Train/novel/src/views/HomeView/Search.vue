<template>
  <div class="search">
    <div class="loading" v-if="showLoading">
      <img src="../../assets/loading.svg" />
    </div>
    <van-nav-bar title="搜索" @click-left="backs" left-text="返回" left-arrow>
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
    <div class="search-list">
      <!-- 搜索 -->
      <div class="search-input">
        <div class="input clearfix">
          <div class="inp fl">
            <i class="ico">
              <img src="../../assets/search.png" />
            </i>
            <input type="text" placeholder="请输入搜索内容" v-model="value" @input="valueData" />
            <!-- <div class="in fr">x</div> -->
          </div>
          <div class="btn-input fr" >{{text}}</div>
        </div>
        <ul class="ul" v-if="show">
          <li class="li" @click="skipD(item)" v-for="(item,index) in valueText" :key="index">
            <i class="ico">
              <img src="../../assets/search.png" />
            </i>
            {{item}}
          </li>
        </ul>
      </div>
      <!-- 热门搜索 -->
      <div class="search-hot" v-if="showH">
        <div class="hot clearfix">
          <h3 class="fl">热门推荐</h3>
          <div class="sx fr" @click.stop="HotSearchData()">
            <span class="s">换一批</span>
            <i class="i">
              <img src="../../assets/sx.png" />
            </i>
          </div>
        </div>
        <div class="hot-cont clearfix">
          <div class="hot-c fl" @click="skipDetail(item.book)" v-for="(item,index) in arrNew" :key="index">
            <a>{{item.word}}</a>
          </div>
        </div>
      </div>
      <!-- 搜索历史 -->
      <div class="search-history" v-if="showH">
        <div class="history clearfix">
          <h3 class="fl">搜索历史</h3>
          <div class="del fr" @click="PopUpDel">
            <span>删除</span>
            <i class="io">
              <img src="../../assets/del.png" />
            </i>
          </div>
        </div>
        <div class="del-history">
          <van-swipe-cell v-for="(item,index) in Storearr" :key="index">
            <van-cell :border="false" :title="item" />
            <template #right>
              <van-button square type="danger" text="删除" @click="delHis(index)"/>
            </template>
          </van-swipe-cell>
        </div>
        <!--  -->
      </div>
    </div>
    <!-- 弹出框 -->
    <div class="Pop" v-if="showPop">
      <div class="Pop-cont">
        <h4>请确认删除全部记录吗？</h4>
        <div class="btn">
          <span class="s1" @click="ClickCall">取消</span>
          <span class="s2" @click="ClickDefine">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "搜索",
      show: false,
      showH: true,
      value: "",
      valueText: [],
      valueHot: [],
      arrNew: [],
      Storearr:this.$store.state.DelHistory,
      DuplicateRemoval:[], 
      showPop:false,
      arrNew:null,
      showLoading:false
    };
  },
  methods: {
    valueData() {
      this.showLoading = true
      if (this.value != "") {
        this.show = true;
        this.text = '确定'
        this.showH = false;
      } else {
        this.show = false;
        this.showH = true;
      }
      this.axios
        .get("http://novel.kele8.cn/auto-complete?query=" + this.value)
        .then((res) => {
          // console.log(res, "------redsd");
          this.showLoading = false
          this.valueText = res.data.keywords;
        })
        .catch((err) => {
           this.showLoading = false
          console.log(err, "------err");
        });
    },
    // 热门搜索
    HotSearchData() {
      this.axios
        .get("http://novel.kele8.cn/hot-books")
        .then((res) => {
          // console.log(res, "[[[[[[");
          if (res.status == 200) {
            this.valueHot = res.data.newHotWords;
            // console.log(this.valueHot[0].word,'=-=')
            let arr = [...this.valueHot];
            this.arrNew = [];
            // console.log(arrNew);
            for (let i = 0; i < 6; i++) {
              let r = Math.floor(Math.random() * arr.length);
              this.arrNew.push(...arr.splice(r, 1));
            }
          }
        })
        .catch((err) => {
          console.log(err, "------err");
        });
    },
    // 刷新数据
    // sx() {
    //   // console.log('xx')
    //   let arr = [...this.valueHot];
    //   let arrNew = [];
    //   // console.log(arrNew);
    //   for (let i = 0; i < 6; i++) {
    //     let r = Math.floor(Math.random() * arr.length);
    //     arrNew.push(...arr.splice(r, 1));
    //   }
    //   return arrNew;
    // },
    // 点击热门跳转到详情
    // 数组storearr去重
    // DuplicateRemovalData(){
    //   for(let i = 0;i<this.Storearr.length;i++){
    //     console.log(this.Storearr[i],'[][=')
    //     for(let j = 1;j<this.Storearr.length;i++){
    //       console.log(this.Storearr[j],'-=-=')
    //     }
    //   }
    // },
    skipDetail(id){
      this.$router.push({name:'Detail',query:{id}})
    },
    // 删除单个历史记录
    delHis(index){
      this.Storearr.splice(index,1)
    },
    // 删除全部历史
    PopUpDel(){
      if(this.Storearr.length == ''){
          this.showPop = false
      }else{
        this.showPop = true
      }
      console.log('xx')
    },
    // 弹出框确定删除
    ClickDefine(){
      this.showPop = false
      this.Storearr.splice(0,this.Storearr.length)
    },
    // 弹出框取消删除
    ClickCall(){
      this.showPop = false
    },
    // 点击搜索列表
    skipD(item){
      // console.log(item)
      this.$router.push({name:'RelateTo',query:{item}})
    },
    backs() {
      this.$router.go(-1);
    },
    SkipMB() {
      this.$router.push({ name: "MyBooks" });
    },
  },
  created() {
    this.valueData();
    this.HotSearchData();
    // this.sx()
    // this.DuplicateRemovalData()
    console.log(this.Storearr,';.........')
  },
};
</script>

<style lang="less" scoped>
.search {
  height: 100%;
  position: fixed;
  width: 100%;
  .search-list {
    //  height:100%;
    // position: relative;
    z-index: -1;
    .search-input {
      // position: fixed;
      // height: calc(~"100% - 100px");
      height: 100%;
      width: 100%;
      .input {
        height: 50px;
        margin: 10px 10px 0;
        // background-color: red;
        position: relative;
        .inp {
          width: 80%;
          height: 50px;
          line-height: 50px;

          .ico {
            width: 14px;
            height: 14px;
            line-height: 14px;
            display: inline-block;
            position: absolute;
            top: 17px;
            left: 4px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          input {
            width: calc(~"100% - 20px");
            height: 25px;
            line-height: 25px;
            padding-left: 20px;
            outline: none;
            border: 0;
            border-radius: 15px;
          }
        }
        .btn-input {
          width: 15%;
          height: 25px;
          margin-top: 11px;
          text-align: center;
          line-height: 25px;
          border-radius: 18px;
          background: #ccc;
        }
      }
      .ul {
        background: #fff;
        //   height: 500px;
        position: fixed;
        height: calc(~"100% - 240px");
        width: calc(~"100% - 20px");
        overflow-y: auto;
        margin: 0 10px;
        .li {
          height: 30px;
          font-size: 18px;
          line-height: 30px;
          color: #999;
          padding: 5px 10px;
          border-bottom: 1px solid linen;
          .ico {
            width: 15px;
            height: 15px;
            padding: 0 5px;
            display: inline-block;
            img {
              margin-top: 2px;
              height: 100%;
              width: 100%;
            }
          }
        }
      }
    }
    //
    .search-hot {
      margin-left: 10px;
      margin-right: 10px;
      height: 100%;
      border-bottom: 1px solid linen;
      padding: 5px 0;
      .hot {
        height: 40px;
        border-bottom: 1px solid linen;
        h3 {
          font-size: 20px;
          color: #999;
          margin: 0;
          margin-top: 6px;
        }
        .sx {
          // height: 20px;
          display: flex;
          width: 60px;
          margin-top: 10px;
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
      .hot-cont {
        margin-top: 10px;
        .hot-c {
          height: 28px;
          margin-right: 10px;
          margin-bottom: 10px;
          //   width: calc(~"40% - 40px");
          padding: 5px 10px;
          background: #fff;
          border-radius: 20px;
          padding: 5px 15px;
          text-align: center;
          line-height: 28px;
          // flex-wrap: wrap;
          a {
            color: #999;
            font-size: 10px;
          }
        }
      }
    }
    .search-history {
      margin: 0 10px;
      // border-bottom: 1px solid linen;
      .history {
        height: 50px;
        line-height: 50px;
         border-bottom: 1px solid linen;
        h3 {
          font-size: 20px;
          color: #999;
          margin: 0;
          padding: 0;
        }
        .del {
          height: 20px;
          line-height: 26px;
          margin-top: 15px;
          display: flex;

          span {
            height: 20px;
            color: #999;
            margin-bottom: 0;
            display: inline-block;
          }
          .io {
            vertical-align: middle;
            width: 20px;
            height: 20px;
            display: inline-block;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .del-history {
        margin-bottom: 10px;
      }
    }
  }
  .Pop{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index:1;
    background-color: rgba(0, 0, 0,0.5);
    .Pop-cont{
      position: absolute;
      width: 70%;
      height: 100px;
      background-color: #fff;
      // text-align: center;
      top: 50%;
      left: 50%;
      margin-left: -35%;
      margin-top: -50px;
      border-radius: 15px;
      h4{
        font-size: 14px;
        margin-left: 30px;
        color: #333;
      }
      .btn{
        position: absolute;
        right: 10px;
        top: 60px;
        span{
          padding: 8px 20px;
          background-color: #ccc;
          border-radius: 15px;
        }
        .s2{
          margin-left: 10px;
        }
      }
    }
  }
}
/deep/ .van-swipe-cell{
  margin-top: 4px;
  margin-bottom: 6px;
  border-radius: 15px;
}
/deep/ .van-cell__title {
  font-size: 14px;
  color: #999;
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
/deep/ .van-button--danger{
  background-color: rgb(206, 202, 198);
  border:1px solid rgb(206, 202, 198);
}
</style>