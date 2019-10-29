<template>
  <div id="app">
    <router-view class="view_zhu" />
  </div>
</template>



<script>
export default {
  data: function() {
    return {
      ppt: 5
      // Appsuju:suju
    };
  },
  mounted() {},
  methods: {
    
    //   var cmd = ["214389221"];
    //   var ws = new WebSocket("wss://arc.estertion.win:616");
    //   ws.binaryType = "arraybuffer";
    //   // rrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
    //   ws.onerror = function(e) {
    //     // 通信发生错误时触发,提示链接失败
    //     // statusMsg.textContent = _t('Connect failed', lang);
    //     // running = false;
    //     console.log(e);
    //   };

    //   ws.onmessage = function(e) {
    //     // console.log(e)
    //     let data = e.data;
    //     // console.log('b',data);
    //     if (data.byteLength) {
    //       //broti解压
    //       data = window.BrotliDecompress(new Uint8Array(data));
    //       //对里面的数字转义
    //       data = String.fromCharCode.apply(String, data);
    //       //通过json转化为obj
    //       data = JSON.parse(decodeURIComponent(escape(data)));
    //       console.log(data);
    //       // console.log(window.DEBUG);
    //       if (window.DEBUG) console.log("msg", e.data.byteLength, data);
    //       switch (data.cmd) {
    //         case "constants": {
    //           console.log(1, data.data);
    //         }
    //       }

    //       // console.log(data);
    //     }
    //   };
    //   ws.onclose = function(e) {
    //     console.log("结束通信", e);
    //   };
    //   ws.onopen = function(e) {
    //     console.log("结束通信", e);

    //     ws.send(cmd.join(""));
    //   };
    // }
  }
};
</script>

<style>
body,html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.view_zhu {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #efeff4;
}
</style>
