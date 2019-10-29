<template>
  <div>
    <div class="paixu">
      <div class="leibei" @click="gai_zhonglei">{{lei[zhonglei]}}</div>
      <div class="avgb30">PPT:9.56</div>
      <div class="shengjian" @click="gai_paixu">{{paixu==0?'升序':'降序'}}</div>
    </div>
    <div class="list_bbox">
      <div
        class="list_box"
        v-for="(i,j) in scores"
        :key="i.song_id+i.difficulty"
        @click="shengclie(i.song_id+i.difficulty)"
      >
        <div class="list_title">
          <div class="songname">{{(j+1)+'.'+i.song_id}}</div>
          <div class="scroes">{{xianshiyupail(i)}}</div>
        </div>
        <div>
          <div :id="i.song_id+i.difficulty" style="min-width:100%;height:0px"></div>
        </div>
      </div>

      <!-- <transition-group
        @before-leave="listtitle_before_leave"
        @leave="listtitle_leave"
        @after-leave="listtitle_after_leave"
        @before-enter="listtitle_before_enter"
        @enter="listtitle_enter"
        @after-enter="listtitle_after_enter"
      >-->
      <!-- </transition-group> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scores: null,
      paixu: 0,
      zhonglei: 0,
      lei: ["PPT", "分数", "日期"],
      pingding: [
        "Track Lost",
        "Normal Clear",
        "Full Recall",
        "Pure Memory",
        "Easy Clear",
        "Hard Clear"
      ]
    };
  },
  beforeMount() {
  
      this.scores = window.scroes;
    
    // console.log(this.scores)

    this.scores.sort(function(i, j) {
      return i.rating - j.rating;
    });
    console.log(this.scores);
  },
  methods: {
    scros_fn(i) {
      return [i.slice(-9, -6), i.slice(-6, -3), i.slice(-3)].join(",");
    },
    gai_zhonglei() {
      this.zhonglei++;
      this.zhonglei = this.zhonglei % 3;
      this.$options.methods.paixu_fn.bind(this)();
    },
    gai_paixu() {
      this.paixu++;
      this.paixu = this.paixu % 2;
      this.$options.methods.paixu_fn.bind(this)();
    },
    xianshiyupail(i) {
      if (this.zhonglei == 1) {
        return this.$options.methods.scros_fn(i.score + "");
      } else if (this.zhonglei == 2) {
        let date = new Date(i.time_played);
        let ts = date.getTime(),
          now = Date.now();
        if (date.getFullYear() == new Date().getFullYear()) {
          if (date.getMonth() == new Date().getMonth()) {
            if (date.getDate() == new Date().getDate()) {
              return (
                window.check(date.getHours()) +
                ":" +
                window.check(date.getMinutes())
              );
            }
            var day = Math.floor((now - ts) / 24 / 3600e3);
            return day + " day" + (day == 1 ? "" : "s") + " ago";
          }
          return (
            window.check(date.getMonth() + 1) +
            "/" +
            window.check(date.getDate())
          );
        }
        return (
          (date.getFullYear() + "").substr(2) +
          "/" +
          window.check(date.getMonth() + 1) +
          "/" +
          window.check(date.getDate())
        );
      } else if (this.zhonglei == 0) {
        return i.rating.toFixed(2);
      }
    },
    paixu_fn() {
      //   console.log(12);
      //   console.log(this.zhonglei);
      switch (this.zhonglei) {
        case 0: {
          //   console.log(this.paixu);

          if (this.paixu == 0) {
            this.scores = this.scores.sort(function(i, j) {
              return i.rating - j.rating;
            });
          } else {
            this.scores = this.scores.sort(function(i, j) {
              return j.rating - i.rating;
            });
          }
          break;
        }
        case 1: {
          //   console.log(this.paixu);

          if (this.paixu == 0) {
            this.scores = this.scores.sort(function(i, j) {
              return i.score - j.score;
            });
          } else {
            this.scores = this.scores.sort(function(i, j) {
              return j.score - i.score;
            });
          }
          break;
        }
        case 2: {
          //   console.log(this.paixu);

          if (this.paixu == 0) {
            this.scores = this.scores.sort(function(i, j) {
              return i.time_played - j.time_played;
            });
          } else {
            this.scores = this.scores.sort(function(i, j) {
              return j.time_played - i.time_played;
            });
          }
          break;
        }
      }
    },
    shengclie(ming) {
      let aobj = null;
      for (let i in this.scores) {
        if (this.scores[i].song_id == ming.slice(0, ming.length - 1)) {
          aobj = this.scores[i];
          //   console.log(aobj);
          break;
        }
      }
      if (document.querySelectorAll("#" + ming)[0].style.height == "0px") {
        document.querySelectorAll("#" + ming)[0].style.height = "200px";
        console.log(aobj);
        window.Highcharts.chart(ming, {
          chart: {
            height: 200,
            backgroundColor: "#efeff4",
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
            marginRight: 0,
            marginLeft: 0
          },
          legend: {
            floating: true,
            align: "left",
            layout: "vertical",
            verticalAlign: "middle",
            itemDistance: 10
          },
          title: {
            margin: 0,
            text: aobj.song_id
          },
          labels: {
            items: [
              {
                html: "铺面ppt:" + aobj.constant.toFixed(2),
                style: {
                  top: 0,
                  left: 230
                }
              },
              {
                html:
                  "分数:" +
                  [
                    (aobj.score + "").slice(-9, -6),
                    (aobj.score + "").slice(-6, -3),
                    (aobj.score + "").slice(-3)
                  ].join(","),
                style: {
                  top: 20,
                  left: 230
                }
              },
              {
                html: this.pingding[aobj.Clear_type],
                style: {
                  top: 120,
                  left: 240
                }
              }
            ],
            style: {
              // 标签全局样式
              fontSize: "15px",
              fontWeight: "normal",
              color: "black"
            }
          },
          tooltip: {
            enabled: false
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: false
              },
              showInLegend: true,
              point: {
                events: {
                  legendItemClick: function() {
                    return false;
                  }
                }
              }
            }
          },
          series: [
            {
              name: "Brands",
              colorByPoint: true,

              data: [
                {
                  name: "大p:" + aobj.shiny_perfect_count + "",
                  y: aobj.shiny_perfect_count
                },
                {
                  name:
                    "小p:" +
                    (aobj.perfect_count - aobj.shiny_perfect_count) +
                    "",
                  y: aobj.perfect_count - aobj.shiny_perfect_count
                },
                {
                  name: "far:" + aobj.near_count + "",
                  y: aobj.near_count
                },
                {
                  name: "miss:" + aobj.miss_count + "",
                  y: aobj.miss_count
                }
              ]
            }
          ]
        });
      } else {
        document.querySelectorAll("#" + ming)[0].style.height = "0px";
      }
    }
    // listtitle_before_leave(e) {
    //   e.style.transform = "translateX(0)";
    //   e.offsetWidth;
    // },
    // listtitle_leave(e) {
    //   e.offsetWidth;
    //   e.style.transform = "translateX(-375px)";
    // },
    // listtitle_after_leave(e) {
    //   e.offsetWidth;
    //   e.style.transform = "translateX(-375px)";
    // },

    // listtitle_before_enter(e) {
    //   e.style.transform = "translateX(375px)";
    //   e.offsetWidth;
    // },
    // listtitle_enter(e) {
    //   e.offsetWidth;
    //   e.style.transform = "translateX(0px)";
    // },
    // listtitle_after_enter(e) {
    //   e.offsetWidth;
    //   e.style.transform = "translateX(0px)";
    // }
  }
};
</script>

<style  scoped>
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
.scroes {
  float: right;
}
</style>