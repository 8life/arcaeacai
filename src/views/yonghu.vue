<template>
  <div class="yonghu">
    <div class="yonghe_box">
      <div class="toxiang">
        <img
          :src="'https://redive.estertion.win/arcaea/backstage/icons/' + uersinfo.character + (uersinfo.is_char_uncapped ? 'u' : '') + '_icon.png'"
        />
      </div>
      <div class="info">
        <div class="yihan">
          <div class="name fl">{{uersinfo.name}}</div>
          <div class="uid fl">uid:&nbsp;{{uersinfo.user_code}}</div>
        </div>
        <div
          class="ppt"
        >PPT:&nbsp;{{(uersinfo.rating/100).toFixed(2)}}&nbsp;/B30:&nbsp;{{AVG30}}&nbsp;/R10:&nbsp;{{R10}}</div>
        <div class="aocai">创建时间:{{getDateString(uersinfo.join_date)}}</div>
      </div>
    </div>
    <div ref="shuoming" class="shuoming">这里是一些文字说明</div>
    <div class="router_box">
      <router-link to="/yonghu/zuij">最近记录</router-link>|
      <router-link class="link-zhong" to="/yonghu/best30">B30</router-link>|
      <router-link to="/yonghu/miusic">铺面定数</router-link>
    </div>
    <div class="router-vbox">
      <router-view class="router-v"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uersinfo: null,
      scroes: null,
      AVG30: 0,
      R10: 0
    };
  },
  created() {
    // console.log(this.$store.getters.getuserinfo)
    let AVG30 = 0;

    // this.uersinfo = window.userinfo;
    // this.scores = window.scroes;
    this.uersinfo = JSON.parse(window.sessionStorage.userinfo);
    this.scroes = JSON.parse(window.sessionStorage.scroes);
   
    this.scroes.sort(function(i, j) {
      return j.rating > i.rating ? 1 : -1;
    });
    // console.log(this.scroes)
    for (var j = 0; j < 30 && j < this.scroes.length; j++) {
      AVG30 += this.scroes[j].rating;
      // console.log(j,AVG30)
    }
    AVG30 = AVG30 / j.toFixed(2);
    this.AVG30 = AVG30.toFixed(2);
    this.R10 = (((this.uersinfo.rating / 100) * 40 - AVG30 * j) / 10).toFixed(
      2
    );
    // console.log('aaa',j,AVG30)
    // console.log(((this.uersinfo.rating/100).toFixed(2)*1+AVG30)/2)
  },
  methods: {
    getDateString(date) {
      date = new Date(date * 1);
      return (
        [
          date.getFullYear(),
          window.check(date.getMonth() + 1),
          window.check(date.getDate())
        ].join("/") +
        " " +
        [
          window.check(date.getHours()),
          window.check(date.getMinutes()),
          window.check(date.getSeconds())
        ].join(":")
      );
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path == "/yonghu/zuij") {
      console.log(from);
      this.$refs.shuoming.innerHTML = "感谢esterTion提供的api,只用于学习";
    }
    if (to.path == "/yonghu/best30") {
      this.$refs.shuoming.innerHTML =
        "这里显示你最好的" + this.scroes.length + "张谱子";
    }
    if (to.path == "/yonghu/miusic") {
      this.$refs.shuoming.innerHTML =
        "你的B30为" + this.AVG30 + "可以找相近的铺子提升哦";
    }

    next();
  }
};
//https://redive.estertion.win/arcaea/backstage/icons/16_icon.png
</script>
<style scoped>
.fl {
  float: left;
}
.yihan {
  overflow: hidden;
  margin-bottom: 8px;
}
.yonghe_box {
  padding: 12px 12px 0 12px;
  display: flex;
  align-items: center;
  /* margin-bottom: 18px; */
  /* border: 1px solid red; */
}

.toxiang {
  width: 64px;
  height: 64px;
  /* border: 1px solid rgb(255, 0, 0); */
  flex: 0 0 auto;
}
.toxiang img {
  display: block;
  width: 100%;
}

.info {
  box-sizing: border-box;
  padding: 2px 0 16px 16px;
  text-align: left;
  /* border: 1px solid red; */
  flex: 1;
}
.name {
  margin-right: 6px;
}
.ppt {
  font-weight: 700;
  margin-bottom: 8px;
}
.shuoming {
  box-sizing: border-box;
  /* border: 1px  solid red; */
  background-color: rgba(0, 0, 0, 0.3);
  height: 28px;
  width: 100%;
  padding: 0 12px 0 12px;
  font-size: 10px;
  line-height: 28px;
  text-align: left;
  color: #efeff4;
}
.router_box {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  /* border: 1px solid red; */
  border-bottom: 3px solid #efeff4;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.router-v {
  box-sizing: border-box;
  /* padding-top: 20px; */
  /* padding-left: 20px; */
  /* padding-right: 20px; */
  /* border: 1px solid red; */
  width: 100%;
  min-width: 100%;
  height: 496px;

  text-align: left;
}
.router-vbox {
  overflow-x: hidden;
  font-size: 0;
  height: 496px;
  max-height: 507px;
  min-width: 100%;
}
</style>
