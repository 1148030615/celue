<template>
  <div class="main">
      <div class="headers fencheng">
          <div class="nav">
            <div :class="{active:fenlei==1}"  @click="setFenlei(1)">短线策略</div>
            <div :class="{active:fenlei==2}"  @click="setFenlei(2)">趋势策略</div>
            <div :class="{active:fenlei==3}"  @click="setFenlei(3)">合约策略</div>
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
          <span>军师提醒：{{todayData.intelligent_str}}</span>
        </div>
    </div>


      <div class="zunque">
        <div class="chart_title" v-if="fenlei==1">火币,{{Scurrency}}/USDT,15分</div>
        <div class="chart_title" v-else-if="fenlei==2">火币,{{Scurrency}}/USDT,日K</div>
        <div class="chart_title" v-else>OKEX,{{Scurrency}}/USDT,15分</div>
      </div>
    <div class="chart_content" v-if="isvip">
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
            <span>时间：{{todayData.date}}</span>
            <span>价格：{{todayData.price}}</span>
          </div>
          <div>
            <span>止损：{{todayData.damage_price}}</span>
            <span>止盈：{{todayData.stop_surplus_price}}</span>
          </div>
      </div>
      <div class="newCelue boxsize">
        <span class="newCelue_text">【军师提醒】:</span>{{todayData.describe}}
      </div>
    </div>



    <div class="du_exchange"  v-show="fenlei == 1 && !isvip" style="display: none" @click="exchange(fenlei)">
        <div class="c1">
          短线策略基于15分钟K线图的走势统计做出的决策提示，平均持仓周期1-10小时。
        </div>
        <div class="c2">
            <div>{{intelligent_setting[fenlei]?intelligent_setting[fenlei].dayPrice:''}} BJS/天</div>
            <div>{{intelligent_setting[fenlei]?intelligent_setting[fenlei].monPrice:''}} BJS/月</div>
        </div>
        <div class="btn">
          <img src="../assets/dh_btn.png">
        </div>
        <div class="c3">
          风险提示：智能策略仅供参考，不构成投资建议。市场有风险，请谨慎操作。
        </div>
    </div>
    <div class="du_exchange"  v-show="fenlei == 2 && !isvip" style="display: none" @click="exchange(fenlei)">
        <div class="c1">
          趋势策略基于日线图的走势统计做出的决策提示，最大回撤率5%，标准化抓取趋势行情。
        </div>
        <div class="c2">
            <div>{{intelligent_setting[fenlei]?intelligent_setting[fenlei].monPrice:''}} BJS/月</div>
        </div>
        <div class="btn">
          <img src="../assets/dh_btn.png">
        </div>
        <div class="c3">
          风险提示：智能策略仅供参考，不构成投资建议。市场有风险，请谨慎操作。
        </div>
    </div>

    <div class="du_exchange"  v-show="fenlei == 3 && !isvip" style="display: none" @click="exchange(fenlei)">
        <div class="c1">
          合约策略基于周合约15分钟K线图的走势统计1做出的决策提示，平均持仓周期1-10小时。
        </div>
        <div class="c2">
            <div>{{intelligent_setting[fenlei]?intelligent_setting[fenlei].dayPrice:''}} BJS/天</div>
            <div>{{intelligent_setting[fenlei]?intelligent_setting[fenlei].monPrice:''}} BJS/月</div>
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




    <ul class="celue-list box-size" v-if='isvip'>
        <li class="celue_item" v-for="item in intelligent_conduct">
            <div class="celue_item_date">
                <div>{{item.date.split(' ')[0]}}</div>
                <span>{{item.date.split(' ')[1]}}</span>
            </div>
            <div class="celue_item_icon">
                <img src="../assets/red_icon.png" v-if="item.type == 0">
                <img src="../assets/green_icon.png" v-else>
            </div>
            <div class="celue_item_r boxsize Payed">
                  <div class="celue_item_rtitle">
                      <div>{{item.symbol}}</div>
                  </div>
                  <div class="celue_item_r_zy">
                      <div>
                        <span>价格：{{item.value}}</span>
                        <span>止盈：{{item.stop_surplus_price}}</span>
                      </div>
                      <div>
                        <span>止损：{{item.damage_price}}</span>
                      </div>
                  </div>
                  <div class="celue_item_r_content boxsize">
                      <span class="newCelue_text">【军师提醒】：</span>{{item.describe}}
                  </div>
                  <div class="more" @click="setOpen(item.id,item.isday)">
                    查看详情
                  </div>
            </div>
        </li>
    </ul>

    <ul class="celue-list box-size" v-else v-bind:class="{'celue-list-no' :intelligent_conduct.length==0}">
        <li class="celue_item" v-for="item in intelligent_conduct">
            <div class="celue_item_date">
                <div>{{item.date.split(' ')[0]}}</div>
                <span>{{item.date.split(' ')[1]}}</span>
            </div>
            <div class="celue_item_icon">
                <img src="../assets/noicon.png">
            </div>
            <div class="celue_item_r notPay boxsize" @click="exchange(fenlei)">
                  <div class="notPay_Left">
                      <div>{{item.symbol}}</div>
                      <span>价格：*****</span>
                  </div>
                  <div class="notPay_view">查看</div>
            </div>
        </li>
        <li v-if="intelligent_conduct.length==0" class="notreplay">
          暂时还没有进行中策略哦！
        </li>
        <li>
          <div class="loadmore" v-if="intelligent_conduct.length>=5 && intelligent_conduct.length<pageTotal" @click="getIntelligent_conduct()">
            <img src="../assets/more.png">
          </div>
        </li>
        
    </ul>

    <div class="replay-title boxsize">
        历史策略
    </div>  


    <ul class="celue-list box-size" v-bind:class="{'celue-list-no' :intelligent_yesterday.length==0}">
    
        <li class="celue_item" v-for="(item,index) in intelligent_yesterday" v-bind:class="{ active: item.opened }">
            <div class="celue_item_date">
                <div>{{item.date.split(' ')[0]}}</div>
                <span>{{item.date.split(' ')[1]}}</span>
            </div>
            <div class="celue_item_icon">
                <img src="../assets/red_icon.png" v-if="item.type == 0">
                <img src="../assets/green_icon.png" v-else>
            </div>
            <div class="celue_item_r boxsize Payed celue_history" >
                  <div class="title">
                      <div class="title-l">
                          <div>{{item.symbol}}</div>
                          <span>价格:{{item.value}}</span>
                      </div>
                      <div class="title-r">
                          <div>收益率</div>
                          <span>{{item.rate>0?("+"+item.rate):(item.rate)}}%</span>
                      </div>
                  </div>

                  <!-- <div class="celue_item_r_zy">
                      <div>
                        <span>止盈：{{item.stop_surplus_price}}</span>
                        <span>止损：{{item.damage_price}}</span>
                      </div>
                  </div>
                  <div class="celue_item_r_content boxsize">
                      <span class="newCelue_text">【军师提醒】：</span>{{item.describe}}
                  </div> -->

                  <!-- <div class="more" @click="setOpen(index,false)" v-if="item.opened">
                    收起
                  </div> -->
                  <div class="more" @click="setOpen(item.id,item.isday)">
                    查看详情
                  </div>

                  
            </div>
           
        </li>

        <li v-if="intelligent_yesterday.length==0" class="notreplay">
          暂时还没有历史策略哦！
        </li>
        
        <li>
          <div class="loadmore" v-if="intelligent_yesterday.length>=5 && intelligent_yesterday.length<hpageTotal" @click="getIntelligent_yesterday()">
            <img src="../assets/more.png">
          </div>
        </li>
    </ul>



    <!-- 回复列表 -->
    <div class="replay-title boxsize">
        交流区
    </div>  
    <ul class="replay-list" id="replayinput">
        <li class="replay_item boxsize" v-for="(item,index) in replaylist">
            <div class="replay_item_row1">
                <div class="left">
                  <img :src="item.member_avatar">
                  <span>{{item.nickname}}</span>
                </div>
                <div class="right">
                  {{item.format_time}}
                </div>
            </div>

            <div class="replay_item_row2 ">
                <div class="replay_item_content">
                  {{item.content}}
                </div>   
                <div class="c-replay boxsize" v-if="item.reply.length>0">
                    <div v-for="items in item.reply">

                        <span class="names">{{items.nickname}}:</span>{{items.content}}

                    </div>
                </div>
            </div>

            <div class="replay_item_row3">
              <div @click="zan(item.comment_id,item.is_praise)">
                <img src="../assets/zhaned.png" v-if="item.is_praise">
                <img src="../assets/zan.png" v-else>
                
                <span>
                  {{item.total_praise}}
                </span>
              </div>
              <div @click="setreplay(item.comment_id,item.nickname)">
                <img src="../assets/replay.png">
                <span>
                  {{item.total_comment}}
                </span>
              </div>
            </div>

        </li>
        <li v-if="replaylist.length==0" class="notreplay">
          暂时还没有评论哦！
        </li>
    </ul>


    <div class="replay_form boxsize" v-if="showreplayInput">
      <input  type="input" v-model="replay_msg" :placeholder="placeholder" class="replay_form_input boxsize">
        <div class="replay_form_btn" @click="replay">
          <img src="../assets/replayicon.png"/>
        </div>
    </div> 


    <!-- 弹窗 -->

    <div class="content-mod" v-if="showmod">
        
      <div class="chart_content">
        <v-chart :options="kline2" class="charts" style="width: 690px" />

        <div class="Chart1_tip">
          <div class="view">
            <div class="tips"><img src="../assets/up.png" class="icons">  买入  , <img src="../assets/down.png" class="icons"> 卖出，  <i class="icon_duo"></i> 多 , <i class="icon_kong"></i>  空</div>
          </div>
        </div>
        

        <div class="newPrice boxsize">
            <div>
              <span>时间：{{modData.date}}</span>
              <span>价格：{{modData.price}}</span>
            </div>
            <div>
              <span>止损：{{modData.damage_price}}</span>
              <span>止盈：{{modData.stop_surplus_price}}</span>
            </div>
        </div>
        <div class="newCelue boxsize">
          <span class="newCelue_text">【军师提醒】:</span>{{modData.describe}}
        </div>
      </div>


      <div class="closeMod" @click="hidemode()"></div>
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
      fenlei: 1, //顶部3大分类 1短线策略 2趋势策略 3合约策略
      replay_msg: "", //输入框恢复文本
      intelligent_list: "", //币种列表{BTC: 1, EOS: 3, BCH: 4, ETH: 5}
      intelligent_setting: [], //价格配置
      intelligent_conduct: [], //进行中的策略
      todayData: {}, //今日策略标点图表数据
      intelligent_yesterday: [], //历史策略列表
      hpageTotal: 10000, //历史策略列表个数
      hpage: 2, //历史策略列表页码
      pageTotal: 10000, //策略列表个数
      page: 3, //策略列表页码
      modData: {}, //弹框数据
      showmod: false, //显示弹窗
      showreplayInput:false,
      replaylist: [],
      klinedata: { Kline: [] },
      placeholder: "说说你的看法",
      replayid: 0,
      replayuser: false, //是否回复评论
      loadData: false,
      userid: false,
      Scurrency: "BTC",
      selectIcon: currency["BTC"]["icon"],
      isvip: false,
      selsect_bar: 0,
      kline: chartFun.getOption([], [], []),
      kline2: chartFun.getOption([], [], []),
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
    /*
     * 判断是否为测试环境
     */
    if (chartFun.isdev() == "test") {
      apiurl = config.devApiPath;
    }

    //let userid = chartFun.GetQueryString('userid');
    chartFun.getUrlParms("object_type") &&
      (this.fenlei = chartFun.getUrlParms("object_type"));
    chartFun.getUrlParms("symbol") &&
      (this.Scurrency = chartFun.getUrlParms("symbol"));

    /**
     * 获取用户id
     */
    this.userid = chartFun.getUrlParms("userid");
    this.markPointList = chartFun.clearPoint(this.pointArray);
    this.getKlinedata();
    this.getallData();
    setTimeout(() => {
      this.getReplayList();
    }, 1500);

    // 定时一分钟请求一次数据
    setInterval(() => {
      this.getKlinedata();
      this.getallData();
    }, 60000);
    this.initevent()
  },

  methods: {
    /**
     * 新版智能策略所有数据的统一接口
     *  */
    getallData() {
      this.page = 2;
      this.hpage = 2;
      var that = this;
      chartFun.Ajax.post(
        apiurl + "api/intelligent_unified",
        "symbol=" +
          this.Scurrency +
          "&member_id=" +
          this.userid +
          "&object_type=" +
          this.fenlei,
        function(res) {
          var data = JSON.parse(res);
          if (data.code == 1) {
            let resData = data.data;

            //判断是否是vip
            if (resData.is_buy == 1) {
              that.isvip = true;
            } else {
              that.isvip = false;
            }
            //画收益率
            if (resData.today_accuracyrate) {
              chartFun.ring(
                "mycanvas",
                (2 * Math.PI) / 3,
                resData.today_accuracyrate
              );
            } else {
              chartFun.ring("mycanvas", (2 * Math.PI) / 3, 0);
            }
            that.todayData = resData;

            //设置价格
            let temp = {};
            resData.list_price.map(d => {
              temp.ic_type = d.ic_type;
              if (d.day == "天") {
                temp.dayPrice = d.price;
              } else if (d.day == "月") {
                temp.monPrice = d.price;
              }
            });
            that.intelligent_setting[that.fenlei] = temp;

            //今日策略标点
            that.pointArray = resData.list_today;
            that.markPointList = chartFun.clearPoint(resData.list_today);

            that.todayData = data.data;
            that.setData(that.klinedata);
            // intelligent_conduct  进行中策略
            that.intelligent_conduct = resData.list_conduct;

            // intelligent_yesterday 历史策略
            that.intelligent_yesterday = resData.list_history;
          }
        }
      );
    },

    /**
     * 评论
     */
    replay() {
      if (this.userid) {
        if (!this.replay_msg) {
          alert("请输入回复内容");
          return;
        }
        let typeArray = {
          ETH: "100001",
          BCH: "100002",
          BTC: "100003",
          EOS: "100004"
        };
        let object_id = typeArray[this.Scurrency];
        let typeArr = [0, 4, 5, 6];
        let type = typeArr[this.fenlei];

        let postdata =
          "type=" +
          type +
          "&member_id=" +
          this.userid +
          "&object_id=" +
          object_id +
          "&content=" +
          this.replay_msg;

        if (this.replayuser) {
          // 回复评论
          postdata =
            "type=" +
            type +
            "&member_id=" +
            this.userid +
            "&object_id=" +
            object_id +
            "&content=" +
            this.replay_msg +
            "&is_reply=1&pid=" +
            this.replayid;
        }

        this._ajaxRepaly(postdata);
      }
    },
    _ajaxRepaly(postdata) {
      let that = this;
      chartFun.Ajax.post(apiurl + "api/comments", postdata, function(res) {
        that.replay_msg = "";
        that.replayuser = false;
        that.placeholder = "说说你的看法";
        that.getReplayList();
      });
    },
    /**
     * 获取评论列表
     */
    getReplayList() {
      let typeArray = {
        ETH: "100001",
        BCH: "100002",
        BTC: "100003",
        EOS: "100004"
      };
      let object_id = typeArray[this.Scurrency];
      let typeArr = [0, 4, 5, 6];
      let type = typeArr[this.fenlei];
      let that = this;
      let postdata =
        "type=" +
        type +
        "&member_id=" +
        this.userid +
        "&object_id=" +
        object_id;

      chartFun.Ajax.post(apiurl + "api/comments_list", postdata, function(res) {
        that.replay_msg = "";
        let data = JSON.parse(res);
        if ((data.data.code = 1)) {
          that.replaylist = data.data.list;
        }
      });
    },
    /**
     * 点赞
     *  @param comment_id
     *   @param is_praise //是否已经点赞
     */
    zan(comment_id, is_praise) {
      var that = this;
      chartFun.Ajax.post(
        apiurl + "api/praise",
        "object_id=" + comment_id + "&member_id=" + this.userid + "&type=1",
        function(res) {
          var data = JSON.parse(res);
          if (data.code == 1) {
            that.getReplayList();
          }
        }
      );
    },
    /**
     * 设置回复的评论
     */
    setreplay(comment_id, name) {
      this.replayuser = !this.replayuser;
      if (this.replayuser) {
        this.placeholder = "回复：" + name;
        this.replayid = comment_id;
      } else {
        this.placeholder = "说说你的看法";
        this.replayid = comment_id;
      }
    },

    /**
     * 顶部三个分类切换
     *  */
    setFenlei(id) {
      // this.getUserType();
      // this.intelligent_today();
      this.fenlei = id;
      this.getallData();

      this.getKlinedata();
      this.getReplayList();
    },
    //ajax获取K线图
    getKlinedata() {
      let that = this;
      let period = "15min"; //K线类型 1min, 5min, 15min, 30min, 60min, 1day, 1mon, 1week, 1year
      let isok = 0; //是否读取合约策略K线 需要传1，不需要不传
      if (this.fenlei == 2) {
        period = "1day";
      } else if (this.fenlei == 3) {
        period = "15min";
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
          that.klinedata = data.data;
          that.setData(that.klinedata);
        }
      });
    },

    //获取今日策略
    intelligent_today() {
      var that = this;
      chartFun.Ajax.post(
        apiurl + "api/intelligent_today",
        "pageSize=10000&symbol=" +
          this.Scurrency +
          "&member_id=" +
          this.userid +
          "&object_type=" +
          this.fenlei,
        function(res) {
          var data = JSON.parse(res);
          if (data.code == 1) {
            that.pointArray = data.data.list;
            that.markPointList = chartFun.clearPoint(data.data.list);
            console.log(that.markPointList);
            that.date_str = data.data.date_str;
            that.todayData = data.data;
            console.log("11111111", data.data);
            //chartFun.ring("mycanvas", (2 * Math.PI) / 3, '95.23');
            if (data.data.today_accuracyrate) {
              chartFun.ring(
                "mycanvas",
                (2 * Math.PI) / 3,
                data.data.today_accuracyrate
              );
            } else {
              chartFun.ring("mycanvas", (2 * Math.PI) / 3, 0);
            }
          }
          //获取策略进行中
          that.getIntelligent_conduct();
        }
      );
    },
    /**
     * 币种切换
     */
    setCurrency(val) {
      this.Scurrency = val;
      this.socketSendData = {
        symbol: currency[val]["enname"],
        period: "15min",
        coinName: currency[val]["name"],
        size: 100
      };

      this.selectIcon = currency[val]["icon"];
      this.getKlinedata();
      this.getallData();
      setTimeout(() => {
        this.getReplayList();
      }, 1500);
    },
    /**
     * 点击兑换按钮
     */
    exchange(ic_type) {
      ic_type = ic_type;
      if (chartFun.isIos()) {
        window.webkit.messageHandlers.exchange.postMessage(ic_type);
      } else {
        location.href = "http://baidu.com?" + ic_type;
      }
    },

    /**
     * 获取策略进行中
     */

    getIntelligent_conduct() {
      let that = this;
      chartFun.Ajax.post(
        apiurl + "api/intelligent_conduct",
        "pageSize=5&symbol=" +
          this.Scurrency +
          "&object_type=" +
          this.fenlei +
          "&page=" +
          that.page,
        function(res) {
          var data = JSON.parse(res);
          if (data.code == 1) {
            //that.intelligent_conduct = data.data.list;

            that.intelligent_conduct = data.data.list.concat(
              that.intelligent_conduct
            );
            that.pageTotal = data.data.pageTotal;
            that.page = that.page + 1;
          }
        }
      );
    },

    /**
     * 获取历史策略列表
     */
    getIntelligent_yesterday() {
      let that = this;
      chartFun.Ajax.post(
        apiurl + "api/intelligent_yesterday",
        "pageSize=5&symbol=" +
          this.Scurrency +
          "&object_type=" +
          this.fenlei +
          "&page=" +
          that.hpage,
        function(res) {
          var data = JSON.parse(res);
          if (data.code == 1) {
            that.intelligent_yesterday = data.data.list.concat(
              that.intelligent_yesterday
            );
            that.hpageTotal = data.data.pageTotal;
            that.hpage = that.hpage + 1;
          }
        }
      );
    },
    /**
     * 获取弹窗K线
     */
    getModKline(date, list) {
      let that = this;
      let period = "15min"; //K线类型 1min, 5min, 15min, 30min, 60min, 1day, 1mon, 1week, 1year
      let isok = 0; //是否读取合约策略K线 需要传1，不需要不传
      if (this.fenlei == 2) {
        period = "1day";
      } else if (this.fenlei == 3) {
        period = "15min";
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
        isok +
        "&isday=" +
        date;
      chartFun.Ajax.post(apiurl + "api/Kline", postdata, function(evt) {
        let data = JSON.parse(evt);
        if (data.code == -1) {
        } else {
          var datas = data.data;
          console.log(datas);
          //that.klinedata = data.data;
          that.setModData(datas, list);
        }
      });
    },
    /**
     * 设置弹窗K线数据
     */
    setModData(datas, pointArray) {
      let Kline = datas.kline;
      if (Kline < 5) {
        return;
      }
      let that = this;
      let market = datas.market;
      let lineData = chartFun.splitline(Kline);

      let markPointList = chartFun.clearPoint(pointArray);

      var PointRelList = chartFun.getPointRelList(
        lineData.categoryData,
        lineData.values,
        pointArray
      );
      var option = chartFun.getOption(lineData, markPointList, PointRelList);
      that.kline2 = option;
    },
    getModData(id, datas) {
      let that = this;
      chartFun.Ajax.post(
        apiurl + "api/get_intelligent_info",
        "id=" + id,
        function(data) {
          let res = JSON.parse(data);
          if (res.code == 1) {
            that.modData = res.data;
            that.getModKline(datas, res.data.list);
          }
        }
      );

      //modData
    },
    //关闭弹窗
    hidemode() {
      this.showmod = false;
      //this.kline2= chartFun.getOption([], [], []);
      this.modData = {};
    },
    /**
     * 历史策略列表展开、收起
     */

    setOpen(id, isday) {
      this.getModData(id, isday);
      this.showmod = true;
      return;

      let data = this.intelligent_yesterday;
      if (!data[index].opened) {
      } else {
        this.showmod = false;
      }
      data[index].opened = opened;
      this.intelligent_yesterday = [];
      this.intelligent_yesterday = data;
      console.log(index, data[index]);
    },
    //整理返回数据
    setData(datas) {
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
    },
    initevent() {
    let that = this;
    window.onscroll = function() {
      let documentClientHeight = document.documentElement.clientHeight || window.innerHeight;
      let htmlElementClientTop = document.getElementById("replayinput").getBoundingClientRect().top;
      console.log(documentClientHeight, htmlElementClientTop);
      if (documentClientHeight >= htmlElementClientTop) {
        that.showreplayInput = true;
      } else {
        that.showreplayInput = false;
      }
    };
  }
  },
  
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
</style>

