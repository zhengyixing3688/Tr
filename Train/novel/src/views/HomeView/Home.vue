<template>
  <div class="home">
    <div class="loading" v-if="showLoading">
      <img src="../../assets/loading.svg" />
    </div>
    <!-- <div class="img">
      <img src="../../assets/tit-icon.png">
    </div> -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(item , index) in bannerData"
        :key="index"
        @click="goPage('Detail',item.id)"
      >
        <img
          class="auto-img banner-img"
          style="height:150px"
          v-lazy="
          item.url"
          alt="图片未加载..."
        />
      </van-swipe-item>
    </van-swipe>
    <!--分类  -->
    <div class="ify">
      <div class="classify" v-for="(item,index) in dataArr" :key="index">
      <div class="ify-item">
        <h3>{{item.name}}</h3>
        <div class="ify-list">
          <div class="ify-o" @click="clickSkip(item.gender,i.name)" v-for="(i,index) in item.data" :key="index">
            <p class="p1">{{i.name}}</p>
            <p class="p2">{{i.bookCount}}</p>
          </div>
          
        </div>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      // 轮播图数据
      bannerData: [
        {
          id: "5e218eca6c4f4f748c380e3b",
          url: require("../../assets/images/1.jpg"),
          // 熊猫
        },
        {
          id: "53e020642ad91059430caddf",
          url: require("../../assets/images/2.jpg"),
          // 捡到一条龙
        },
        {
          id: "5d5cf87f67621e4f2d38640e",
          url: require("../../assets/images/3.jpg"),
          // 炼妖壶
        },
        {
          id: "5def4e03614600d7f471dcbf",
          url: require("../../assets/images/4.jpg"),
          // 调教夫君
        },
        {
          id: "5ee217adf7123364a6a51878",
          url: require("../../assets/images/5.jpg"),
          // 剑道
        },
      ],
      dataArr: [],
      showLoading:false
    };
  },
  methods: {
    goBook(id) {
      this.$router.push({ name: "Book", query: { id: id } });
    },
    Data() {
      this.showLoading = true
      this.axios
        .get("http://novel.kele8.cn/categories")
        .then((res) => {
          console.log(res, "---res");
          this.showLoading = false
          this.dataArr.push({
            data: res.data.male,
            name: "男生",
            gender: "male",
          });
          this.dataArr.push({
            data: res.data.female,
            name: "女生",
            gender: "female",
          });
          this.dataArr.push({
            data: res.data.picture,
            name: "漫画",
            gender: "picture",
          });
          this.dataArr.push({
            data: res.data.press,
            name: "出版",
            gender: "press",
          });
        })
        .catch((err) => {
          this.showLoading = false
          console.log(err, "-----err");
        });
    },
    clickSkip(gender,major){
      this.$router.push({name:'BookList',query:{
        gender,
        major
      }})
      console.log('x')
    },
    // 点击轮播图调到详情Detail
    goPage(name,id) {
      if(id){
        this.$router.push({ name: name, query: { id: id } });
      }else{
        this.$router.push({ name });
      }
    },
    
  },
  created() {
    this.Data();
    console.log(this.dataArr);
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  position: fixed;
  width: 100%;
  .img{
    height: 40px;
    width: 40px;
    img{
      background-color: none;
      height: 100%;
      width: 100%;
    }
  }
}
.ify {
  height: calc(~"100% - 200px");
  overflow-y: auto;
  .classify {
    padding: 5px 10px;
    
    .ify-item {
      h3 {
        padding: 0;
        margin-bottom: 0;
        color: #999;
        padding: 8px 0;
        border-top: 1px solid linen;
        // border-bottom: 1px solid linen;
      }
      .ify-list {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        
        .ify-o {
          margin: 0 0.3%;
          width: 32.1%;
          height: 40px;
          margin-bottom: 6px;
          border: 1px solid linen;
          p {
            text-align: center;
            height: 16px;
            line-height: 16px;
            padding: 0;
            margin: 0;
          }
          .p1 {
            color: #333;
            // font-weight: lighter;
            margin-top: 5px;
            font-size: 12px;
          }
          .p2 {
            color: #999;
            font-size: 11px;
          }
        }
      }
    }
  }
}
</style>
