<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>



<script>
// import brotli1 from "./js/brotli_decompress.min.js"
export default {
  data: function() {
    return {
      // Appsuju:suju
    };
  },
  mounted() {
    window.Highcharts.chart("container", {
      chart: {
        height: 150,
        // backgroundColor: '#425366',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      legend:{
        layout: 'vertical',
        align: 'left',
        x: 50,
        verticalAlign: 'middle',
      },
      title: {
        text: "poi</br>poi"
      },
      spacing:[0,0,0,0],
      tooltip: {
        enabled:false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,            
          },
          showInLegend: true
        }
      },
      series: [
        {
          name: "Brands",
          colorByPoint: true,
          data: [
            {
              name: '大p:1000',
              y: 160,
              sliced: true,
              selected: true
            },
            {
              name: '小p:1000',
              y: 20,
            },
            {
              name: 'far:1000',
              y: 20,
            },
            {
              name: 'miss:1000',
              y: 0,
            }
          ]
        }
      ]
    });
  },
  methods: {
    test() {
      var cmd = ["214389221"];
      var ws = new WebSocket("wss://arc.estertion.win:616");
      ws.binaryType = "arraybuffer";
      // rrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
      ws.onerror = function(e) {
        // 通信发生错误时触发,提示链接失败
        // statusMsg.textContent = _t('Connect failed', lang);
        // running = false;
        console.log(e);
      };

      ws.onmessage = function(e) {
        // console.log(e)
        let data = e.data;
        // console.log('b',data);
        if (data.byteLength) {
          //broti解压
          data = window.BrotliDecompress(new Uint8Array(data));
          //对里面的数字转义
          data = String.fromCharCode.apply(String, data);
          //通过json转化为obj
          data = JSON.parse(decodeURIComponent(escape(data)));
          console.log(data);
          // console.log(window.DEBUG);
          if (window.DEBUG) console.log("msg", e.data.byteLength, data);
          switch (data.cmd) {
            case "constants": {
              console.log(1, data.data);
            }
          }

          // console.log(data);
        }
      };
      ws.onclose = function(e) {
        console.log("结束通信", e);
      };
      ws.onopen = function(e) {
        console.log("结束通信", e);

        ws.send(cmd.join(""));
      };
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
</style>
