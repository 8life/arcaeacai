<template>
  <div>
    <div class="paixu">
      <div class="leibei">All</div>
      <div class="avgb30">PPT:9.56</div>
      <div class="shengjian" @click="gai_shengjian">{{sj?'升序':'降序'}}</div>
    </div>
    <div class="poi" v-if="poit">
        <div>获取数据中{{poit}}</div>
    </div>
    <div class="list_bbox" v-if="!poit">
      <div class="list_box" v-for="(i) in constants" :key="i.name">
        <div class="list_title">
          <div class="songname">{{i.name}}</div>
          <div class="pmppt">{{i.ppt}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        poit:false,
      constants: null,
      songlist: null,
      sj: true,
      difficultys: ["PST", "PRS", "FTR", "BYN"]
    };
  },
  mounted() {
    this.$nextTick(function() {
      if (!window.scroesppt) {
        let ppp = this;
        window.running = true;
        this.poit =true
        let ws = new WebSocket("wss://arc.estertion.win:616");
        ws.onerror = function(e) {
          console.log(e);
          this.$refs.tis.textContent = window._t("Connect failed", window.lang);
          window.running = false;
        };
        ws.onmessage = function(e) {
          // console.log(e.data);
          let data = e.data;
          if (data.byteLength) {
            data = window.BrotliDecompress(new Uint8Array(data));
            data = String.fromCharCode.apply(String, data);
            data = JSON.parse(decodeURIComponent(escape(data)));
            if (data.cmd == "songtitle") {
              ppp.songlist = data.data;
              // console.log(1, ppp.songlist);
            }
            if (data.cmd == "constants") {
              ppp.constants = [];
              for (let i in data.data)
                for (let j in data.data[i]) {
                  ppp.constants.push({
                    name: i + ":" + ppp.difficultys[j],
                    ppt: data.data[i][j]
                  });
                }
              ppp.constants.sort(function(i, j) {
                return i.ppt - j.ppt;
              });
              window.scroesppt= ppp.constants
            //   console.log(ppp.constants);
            }
          }
        };
        ws.binaryType = "arraybuffer";
        ws.onopen = function() {
          ws.send("constants");
        };
        ws.onclose = function() {
          console.log("结束通信");
          window.running = false;
          ppp.poit =false;
        };
      }else{
          this.constants=window.scroesppt
      }
    });
  },
  methods: {
    gai_shengjian() {
      if (this.sj) {
        this.constants.sort(function(i, j) {
          return i.ppt - j.ppt;
        });
        this.sj = false;
      } else {
        this.constants.sort(function(i, j) {
          return j.ppt - i.ppt;
        });
        this.sj = true;
      }
    },
    poi() {
      console.log(this.constants);
    }
  }
};
</script>
<style scoped>
div {
  font-size: 20px;
}
.paixu {
  display: flex;
  padding: 3px 8px 3px 8px;
  background-color: #efeff4;
  justify-content: space-between;
  align-items: center;
}
.avgb30 {
  font-size: 15px;
}
.list_bbox {
  height: 464px;
  overflow-x: hidden;
  overflow-y: auto;
}
.list_box {
  overflow: hidden;
  box-sizing: border-box;
  background-color: #ffffff;
  margin: 5px 0;
  padding: 0 16px 0 8px;
  line-height: 36px;
  width: 100%;
}
.list_title {
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
}
.leibei {
  width: 40px;
}
.songname {
  float: left;
}
.pmppt {
  float: right;
}
.poi{
    width: 100%;
    height: 464px;
    display: flex;
    justify-content: center;
    align-items: center
}
</style>