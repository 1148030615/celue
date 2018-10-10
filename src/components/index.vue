<template>
  <div class="main">
      <div class="header">
        <div :class="{active:Scurrency=='BTC'}" @click="setCurrency('BTC')">BTC</div>
        <div :class="{active:Scurrency=='ETH'}" @click="setCurrency('ETH')">ETH</div>
        <div :class="{active:Scurrency=='BCH'}" @click="setCurrency('BCH')">BCH</div>
        <div :class="{active:Scurrency=='EOS'}" @click="setCurrency('EOS')">EOS</div>
      </div>

      <div class="bInfo">
        <div class="bInfo-name"><img :src="selectIcon"><span>{{Scurrency}}</span></div>
        <div class="bInfo-cny" v-bind:class="{redColor : (market.Increase<0)}">
          <strong>{{market.close}}USDT</strong>
          <span>{{market.Increase>0?"+"+market.Increase:market.Increase}}%</span>
        </div>
        <div class="bInfo-my">≈￥{{market.close_CNY}}</div>
        <div class="bInfo-c">
          <span>市值:￥{{market.nowMarket}}</span>
          <span>24H交易量:{{market.amount}}</span>
        </div>
      </div>


      <div class="selsect_bar">
        <div :class="{active:selsect_bar==0}" @click="setSelectedBar(0)">昨日策略</div>
        <div :class="{active:selsect_bar==1}" @click="setSelectedBar(1)">今日策略</div>
      </div>

      <div class="zunque">
        <div class="zunque-date">
          {{date_str}}
        </div>
        <div class="chart_title">火币,{{Scurrency}}/USDT,15分</div>

        <div class="zql_cont" v-show="selsect_bar==0 && today_accuracyrate">当日准确率：<span>{{today_accuracyrate}}</span></div>
      </div>


      <!--<div v-bind:class="{hide:(selsect_bar == 1 && !isvip) } " class="ChartCandlestick">-->
        <!--<div class="Chart1" >-->
          <!--&lt;!&ndash;<v-chart :options="kline" group="radiance" ref="cart1" />&ndash;&gt;-->

          <!---->
      <!--</div>-->




    <!--<div class="chart_title">成交量：{{market.amount}}</div>-->
    <!--<div class="ChartBar ">-->
      <!--<v-chart :options="bar" group="radiance"  ref="cart2" />-->

    <!--</div>-->



    <div class="chart_content">
      <v-chart :options="kline" class="charts" style="width: 690px" />

      <div class="Chart1_tip">
        <div class="view">
          <!--<div><img src="../assets/duo.png"><span>多</span></div>-->
          <!--<div><img src="../assets/kong.png"><span>空</span></div>-->
          <div class="tips"><img src="../assets/up.png" class="icons">  买入  , <img src="../assets/down.png" class="icons"> 卖出，  <i class="icon_duo"></i> 多 , <i class="icon_kong"></i>  空</div>
        </div>
      </div>
      <div class="chart_title chart_title2">成交量：{{market.amount}}</div>
      <div class="duihuan" v-show="selsect_bar == 1 && !isvip" style="display: none" @click="exchange()">
        <img src="../assets/bimg2.png">
      </div>
    </div>


  </div>
</template>

<script>


var currency = {
  BTC:{
    name:'比特币',
    enname:'btcusdt',
    icon:require('../assets/BTC.png')
  },
  ETH:{
    name:'以太坊',
    enname:'ethusdt',
    icon:require('../assets/ETH.png')
  },
  BCH:{
    name:'比特币现金',
    enname:'bchusdt',
    icon:require('../assets/BCH.png')
  },
  EOS:{
    name:'EOS',
    enname:'eosusdt',
    icon:require('../assets/EOS.png')
  }
}



// const echarts = require('../utils/echarts.min');
//var ECharts = require('vue-echarts');

