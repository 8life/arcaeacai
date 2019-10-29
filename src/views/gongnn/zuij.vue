<template>
  <div class="poi">
    <div class="user_biao">
      <!-- <div>55555555555555555555</div> -->
      <div id="pptjilv" style="max-width:100%;height:50%"></div>
      <div id="songjilv" style="max-width:100%;height:50%"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //ppt日期
      xAxis_ppt: [],
      //ppt值
      data_ppt: [],
      song_id: "",
      shiny_perfect_count: null,
      perfect_count: null,
      near_count: null,
      miss_count: null,

      constant: null,
      rating: null,
      score: null
    };
  },
  mounted() {
    this.$nextTick(function() {
      let infodata = window.userinfo;
      infodata.rating_records.forEach(i => {
        this.xAxis_ppt.push(i[0].slice(2, 4) + "/" + i[0].slice(4));
        this.data_ppt.push(Number(i[1]) / 100);
        // console.log(this.data_ppt);
      });

      this.song_id = infodata.recent_score[0].song_id;
      this.shiny_perfect_count = infodata.recent_score[0].shiny_perfect_count;
      this.perfect_count = infodata.recent_score[0].perfect_count;
      this.near_count = infodata.recent_score[0].near_count;
      this.miss_count = infodata.recent_score[0].miss_count;
      this.constant = infodata.recent_score[0].constant.toFixed(2);
      this.rating = infodata.recent_score[0].rating.toFixed(2);
      this.score = infodata.recent_score[0].score + "";
      // console.log([
      //   window.check(this.score.slice(-9, -6)),
      //   this.score.slice(-6, -3),
      //   this.score.slice(-3)
      // ]);
      this.score = [
        window.check(this.score.slice(-9, -6)),
        this.score.slice(-6, -3),
        this.score.slice(-3)
      ].join(",");
      console.log(this.score);

      window.Highcharts.chart(
        "songjilv",
        {
          colors: [
            "rgb(88, 75, 75)",
            "rgb(235, 232, 80)",
            "rgb(207, 167, 233)",
            "rgb(158, 27, 235)"
          ],
          chart: {
            backgroundColor: "#efeff4",
            spacing: [20, 0, 20, 0]
          },
          title: {
            floating: true,
            text: this.song_id
          },
          tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}</b>"
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {y} ",
                style: {
                  color:
                    (window.Highcharts.theme &&
                      window.Highcharts.theme.contrastTextColor) ||
                    "black"
                }
              }
            }
          },
          labels: {
            items: [
              {
                html: "铺面ppt:" + this.constant,
                style: {
                  top: 0,
                  left: 5
                }
              },
              {
                html: "成绩ppt" + this.rating,
                style: {
                  top: 20,
                  left: 5
                }
              },
              {
                html: "分数:" + this.score,
                style: {
                  top: 40,
                  left: 5
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
          series: [
            {
              type: "pie",
              //环的大小
              innerSize: "80%",
              name: "市场份额",
              data: [
                {
                  name: "miss",
                  y: this.miss_count
                },
                {
                  name: "far",
                  y: this.near_count
                },
                {
                  name: "小P",
                  y: this.perfect_count - this.shiny_perfect_count
                },
                {
                  name: "大P",
                  y: this.shiny_perfect_count
                }
              ]
            }
          ]
        },
        function(c) {
          // 图表初始化完毕后的会掉函数
          // 环形图圆心
          var centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
          // 动态设置标题位置
          c.setTitle({
            y: centerY + titleHeight / 2
          });
        }
      );

      //ppt
      window.Highcharts.chart("pptjilv", {
        chart: {
          backgroundColor: "#efeff4",
          type: "line"
        },
        title: {
          text: "ppt变化"
        },
        xAxis: {
          categories: this.xAxis_ppt
        },
        yAxis: {
          title: null
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          line: {
            dataLabels: {
              // 开启数据标签
              enabled: true
            }
            // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            // enableMouseTracking: false
          }
        },
        series: [
          {
            name: "PPT",
            data: this.data_ppt
          }
        ]
      });
    });
  }
};
</script>
<style scoped>
.user_biao {
  width: 100%;
  height: 100%;
}
</style>