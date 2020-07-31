<template>
  <div class="rankinglist">
    <div class="loading" v-if="showLoading">
      <img src="../../assets/loading.svg" />
    </div>
    <van-nav-bar title="排行榜" left-text="返回" left-arrow></van-nav-bar>
    <!--  -->
    <div class="content">
      <van-tabs v-model="active" @click="TabsMove">
        <van-tab :title="item.name" v-for="(item,index) in dataArr" :key="index">
          <div class="ranking-content clearfix">
            <div class="left fl" ref="left" :value="i3">
              <div
                
                v-for="(is,index) in item.data"
                :key="index"
                :class="top_index == index ? 'active' : ''"
                @click="topMove(index,is._id)"
              >{{is.shortTitle}}</div>
            </div>
            
              <div class="right fl" ref="right" :value="i2">
                <van-list
              class="popup-list"
              v-model="load.loading"
              :finished="load.finished"
              :finished-text="load.loadingMsg"
              @load="onLoad"
              :offset="50"
            >
                <div
                  class="item clearfix"
                  @click="SkipDetail(it._id)"
                  v-for="(it,index) in rigDataArr"
                  :key="index"
                >
                  <div class="img-box fl">
                    <img class="auto-img" v-lazy="imgKey(it.cover)" alt="图片未加载..." />
                  </div>
                  <div class="text-box fl">
                    <div class="title">{{it.title}}</div>
                    <div class="name-box clearfix">
                      <div class="text">{{it.shortIntro}}</div>
                    </div>
                    <div class="text-content">{{it.majorCate}} : {{it.minorCate}}</div>
                  </div>
                </div>
              </van-list>
              </div>
            
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!--  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      dataArr: [],
      top_index: 0,
      rigDataArr: [],
      rigDataArrBooks:[], 
      id1: [],
      id2: [],
      id3: [],
      index2: 0,
      i2: 0,
      i3: 0,
      i: 0,
      showLoading: false,
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
    getData() {
      this.showLoading = true;
      this.axios
        .get("http://novel.kele8.cn/rank-category")
        .then((res) => {
          this.showLoading = false;
          this.dataArr.push({
            data: res.data.male,
            name: "男生",
          });
          this.dataArr.push({
            data: res.data.female,
            name: "女生",
          });
          this.dataArr.push({
            data: res.data.picture,
            name: "漫画",
          });
          // console.log(this.dataArr[0].data[0]._id, "------>res");
          // console.log(this.active,'--')
          this.getXq(this.dataArr[0].data[0]._id);

          this.id1.push(this.dataArr[0].data[0]._id);
          this.id2.push(this.dataArr[1].data[0]._id);
          this.id3.push(this.dataArr[2].data[0]._id);
        })
        .catch((err) => {
          this.showLoading = false;
          console.log(err, "------->err");
        });
    },
    getXq(id) {
      this.axios
        .get("http://novel.kele8.cn/rank/" + id)
        .then((res) => {
          // console.log(res,'00')

          if (res.status == 200) {
            this.rigDataArrBooks = res.data.ranking.books;
            this.rigDataArr = this.rigDataArrBooks.splice(0, this.loadCount);
            if (this.rigDataArrBooks.length > 0) {
              this.load.loading = false;
            } else {
              this.load.loading = true;
              this.load.finished = true;
            }
          }
        })
        .catch((res) => {
          console.log(err, "-------err");
        });
    },
    // 侧边移动
    topMove(index, id) {
      // console.log(index)
      this.top_index = index;
      // this.in = index;
      this.getXq(id);
      if(this.i2 == this.index2){
        this.$refs.right[this.i2].scrollTop = 0;
      }
      
      // this.$refs.aa[this.i2].scrollTop = 0;
      
      
      console.log(this.$refs.left[0], "right");
      console.log(this.i2);
      console.log(this.index2);
    },
    // 懒加载
    onLoad(){
      setTimeout(() =>{
        this.rigDataArr.push(...this.rigDataArrBooks.splice(0,this.loadCount))
        this.load.loading = false
        if(this.rigDataArrBooks.length == 0){
          this.load.loading = true
          this.load.finished = true
        }
      },1000)
    },
    // 头部移动
    TabsMove(event) {
      this.active = event;
      this.i2 = this.active;
      this.i3 = this.active;
      this.index2 = this.active;
      if (this.active == 0) {
        this.getXq(this.id1[0]);
      } else if (this.active == 1) {
        this.getXq(this.id2[0]);
      } else {
        this.getXq(this.id3[0]);
      }
      console.log(this.active,'active')
     
    },
    SkipDetail(id) {
      this.$router.push({ name: "Detail", query: { id } });
    },
    goUpLeve() {
      this.$router.go(-1);
    },
    //解密图片
    imgKey(value) {
      return unescape(value).slice(7);
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.rankinglist {
  position: fixed;
  width: 100%;
  height: 100%;
  .content {
    height: calc(~"100% - 30px");
    width: 100%;
    margin-bottom: 10px;
  }
  .van-tabs,
  /deep/ .van-tabs__content,
  /deep/ .van-tab__pane {
    width: 100%;
    height: 100%;
  }
  .ranking-content {
    background-color: #fff;
    width: 100%;
    height: 100%;
    margin-top: 6px;
  }
  .left,
  .right {
    // margin-left: 10px;
    overflow-y: auto;
    font-size: 14px;
    height: calc(~"100% - 120px");
  }
  .left {
    color: #333;
    line-height: 40px;
    width: 89px;
    border-right: 1px solid #ccc;
    background-color: #fff;
    text-align: center;
    overflow-y: auto;
    top: 0;
    // padding: 10px 0;
    position: relative;
    div {
      transition: all 0.3s;
      height: 40px;
      border-bottom: 1px solid red;
      //   margin: 3px 0;

      &.active {
        transform: scale(1.1);
        background-color: #ccc;
        // color: #fff;
        border-bottom-right-radius: 5px;
      }
    }
  }
  .right {
    width: calc(~"100% - 100px");
    overflow-y: auto;
    margin-left: 10px;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #ccc;
    }
    .item {
      width: 100%;
      margin-bottom: 10px;
      height: 100px;
      margin-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      &:last-child {
        margin-bottom: 0;
      }
      .img-box {
        width: 65px;
        height: 100px;
        img {
          height: 100%;
        }
      }
      .text-box {
        margin-left: 5px;
        width: calc(~"100% - 70px");
        box-sizing: border-box;
        height: 100%;
        .title {
          font-size: 16px;
          color: #333;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .name-box {
          height: 20px;
          line-height: 20px;
          width: 100%;
          margin: 5px 0;
          color: #666;
          .text {
            max-height: 60px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            margin: 5px 0;
            font-size: 10px;
            color: #999;
          }
          .type {
            font-size: 14px;
          }
        }
        .text-content {
          width: 100%;
          //   line-height: 20px;
          height: 20px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          color: #999;
          text-align: justify;
          margin-top: 34px;
          font-size: 10px;
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