import EChart from 'vue-echarts/components/ECharts'
require('echarts/lib/chart/candlestick');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/markPoint');
const chartFun = require('../utils/charts.fun');
const config = require('../config/config');
var apiurl = config.developApiPath;
var animated = false;
export default {
  name: 'index',
  data () {
    return {
      loadData:false,
      userid:false,
      Scurrency:'BTC',
      selectIcon:currency['BTC']['icon'],
      ws:false,
      isvip:false,
      selsect_bar:0,
      kline: chartFun.getOption([],[],[]),
      //bar:chartFun.getBarOption({volumes:[],categoryData:[]}),
      myChart:false,
      lineData:{categoryData:[],values:[]},
      timer:false,
      markPointList:[],
      market:{},
      today_accuracyrate:false,
      date_str:0,
      pointArray: [
      {
        way:'1',//0空 1多
        value:'500',//买入或者卖出的值
        type:'1', //0为卖出，1为买入
        pointval:'6430',
        date:'2018/9/25/14/15'

      }
      ],
      socketSendData:{
        'symbol':'btcusdt',
        'period':'15min',
        'coinName':'比特币',
        'size':192
      }
    }
  },
  created:function(){


    //let istest = chartFun.GetQueryString('dev');
    if(chartFun.isdev() == 'test'){
      apiurl = config.devApiPath;
    }

    console.log(chartFun.isdev())

    //let userid = chartFun.GetQueryString('userid');

    this.userid = chartFun.getUrlParms('userid');
    console.log(this.userid);
    this.markPointList = chartFun.clearPoint(this.pointArray);
    //this.animate();
    this.intelligent_yesterday();
    this.getUserType();
    //this.startSocket();
    this.getKlinedata();

    // let that = this;
    // setTimeout(function(){
    // EChart.connect('radiance');
    //   //let ref = this.$refs;
    //
    // },5000);
    //this.getdivice()


    //echarts.connect([chart1, chart2]);

  },


  methods:{

    getdivice:function(){

      navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
          devices.forEach(function(device) {
            console.log(device.kind + ": " + device.label +
              " id = " + device.deviceId);
          });
        })
        .catch(function(err) {
          console.log(err.name + ": " + error.message);
        });

    },
    //ajax获取K线图
    getKlinedata(){
      let that = this;
      let postdata = 'symbol='+that.socketSendData.symbol+"&period="+that.socketSendData.period+"&coinName="+that.socketSendData.coinName+"&size=195"
      chartFun.Ajax.post(apiurl+"api/Kline",postdata,function(evt){

        let data = JSON.parse(evt);


        if(data.code==-1){

        }else{
          //var datas = JSON.parse(evt.data);
          that.setData(data.data)
        }
      })
    },
    //判断是否购买了产品
    getUserType(){
      var that = this;
      chartFun.Ajax.post(apiurl+'api/is_buy_intelligent','symbol='+this.Scurrency+"&member_id="+this.userid,function(res){
        var data = JSON.parse(res);
        if(data.code == 1){
          if(data.data.is_buy ==0){
            that.isvip = false;
          }else{
            that.isvip = true;
          }
        }

      })
    },
    intelligent_yesterday(){
      var that = this;
      chartFun.Ajax.post(apiurl+'api/intelligent_yesterday','pageSize=10000&symbol='+this.Scurrency,function(res){
        var data = JSON.parse(res);
        if(data.code == 1){


          that.pointArray = data.data.list;
          that.markPointList = chartFun.clearPoint(data.data.list);
          that.today_accuracyrate = data.data.today_accuracyrate;
          that.date_str = data.data.date_str


        }

      })
    },
    intelligent_today(){
      var that = this;
      chartFun.Ajax.post(apiurl+'api/intelligent_today','pageSize=10000&symbol='+this.Scurrency+"&member_id="+this.userid,function(res){
        var data = JSON.parse(res);
        if(data.code == 1){
          that.pointArray = data.data.list;
          that.markPointList = chartFun.clearPoint(data.data.list);
          that.date_str = data.data.date_str
        }
      })
    },

    setCurrency(val){
      this.Scurrency = val;
      this.socketSendData = {
        'symbol':currency[val]['enname'],
        'period':'15min',
        'coinName':currency[val]['name'],
        'size':100
      };
      this.selectIcon=currency[val]['icon'];

      if(this.selsect_bar==0){
        this.intelligent_yesterday();
      }else if(this.selsect_bar==1 && this.isvip){
        this.intelligent_today();
      }
      //this.ws.send(JSON.stringify(this.socketSendData));
      this.getKlinedata()
    },
    exchange(){

      if(chartFun.isIos()){
        //window.postMessage("456");
        window.webkit.messageHandlers.exchange.postMessage("12121");
      }else{
        //native.exchange();
        location.href="http://baidu.com";
      }

    },
    setSelectedBar(val){
      this.selsect_bar = val;
      this.getKlinedata();
      if(val==0){
        this.intelligent_yesterday();
      }else if(val==1 && this.isvip){
        this.intelligent_today();
      }
    },

    //整理返回数据
    setData(datas){

      let Kline = this.selsect_bar == 0?datas.yesterday:datas.kline;

      if(Kline<5){
        return;
      }
      let that = this;

      that.market = datas.market;
      that.lineData = chartFun.splitline(Kline);

      var PointRelList = chartFun.getPointRelList(that.lineData.categoryData,that.lineData.values,that.pointArray);
      if(this.selsect_bar==0){
        var option = chartFun.getOption(that.lineData,that.markPointList,PointRelList,true);
        //that.bar = chartFun.getBarOption(that.lineData,true);
      }else{
        var option = chartFun.getOption(that.lineData,that.markPointList,PointRelList);
        //that.bar = chartFun.getBarOption(that.lineData);
      }


      that.kline = option;
    },
    initSocket(dress){

      this.ws = new WebSocket(dress);
      var that = this;
     // var ws = new WebSocket(dress);
      this.ws.onopen = function(evt) {
        console.log("Connection open ...");
        that.ws.send(JSON.stringify(that.socketSendData));
      };

      this.ws.onmessage = function(evt) {
        EChart.connect('radiance');
        that.ws.send(JSON.stringify(that.socketSendData));
        if(evt.data.indexOf('传入')>0){
          that.ws.send(JSON.stringify(that.socketSendData));
        }else{
          var datas = JSON.parse(evt.data);

          that.setData(datas)


        }

      };

      this.ws.onclose = function(evt) {
        console.log("Connection closed.");
        that.startSocket();
      };

    },
    startSocket(){
      this.initSocket(config.socketDress);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  @import "../assets/style/index.css";
</style>
<style>
  .tips_font{ font-size: 20px; line-height: 1.4}
</style>

