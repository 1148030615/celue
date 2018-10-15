const config = require('../config/config');
var icon1 = require('../assets/kong_up.png');//空 - 卖
var icon2 = require('../assets/kong_down.png');//空 - 买
var icon3 = require('../assets/duo_up.png');//多 - 卖
var icon4 = require('../assets/duo_down.png');//多 - 买
var chartFun = {
  /*
  * 数组排序 //默认从大到小
  * @param array 需要排序的数组
  * @param type 0为从大到小,1为从小到大
  * */
   sort(array,type){
    var types = type || 0;
    if(types==0){
      array.sort((num1, num2) => {
        return num1 - num2 < 0
      });
    }else{
      array.sort((num1, num2) => {
        return num1 - num2 > 0
      });
    }

  },

  //判断是否为数字
  isNumber(str){
    var n = Number(str);
    if(!isNaN(n)){
      return true;
    }
    return false;
  },


  isdev(){
    var u;
    var hostArr = location.host.split('.');
    u = hostArr.length === 2 ? hostArr.join('.') : hostArr.slice(1).join('.');
    var envir = u == "bitejunshi" ? "online" : "test";
    return envir;
  },
  //
  isIos(){
    var u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },
  dateformat(temptime,hour){
    temptime = temptime*1000
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(temptime);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    mm = mm<10?"0"+mm:mm;
    h = h<10?"0"+h:h;
    return m+'-'+d+' '+h+':'+mm;

  },
  //获取参数
  getOption(data,markPointList,PointRelList,yesterday){

    var volumes = data.volumes;
    console.log(22222,markPointList,PointRelList,data)
     let dataZoom = {
       start:80,
       end:100
     };

     if(yesterday){
       dataZoom = {
         start:40,
         end:100
       };
     }

  //console.log(PointRelList)




    var option = {



      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'cross'
        },
      },
      axisPointer: {
        link: {xAxisIndex: 'all'},
        label: {
          backgroundColor: '#777'
        }
      },
      visualMap: {
        show: false,
        seriesIndex: 1,
        dimension: 2,
        pieces: [{
          value: 1,
          color: config.upColor
        }, {
          value: -1,
          color: config.downColor
        }]
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '230px',
          top:"100px"
        },
        {
          left: '10%',
          right: '8%',
          bottom: '40px',
          height: '162px'
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: data.categoryData,
          scale: true,
          boundaryGap : false,
          splitLine: {show: false},
          splitNumber: 20,
          axisLine: {show:false,},
          axisTick: {show: false},
          axisLabel: {show: false},
          //inverse: true
        },
        {
          type: 'category',
          gridIndex: 1,
          data: data.categoryData,
          scale: true,
          boundaryGap : false,
          axisLine: {
            show:false,
            onZero: false,
            lineStyle:{
              color:"#14f7fb",
            }
          },
          //axisTick: {show: false},
          //splitLine: {show: false},
          //axisLabel: {show: false},
          splitNumber: 20,
          axisLabel:{ //调整x轴的lable
            textStyle:{
              fontSize:20 // 让字体变大
            }
          },
          //inverse: true
        }
      ],
      yAxis: [
        {
          scale: true,

          splitArea: {
          },
          axisLine: {
            show:false,
            lineStyle:{
              color:"#14f7fb",
            }
          },
          axisLabel:{ //调整x轴的lable
            textStyle:{
              fontSize:20 // 让字体变大
            }
          },
          splitLine:{
            //show:false,
            //横向实线
            lineStyle:{
              color:["#373d51"],
            }
          },
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: {show: false},
          axisLine: {show: false},
          axisTick: {show: false},
          splitLine: {show: false}
        }
      ],
      dataZoom:
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: dataZoom.start,
          end: dataZoom.end
        }

      ,
      series: [
        {
          name: 'data',
          type: 'candlestick',
          data: data.values,
          itemStyle: {
            normal: {
              color: config.upColor,
              color0: config.downColor,
              borderColor: config.upColor,
              borderColor0: config.downColor
            }
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'cross'
            },
            formatter: function(e){
              console.log(e)

              return "<div class='tips_font' style='color:"+e.color+"'>" +
                "<span>日期:"+e.name+"</span><br>" +
                "<span>开盘:"+e.data[1]+"</span><br>" +
                "<span>收盘:"+e.data[2]+"</span><br>" +
                "<span>最低:"+e.data[3]+"</span><br>" +
                "<span>最高:"+e.data[4]+"</span><br>" +
                "</div>"
            }
          },
          markPoint: {
            data: markPointList,
            animationDuration:2000,
          }
        },
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data.volumes,
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'cross'
            },
            formatter: function(e){
              console.log(e)

              return "<div class='tips_font' style='color:"+e.color+"'>" +
                "<span>日期:"+e.name+"</span><br>" +
                "<span>成交量:"+e.data[1]+"</span><br>" +
                "</div>"
            }
          }
        },
        {
          name: '做空',
          type: 'candlestick',
          data: PointRelList.sellArray,
          itemStyle: {
            color :'#fffc00',
            color0: '#fffc00',
            borderColor: 'rgba(0,0,0,0)',
            borderColor0: 'rgba(0,0,0,0)'
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'cross'
            },
            formatter: function(e){
              console.log(e)

              return "<div class='tips_font' style='color:"+e.color+"'>" +
                "<span>日期:"+e.name+"</span><br>" +
                "<span>开盘:"+e.data[1]+"</span><br>" +
                "<span>收盘:"+e.data[2]+"</span><br>" +
                "<span>最低:"+e.data[3]+"</span><br>" +
                "<span>最高:"+e.data[4]+"</span><br>" +
                "</div>"
            }
          }
        }
        ,
        {
          name: '做多',
          type: 'candlestick',
          data: PointRelList.buyArray,
          itemStyle: {
            color :'#ff00ff',
            color0: '#ff00ff',
            borderColor: 'rgba(0,0,0,0)',
            borderColor0: 'rgba(0,0,0,0)'
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'cross'
            },
            formatter: function(e){
              console.log(e)

              return "<div class='tips_font' style='color:"+e.color+"'>" +
                "<span>日期:"+e.name+"</span><br>" +
                "<span>开盘:"+e.data[1]+"</span><br>" +
                "<span>收盘:"+e.data[2]+"</span><br>" +
                "<span>最低:"+e.data[3]+"</span><br>" +
                "<span>最高:"+e.data[4]+"</span><br>" +
                "</div>"
            }
          }
        },
      ]
    }

  return option;
},

  clearPoint(pointArray){

    var tempArray = [];
    for(var i = 0;i < pointArray.length;i++){

      var temp;
      var way = pointArray[i].way ==0?'空':'多';
      if(pointArray[i].way ==0){
        //做空
        var color = '#fffc00';
        if(pointArray[i].type == 0){
          //卖出
          var icon =icon2;
          var symbolOffset=[0 ,'-50%'];
          var position = 'top';
        }else{
          //买入
          var icon =icon1;
          var symbolOffset=[0 ,'50%'];
          var position = 'bottom';
        }

        temp = {

          symbol:"image://"+icon,
          name: ' ',
          coord: [pointArray[i].date,pointArray[i].pointval],
          value: way+':'+pointArray[i].value,
          symbolKeepAspect:true,
          itemStyle: {
            normal: {color: color,color0: color},
          },
          tooltip : {
            show:false
          },
          symbolOffset:symbolOffset,
          label:{
            position:position,
            textShadowColor:color,
            textShadowBlur:5,
            fontSize:20,
          }
        }
      }else{

        var color = '#ff00ff';
        //做多
        if(pointArray[i].type == 0){
          //卖出
          var icon =icon4;
          var symbolOffset=[0 ,'-50%'];
          var position = 'top';
        }else{
          //买入
          var icon =icon3;
          var symbolOffset=[0 ,'50%'];
          var position = 'bottom';
        }
        temp = {
          symbol:"image://"+icon,
          name: ' ',
          coord: [pointArray[i].date,pointArray[i].pointval],
          value: way+':'+pointArray[i].value,
          symbolKeepAspect:true,

          itemStyle: {
            color:color,
          },
          tooltip : {
            show:false
          },
          symbolOffset:symbolOffset,
          label:{
            position:position,
            textShadowColor:color,
            textShadowBlur:5,
            fontSize:20,
          }
        }
      }
      tempArray.push(temp);

    }



    return tempArray;
    //markPointList = tempArray;



  },


  //获取买入，卖出标记点
  getPointRelList(date,value,points){

    var pointArray = this.getPointArray(points);
    //console.log(pointArray)
    var result = {
      sellArray:[],
      buyArray:[]
    };

    for(var i = 0; i<date.length;i++){
      if(pointArray.sell.indexOf(date[i]) >= 0){
        result.sellArray.push(value[i]);

      }else{
        result.sellArray.push([value[i][0],value[i][0],value[i][0],value[i][0]])
      }

      if(pointArray.buy.indexOf(date[i]) >= 0){
        result.buyArray.push(value[i]);
      }else{
        result.buyArray.push([value[i][0],value[i][0],value[i][0],value[i][0]])
      }
    }

    return result;
  },
  getPointArray(pointArray){
    var result = {
      sell:[],
      buy:[]
    };
    for(var i =0 ;i<pointArray.length;i++){
      if(pointArray[i].way == 0){
        //卖出
        result.sell.push(pointArray[i].date);
      }else{
        //买入
        result.buy.push(pointArray[i].date);
      }
    }
    return result;
  },
  splitline(rawData) {

    var categoryData = [];
    var categoryData2 = [];
    var values = [];
    var volumes = [];
    var len = rawData.length;
    for (var i = 0; i < len; i++) {
      categoryData.push(this.dateformat(rawData[i].id));
      //数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
      var temp = [rawData[i].open,rawData[i].close,rawData[i].low,rawData[i].high];
      values.push(temp);


      var c = parseFloat(rawData[i].close) - parseFloat(rawData[i].open);
      volumes.push([i, rawData[i].amount, c>0 ?1:-1]);
    }

  //console.log(volumes)

    return {
      categoryData: categoryData,
      values: values,
      volumes:volumes
    };
  },


  getUrlParms(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
      return unescape(r[2]);
    return null;
  },
  Ajax:{
    get: function get(url, fn) {
      // XMLHttpRequest对象用于在后台与服务器交换数据
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function() {
        // readyState == 4说明请求已完成
        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
          // 从服务器获得数据
          fn.call(this, xhr.responseText);
        }
      };
      xhr.send();
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function post(url, data, fn) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      // 添加http头，发送信息至服务器时内容编码类型
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
          fn.call(this, xhr.responseText);
        }
      };
      xhr.send(data);
    }
  },
  GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if(r!=null)return  unescape(r[2]); return null;
  }


}
module.exports = chartFun;


