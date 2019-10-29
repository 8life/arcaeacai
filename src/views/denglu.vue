<template>
  <div class="denglu">
    <div class="denglu_box">
      <h2>请输入好友码</h2>
      <input type="text" ref="haoyouma" @keydown="huichu($event)" name="haoyouma" />
      <button @click="caixun">查询</button>
      <div ref="tis">这里是提示</div>
      
    </div>
  </div>
</template>

<script>
//问题1如何在dom的addlisten中使用mothods的方法
export default {
  name: "denglu",
  components: {},
  mounted() {
    this.$refs.haoyouma.focus();
    this.$refs.haoyouma.addEventListener("input", function() {
      if (!/^\d{,9}$/.test(this.value))
        this.value = this.value.replace(/[^\d]/g, "").substr(0, 9);
    });
  },
  methods: {
    
    //点击事件
    caixun() {
      let massage = this.$refs.tis;
      let ppp = this;
      //poi
      // for(window.poiqq=2;window.poiqq<window.s.length;window.poiqq++){
      //   window.s[window.poiqq].data.forEach(function(i){
      //     window.scoresObj[i.song_id + i.difficulty] = i;
      //   })
      //   window.scores = Object.values(window.scoresObj);
      // }

      console.log("oooo", this.$refs.haoyouma.value);
      window.scoresObj = {};
      window.scroes = [];
      window.userinfo = {};
      window.songtitle = {};
      //判断是否在网络握手中
      if (window.running) return;
      let code = this.$refs.haoyouma.value.replace(/[^\d]/g, "").substr(0, 9);
      if (code.length != 9) {
        massage.textContent = window._t("Invalid code", window.lang);
        return;
      }

      let cmd = [code];
      //准备网络链接
      window.running = true;
      let ws = new WebSocket("wss://arc.estertion.win:616");
      console.log("1");
      //链接出错的时候
      ws.onerror = function(e) {
        console.log(e);
        this.$refs.tis.textContent = window._t("Connect failed", window.lang);
        window.running = false;
      };
      ws.onmessage = function(e) {
        // console.log("接收到data");

        var data = e.data;
        if (data.byteLength) {
          // console.log("ok");
          data = window.BrotliDecompress(new Uint8Array(data));
          data = String.fromCharCode.apply(String, data);
          data = JSON.parse(decodeURIComponent(escape(data)));
          switch (data.cmd) {
            case "songtitle": {
              window.songtitle = data.data;
              break;
            }
            case "userinfo": {
              window.userinfo = data.data;
              break;
            }
            case "scores": {
              data.data.forEach(function(i) {
                window.scoresObj[i.song_id + i.diffculty] = i;
              });
              window.scroes = Object.values(window.scoresObj);
              massage.textContent =
                window._t("Queried, waiting for results...", window.lang) +
                window.scroes.length;
              break;
            }
          }
        } else {
          // console.log("msg", data);
          if (data === "invalid id") {
            //无效id时候的动作
            massage.textContent = window._t("Invalid code", window.lang);
            window.running = false;
            ws.close();
          } else if (data === "queried") {
            massage.textContent = window._t(
              "Queried, waiting for results...",
              window.lang
            );
          } /* else if (data === 'bye') {
        }*/ else if (
            data.substr(0, 5) === "error"
          ) {
            var reason = data.substr(6);
            massage.textContent =
              window._t("Error: ", window.lang) +
              window._t(window.errors[reason] || reason, window.lang);
            window.running = false;
          }
        }
      };
      ws.binaryType = "arraybuffer";
      //开始链接
      ws.onopen = function() {
        console.log("开始链接");
        ws.send(cmd.join(" "));
        massage.textContent = window._t("Request sent", window.lang);
      };
      //结束的时候
      ws.onclose = function() {
        console.log("结束通信");
        if (window.running) {
          massage.textContent = window._t("Completed", window.lang);
          window.running = false;
          //延迟5s
          setTimeout(function() {
            massage.textContent = "";
          }, 2000);
          // this.$router.push({path:'yonghu'})
          console.log(window.scroes);
          console.log(window.userinfo);
          console.log(window.songtitle);
          ppp.$router.push({ path: "yonghu/zuij" });
        }
      };

      // this.$router.push({path:'yonghu'})
    },
    //回车键监听事件
    huichu(e) {
      // console.log(e);
      if (e.keyCode == 13) {
        this.$refs.haoyouma.blur();
        this.caixun();
      }
    }
  }
};
</script>
<style scoped>
.denglu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.denglu_box {
  border: 1px solid red;
  width: 200px;
  height: 200px;
  flex: 0;
}
</style>