<template>
  <div class="main">


      <div class="headers">
          <div class="nav">
            <div :class="{active:fenlei==0}"  @click="setFenlei(0)">短线策略</div>
            <div :class="{active:fenlei==1}"  @click="setFenlei(1)">趋势策略</div>
            <div :class="{active:fenlei==2}"  @click="setFenlei(2)">合约策略</div>
          </div>

          <div class="header">
            <div :class="{active:Scurrency=='BTC'}" @click="setCurrency('BTC')">BTC</div>
            <div :class="{active:Scurrency=='ETH'}" @click="setCurrency('ETH')">ETH</div>
            <div :class="{active:Scurrency=='BCH'}" @click="setCurrency('BCH')">BCH</div>
            <div :class="{active:Scurrency=='EOS'}" @click="setCurrency('EOS')">EOS</div>
          </div>
      </div>

      

      <div class="bInfo">
        <div class="bInfo_left">
          <div class="bInfo-name"><img :src="selectIcon"><span>{{Scurrency}}</span></div>
              <div class="bInfo-cny" v-bind:class="{redColor : (market.Increase<0)}">
                <strong>{{market.close}}USDT</strong>
                <span>{{market.Increase>0?"+"+market.Increase:market.Increase}}%</span>
              </div>
            <div class="bInfo-my">≈￥{{market.close_CNY}}</div>
        </div>
        <div class="bInfo_right">
            <canvas id="mycanvas" ref="mycanvas"></canvas>
            <span>月收益率</span>
        </div>

        
      
      </div>

    <div class="replay-title boxsize">
        今日策略
    </div> 

    <div class="msg_bar">
        <div class="msg_bar_cont boxsize">
          <div class="icon">
            <img src="../assets/laba@3x.png">
          </div>
          <span>军师提醒：今日策略已经发布，请速速上车哦~</span>
        </div>

    </div>


      <!-- <div class="selsect_bar">
        <div :class="{active:selsect_bar==0}" @click="setSelectedBar(0)">昨日策略</div>
        <div :class="{active:selsect_bar==1}" @click="setSelectedBar(1)">今日策略</div>
      </div> -->

      <div class="zunque">
        <div class="chart_title">火币,{{Scurrency}}/USDT,15分</div>
      </div>
    <div class="chart_content">
      <v-chart :options="kline" class="charts" style="width: 690px" />

      <div class="Chart1_tip">
        <div class="view">
          <!--<div><img src="../assets/duo.png"><span>多</span></div>-->
          <!--<div><img src="../assets/kong.png"><span>空</span></div>-->
          <div class="tips"><img src="../assets/up.png" class="icons">  买入  , <img src="../assets/down.png" class="icons"> 卖出，  <i class="icon_duo"></i> 多 , <i class="icon_kong"></i>  空</div>
        </div>
      </div>
      

      <div class="newPrice boxsize">
          <div>
            <span>时间：2018.10.17 12:32:12</span>
            <span>价格：￥1232.123</span>
          </div>
          <div>
            <span>止损：2018.10.17 12:30:12</span>
            <span>止盈：￥1232.123</span>
          </div>
      </div>
      <div class="newCelue boxsize">
        <span class="newCelue_text">【军师提醒】:</span>莎剧社的编剧把速度集合吧旧时代风格阿斯顿不错就是觉得还不插手的就。
      </div>

      <div class="duihuan" v-show="selsect_bar == 1 && !isvip" style="display: none" @click="exchange()">
        <img src="../assets/main_bg.jpg">
      </div>
    </div>



    <div class="du_exchange">
        <div class="c1">
          短线策略基于15分钟K线图的走势统计做出的决策提示，平均持仓周期1-10小时。
        </div>
        <div class="c2">
            <div>123 BJS/天</div>
            <div>1234 BJS/月</div>
        </div>
        <div class="btn">
          <img src="../assets/dh_btn.png">
        </div>
        <div class="c3">
          风险提示：智能策略仅供参考，不构成投资建议。市场有风险，请谨慎操作。
        </div>
    </div>
    <div class="du_exchange">
        <div class="c1">
          趋势策略基于日线图的走势统计做出的决策提示，最大回撤率5%，标准化抓取趋势行情。
        </div>
        <div class="c2">
            <div>123 BJS/天</div>
            <div>1234 BJS/月</div>
        </div>
        <div class="btn">
          <img src="../assets/dh_btn.png">
        </div>
        <div class="c3">
          风险提示：智能策略仅供参考，不构成投资建议。市场有风险，请谨慎操作。
        </div>
    </div>

    <div class="du_exchange">
        <div class="c1">
          合约策略基于周合约15分钟K线图的走势统计1做出的决策提示，平均持仓周期1-10小时。
        </div>
        <div class="c2">
            <div>123 BJS/天</div>
            <div>1234 BJS/月</div>
        </div>
        <div class="btn">
          <img src="../assets/dh_btn.png">
        </div>
        <div class="c3">
          风险提示：智能策略仅供参考，不构成投资建议。市场有风险，请谨慎操作。
        </div>
    </div>











    <div class="replay-title boxsize">
        策略进行中
    </div>  

    <ul class="celue-list box-size">
        <li class="celue_item">
            <div class="celue_item_date">
                <div>10-17</div>
                <span>14:15:12</span>
            </div>
            <div class="celue_item_icon">
                <img src="../assets/noicon.png">
            </div>
            <div class="celue_item_r notPay boxsize">
                  <div class="notPay_Left">
                      <div>BTC / USD</div>
                      <span>价格：*****</span>
                  </div>
                  <div class="notPay_view">查看</div>
            </div>
        </li>

        <li class="celue_item">
            <div class="celue_item_date">
                <div>10-17</div>
                <span>14:15:12</span>
            </div>
            <div class="celue_item_icon">
                <img src="../assets/red_icon.png">
            </div>
            <div class="celue_item_r boxsize Payed">
                  <div class="celue_item_rtitle">
                      <div>BTC / USD</div>
                  </div>
                  <div class="celue_item_r_zy">
                      <div>
                        <span>价格：1232.123</span>
                        <span>止盈：1232.123</span>
                      </div>
                      <div>
                        <span>止损：1232.123</span>
                      </div>
                  </div>
                  <div class="celue_item_r_content boxsize">
                      <span class="newCelue_text">【军师提醒】：</span>多少次发哈我坝发软文啊来划分不过我和地方是的那吧但是厉一。
                  </div>

            </div>
        </li>

    </ul>


    <div class="replay-title boxsize">
        历史策略
    </div>  


    <ul class="celue-list box-size">
    
        <li class="celue_item">
            <div class="celue_item_date">
                <div>10-17</div>
                <span>14:15:12</span>
            </div>
            <div class="celue_item_icon">
                <img src="../assets/red_icon.png">
            </div>
            <div class="celue_item_r boxsize Payed celue_history">
                  <div class="title">
                      <div class="title-l">
                          <div>BTC / USD</div>
                          <span>价格:1233.321</span>
                      </div>
                      <div class="title-r">
                          <div>收益率</div>
                          <span>+0.39%</span>
                      </div>
                  </div>

                  <div class="celue_item_r_zy">
                      <div>
                        <span>止盈：1232.123</span>
                        <span>止损：1232.123</span>
                      </div>
                  </div>
                  <div class="celue_item_r_content boxsize">
                      <span class="newCelue_text">【军师提醒】：</span>多少次发哈我坝发软文啊来划分不过我和地方是的那吧但是厉一。
                  </div>


                  <div class="more">
                    查看详情
                  </div>
            </div>
           
        </li>



        <li class="celue_item active">
            <div class="celue_item_date">
                <div>10-17</div>
                <span>14:15:12</span>
            </div>
            <div class="celue_item_icon">
                <img src="../assets/green_icon.png">
            </div>
            <div class="celue_item_r boxsize Payed celue_history">
                  <div class="title">
                      <div class="title-l">
                          <div>BTC / USD</div>
                          <span>价格:1233.321</span>
                      </div>
                      <div class="title-r">
                          <div>收益率</div>
                          <span>+0.39%</span>
                      </div>
                  </div>

                  <div class="celue_item_r_zy">
                      <div>
                        <span>止盈：1232.123</span>
                        <span>止损：1232.123</span>
                      </div>
                  </div>
                  <div class="celue_item_r_content boxsize">
                      <span class="newCelue_text">【军师提醒】：</span>多少次发哈我坝发软文啊来划分不过我和地方是的那吧但是厉一。
                  </div>


                  <div class="more">
                    收起
                  </div>
            </div>
           
        </li>
        <li>
          <div class="loadmore">
            <img src="../assets/more.png">
          </div>
        </li>
    </ul>



    <!-- 回复列表 -->
    <div class="replay-title boxsize">
        交流区
    </div>  
    <ul class="replay-list">
        <li class="replay_item boxsize">
            <div class="replay_item_row1">
                <div class="left">
                  <img src="https://weixin.10moban.com/attachment/headimg_2.jpg?time=1539999000">
                  <span>钱多多</span>
                </div>
                <div class="right">
                  2012:10:20
                </div>
            </div>

            <div class="replay_item_row2 ">
                <div class="replay_item_content">
                  简评:在 VSCode 中直接调试真的很舒服,省去很多切换到 Chrome 的时间。 创建...现在可以在我们的 react 应用中添加断点,打开 src/App.js 文件,在代码...
                </div>   
                <div class="c-replay boxsize">
                    <span class="names">雷龙:</span>66666~~
                </div>
            </div>

            <div class="replay_item_row3">
              <div>
                <img src="../assets/zan.png">
                <span>
                  3
                </span>
              </div>
              <div>
                <img src="../assets/replay.png">
                <span>
                  7
                </span>
              </div>
            </div>

        </li>
    </ul>


    <div class="replay_form boxsize">
      <input  type="input" v-model="replay_msg" placeholder="请输入消息" class="replay_form_input boxsize">
        <div class="replay_form_btn" @click="replay">
          <img src="../assets/replayicon.png"/>
        </div>
    </div> 

  </div>
</template>

<script>
var currency = {
  BTC: {
    name: "比特币",
    enname: "btcusdt",
    icon: require("../assets/BTC.png")
  },
  ETH: {
    name: "以太坊",
    enname: "ethusdt",
    icon: require("../assets/ETH.png")
  },
  BCH: {
    name: "比特币现金",
    enname: "bchusdt",
    icon: require("../assets/BCH.png")
  },
  EOS: {
    name: "EOS",
    enname: "eosusdt",
    icon: require("../assets/EOS.png")
  }
};

// const echarts = require('../utils/echarts.min');
//var ECharts = require('vue-echarts');

import EChart from "vue-echarts/components/ECharts";
require("echarts/lib/chart/candlestick");
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/markPoint");
const chartFun = require("../utils/charts.fun");
const config = require("../config/config");
//const ring = require("../utils/circle");
var apiurl = config.developApiPath;
var animated = false;
export default {
  name: "index",
  data() {
    return {
      fenlei: 0, //顶部3大分类 0短线策略 1趋势策略 2合约策略
      replay_msg: "", //输入框恢复文本
      loadData: false,
      userid: false,
      Scurrency: "BTC",
      selectIcon: currency["BTC"]["icon"],
      ws: false,
      isvip: false,
      selsect_bar: 0,
      kline: chartFun.getOption([], [], []),
      //bar:chartFun.getBarOption({volumes:[],categoryData:[]}),
      myChart: false,
      lineData: { categoryData: [], values: [] },
      timer: false,
      markPointList: [],
      market: {},
      today_accuracyrate: false,
      date_str: 0,
      pointArray: [
        {
          way: "1", //0空 1多
          value: "500", //买入或者卖出的值
          type: "1", //0为卖出，1为买入
          pointval: "6430",
          date: "2018/9/25/14/15"
        }
      ],
      socketSendData: {
        symbol: "btcusdt",
        period: "15min",
        coinName: "比特币",
        size: 192
      }
    };
  },
  ready: function() {},
  created: function() {
    setTimeout(() => {
      chartFun.ring("mycanvas", (2 * Math.PI) / 3, 50);
    }, 1500);

    /**
     * 判断是否为测试环境
     */
    if (chartFun.isdev() == "test") {
      apiurl = config.devApiPath;
    }

    console.log(chartFun.isdev());

    //let userid = chartFun.GetQueryString('userid');

    /**
     * 获取用户id
     */
    this.userid = chartFun.getUrlParms("userid");
    console.log(this.userid);
    this.markPointList = chartFun.clearPoint(this.pointArray);

    //this.intelligent_yesterday();
    this.getUserType();

    this.getKlinedata();
    this.getReplayList()
  },

  methods: {
    /**
     * 评论
     */
    replay(){
      console.log(this.userid);
      if(this.userid){
          
          if(!this.replay_msg){
              alert("请输入回复内容");
              return;
          }
          let typeArray={
            "ETH":'100001',
            'BCH':'100002',
            'BTC':'100003',
            'EOS':'100004'
          };
          let typeArr={
            "ETH":'5',
            'BCH':'6',
            'BTC':'4',
            'EOS':'7'
          };
          let object_id = typeArray[this.Scurrency];
          let type = typeArr[this.Scurrency];
          let postdata = 'type='+type+'&member_id='+this.userid+"&object_id="+object_id+"&content="+this.replay_msg;
          this._ajaxRepaly(postdata);

      }
      
    },
    _ajaxRepaly(postdata){
      let that = this;
       chartFun.Ajax.post(apiurl + "api/comments", postdata, function(res) {
            that.replay_msg = "";
       })
    },
    getReplayList(){

      let typeArray={
            "ETH":'100001',
            'BCH':'100002',
            'BTC':'100003',
            'EOS':'100004'
          };
          let typeArr={
            "ETH":'5',
            'BCH':'6',
            'BTC':'4',
            'EOS':'7'
          };
          let object_id = typeArray[this.Scurrency];
          let type = typeArr[this.Scurrency];
      let that = this;
      let postdata = 'type='+type+'&member_id='+this.userid+"&object_id="+object_id;

       chartFun.Ajax.post(apiurl + "api/comments_list", postdata, function(res) {
            that.replay_msg = "";
       })
    },
    /**
     * 顶部三个分类切换
     *  */
    setFenlei(id) {
      this.fenlei = id;
      this.getKlinedata();
    },
    //ajax获取K线图
    getKlinedata() {
      let that = this;
      let period = "15min"; //K线类型 1min, 5min, 15min, 30min, 60min, 1day, 1mon, 1week, 1year
      let isok = 0; //是否读取合约策略K线 需要传1，不需要不传
      if (this.fenlei == 1) {
        period = "1day";
      } else if (this.fenlei == 2) {
        period = "1week";
        isok = 1;
      }

      let postdata =
        "symbol=" +
        that.socketSendData.symbol +
        "&period=" +
        period +
        "&coinName=" +
        that.socketSendData.coinName +
        "&size=195" +
        "&isok=" +
        isok;
      chartFun.Ajax.post(apiurl + "api/Kline", postdata, function(evt) {
        let data = JSON.parse(evt);
        if (data.code == -1) {
        } else {
          //var datas = JSON.parse(evt.data);
          that.setData(data.data);
        }
      });
    },
    //判断是否购买了产品
    getUserType() {
      var that = this;
      chartFun.Ajax.post(
        apiurl + "api/is_buy_intelligent",
        "symbol=" + this.Scurrency + "&member_id=" + this.userid,
        function(res) {
          var data = JSON.parse(res);
          if (data.code == 1) {
            if (data.data.is_buy == 0) {
              that.isvip = false;
            } else {
              that.isvip = true;
            }
          }
        }
      );
    },
  
    intelligent_today() {
      var that = this;
      chartFun.Ajax.post(
        apiurl + "api/intelligent_today",
        "pageSize=10000&symbol=" + this.Scurrency + "&member_id=" + this.userid,
        function(res) {
          var data = JSON.parse(res);
          if (data.code == 1) {
            that.pointArray = data.data.list;
            that.markPointList = chartFun.clearPoint(data.data.list);
            console.log(that.markPointList);
            that.date_str = data.data.date_str;
          }
        }
      );
    },

    setCurrency(val) {
      this.Scurrency = val;
      this.socketSendData = {
        symbol: currency[val]["enname"],
        period: "15min",
        coinName: currency[val]["name"],
        size: 100
      };
      this.selectIcon = currency[val]["icon"];

      if (this.selsect_bar == 0) {
        //this.intelligent_yesterday();
      } else if (this.selsect_bar == 1 && this.isvip) {
        this.intelligent_today();
      }
      //this.ws.send(JSON.stringify(this.socketSendData));
      this.getKlinedata();
    },
    exchange() {
      if (chartFun.isIos()) {
        //window.postMessage("456");
        window.webkit.messageHandlers.exchange.postMessage("12121");
      } else {
        //native.exchange();
        location.href = "http://baidu.com";
      }
    },
    setSelectedBar(val) {
      this.selsect_bar = val;
      this.getKlinedata();
      if (val == 0) {
        this.intelligent_yesterday();
      } else if (val == 1 && this.isvip) {
        this.intelligent_today();
      }
    },

    //整理返回数据
    setData(datas) {
      //let Kline = this.selsect_bar == 0 ? datas.yesterday : datas.kline;
      let Kline = datas.kline;
      if (Kline < 5) {
        return;
      }
      let that = this;

      that.market = datas.market;

      that.lineData = chartFun.splitline(Kline);
      var PointRelList = chartFun.getPointRelList(
        that.lineData.categoryData,
        that.lineData.values,
        that.pointArray
      );

      var option = chartFun.getOption(
        that.lineData,
        that.markPointList,
        PointRelList
      );

      that.kline = option;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
@import "../assets/style/index.css";
</style>
<style>
@import "../assets/style/reset.css";
.tips_font {
  font-size: 20px;
  line-height: 1.4;
}
#app {
  padding-bottom: 100px;
}
</style>

