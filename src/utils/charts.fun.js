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
  sort(array, type) {
    var types = type || 0;
    if (types == 0) {
      array.sort((num1, num2) => {
        return num1 - num2 < 0
      });
    } else {
      array.sort((num1, num2) => {
        return num1 - num2 > 0
      });
    }

  },

  //判断是否为数字
  isNumber(str) {
    var n = Number(str);
    if (!isNaN(n)) {
      return true;
    }
    return false;
  },


  isdev() {
    var u;
    var hostArr = location.host.split('.');
    u = hostArr.length === 2 ? hostArr.join('.') : hostArr.slice(1).join('.');
    var envir = u == "bitejunshi" ? "online" : "test";
    return envir;
  },
  //
  isIos() {
    var u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },
  dateformat(temptime, hour) {
    temptime = temptime * 1000
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(temptime);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    mm = mm < 10 ? "0" + mm : mm;
    h = h < 10 ? "0" + h : h;
    return m + '-' + d + ' ' + h + ':' + mm;

  },
  //获取参数
  getOption(data, markPointList, PointRelList, yesterday) {

    
    //console.log(22222, markPointList, PointRelList, data)
    let dataZoom = {
      start: 80,
      end: 100
    };

    if (yesterday) {
      dataZoom = {
        start: 40,
        end: 100
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
        link: { xAxisIndex: 'all' },
        label: {
          backgroundColor: '#777'
        }
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '270px',
          top: "100px"
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: data.categoryData,
          scale: true,
          boundaryGap: false,
          splitLine: { show: false },
          splitNumber: 20,
          axisLine: { show: false, },
          axisTick: { show: false },
          axisLabel: { show: false },
          //inverse: true
        }
      ],
      yAxis: [
        {
          scale: true,

          splitArea: {
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#14f7fb",
            }
          },
          axisLabel: { //调整x轴的lable
            textStyle: {
              fontSize: 20 // 让字体变大
            }
          },
          splitLine: {
            //show:false,
            //横向实线
            lineStyle: {
              color: ["#373d51"],
            }
          },
        }
      ],
      dataZoom:
      {
        type: 'inside',
        start: dataZoom.start,
        end: dataZoom.end
      },
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
            formatter: function (e) {
              return "<div class='tips_font' style='color:" + e.color + "'>" +
                "<span>日期:" + e.name + "</span><br>" +
                "<span>开盘:" + e.data[1] + "</span><br>" +
                "<span>收盘:" + e.data[2] + "</span><br>" +
                "<span>最低:" + e.data[3] + "</span><br>" +
                "<span>最高:" + e.data[4] + "</span><br>" +
                "</div>"
            }
          },
          markPoint: {
            data: markPointList,
            animationDuration: 2000,
          }
        },
        {
          name: '做空',
          type: 'candlestick',
          data: PointRelList.sellArray,
          itemStyle: {
            color: '#fffc00',
            color0: '#fffc00',
            borderColor: 'rgba(0,0,0,0)',
            borderColor0: 'rgba(0,0,0,0)'
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'cross'
            },
            formatter: function (e) {
              return "<div class='tips_font' style='color:" + e.color + "'>" +
                "<span>日期:" + e.name + "</span><br>" +
                "<span>开盘:" + e.data[1] + "</span><br>" +
                "<span>收盘:" + e.data[2] + "</span><br>" +
                "<span>最低:" + e.data[3] + "</span><br>" +
                "<span>最高:" + e.data[4] + "</span><br>" +
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
            color: '#ff00ff',
            color0: '#ff00ff',
            borderColor: 'rgba(0,0,0,0)',
            borderColor0: 'rgba(0,0,0,0)'
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'cross'
            },
            formatter: function (e) {
              console.log(e)

              return "<div class='tips_font' style='color:" + e.color + "'>" +
                "<span>日期:" + e.name + "</span><br>" +
                "<span>开盘:" + e.data[1] + "</span><br>" +
                "<span>收盘:" + e.data[2] + "</span><br>" +
                "<span>最低:" + e.data[3] + "</span><br>" +
                "<span>最高:" + e.data[4] + "</span><br>" +
                "</div>"
            }
          }
        },
      ]
    }

    return option;
  },

  clearPoint(pointArray) {

    var tempArray = [];
    for (var i = 0; i < pointArray.length; i++) {

      var temp;
      var way = pointArray[i].way == 0 ? '空' : '多';
      if (pointArray[i].way == 0) {
        //做空
        var color = '#fffc00';
        if (pointArray[i].type == 0) {
          //卖出
          var icon = icon2;
          var symbolOffset = [0, '-50%'];
          var position = 'top';
        } else {
          //买入
          var icon = icon1;
          var symbolOffset = [0, '50%'];
          var position = 'bottom';
        }

        temp = {

          symbol: "image://" + icon,
          name: ' ',
          coord: [pointArray[i].date, pointArray[i].pointval],
          value: way + ':' + pointArray[i].value,
          symbolKeepAspect: true,
          itemStyle: {
            normal: { color: color, color0: color },
          },
          tooltip: {
            show: false
          },
          symbolOffset: symbolOffset,
          label: {
            position: position,
            textShadowColor: color,
            textShadowBlur: 5,
            fontSize: 20,
          }
        }
      } else {

        var color = '#ff00ff';
        //做多
        if (pointArray[i].type == 0) {
          //卖出
          var icon = icon4;
          var symbolOffset = [0, '-50%'];
          var position = 'top';
        } else {
          //买入
          var icon = icon3;
          var symbolOffset = [0, '50%'];
          var position = 'bottom';
        }
        temp = {
          symbol: "image://" + icon,
          name: ' ',
          coord: [pointArray[i].date, pointArray[i].pointval],
          value: way + ':' + pointArray[i].value,
          symbolKeepAspect: true,

          itemStyle: {
            color: color,
          },
          tooltip: {
            show: false
          },
          symbolOffset: symbolOffset,
          label: {
            position: position,
            textShadowColor: color,
            textShadowBlur: 5,
            fontSize: 20,
          }
        }
      }
      tempArray.push(temp);

    }



    return tempArray;
    //markPointList = tempArray;



  },


  //获取买入，卖出标记点
  getPointRelList(date, value, points) {

    var pointArray = this.getPointArray(points);
    //console.log(pointArray)
    var result = {
      sellArray: [],
      buyArray: []
    };

    for (var i = 0; i < date.length; i++) {
      if (pointArray.sell.indexOf(date[i]) >= 0) {
        result.sellArray.push(value[i]);

      } else {
        result.sellArray.push([value[i][0], value[i][0], value[i][0], value[i][0]])
      }

      if (pointArray.buy.indexOf(date[i]) >= 0) {
        result.buyArray.push(value[i]);
      } else {
        result.buyArray.push([value[i][0], value[i][0], value[i][0], value[i][0]])
      }
    }

    return result;
  },
  getPointArray(pointArray) {
    var result = {
      sell: [],
      buy: []
    };
    for (var i = 0; i < pointArray.length; i++) {
      if (pointArray[i].way == 0) {
        //卖出
        result.sell.push(pointArray[i].date);
      } else {
        //买入
        result.buy.push(pointArray[i].date);
      }
    }
    return result;
  },

  /**
   * 整理ajax获取到的数据 时期 涨跌分离
   * @param {} rawData 
   */
  splitline(rawData) {

    var categoryData = [];
    var values = [];
    //var volumes = [];
    var len = rawData.length;
    for (var i = 0; i < len; i++) {
      categoryData.push(this.dateformat(rawData[i].id));
      //数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
      var temp = [rawData[i].open, rawData[i].close, rawData[i].low, rawData[i].high];
      values.push(temp);


      var c = parseFloat(rawData[i].close) - parseFloat(rawData[i].open);
      //volumes.push([i, rawData[i].amount, c > 0 ? 1 : -1]);
    }

    //console.log(volumes)

    return {
      categoryData: categoryData,
      values: values
      //volumes: volumes
    };
  },


  getUrlParms(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
      return unescape(r[2]);
    return null;
  },
  Ajax: {
    get: function get(url, fn) {
      // XMLHttpRequest对象用于在后台与服务器交换数据
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
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
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
          fn.call(this, xhr.responseText);
        }
      };
      xhr.send(data);
    }
  },
  GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]); return null;
  },
  getdivice() {
    navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        devices.forEach(function (device) {
          console.log(
            device.kind + ": " + device.label + " id = " + device.deviceId
          );
        });
      })
      .catch(function (err) {
        console.log(err.name + ": " + error.message);
      });
  },
  /**
      * 画弧
      * @ param startAngle 开始弧度
      * @ param percent 百分比
      */

  ring(id, startAngle, percent) {
    let color = "#ff0000";
    if (percent > 0) {
      color = "#4dda71";
    }

    var canvas = document.getElementById(id);
    startAngle = startAngle || (3 * Math.PI) / 2; //弧起始角度
    var anglePerSec = (2 * Math.PI) / (100 / Math.abs(percent));

    let context = canvas.getContext("2d"); //获取画图环境，指明为2d
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 130;
    canvas.height = 130;
    let centerX = 65; //Canvas中心点x轴坐标
    let centerY = 65; //Canvas中心点y轴坐标
    //rad = Math.PI*2/100, //将360度分成100份，那么每一份就是rad度
    //speed = 0.1; //加载的快慢就靠它了
    //绘制白色外圈
    context.save();
    context.beginPath();
    context.lineWidth = 10;
    context.strokeStyle = "#62646d";
    context.arc(centerX, centerY, 50, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
    context.restore();

    //绘制内圈
    context.save();
    context.strokeStyle = color; //设置描边样式
    context.lineWidth = 10; //设置线宽
    context.beginPath(); //路径开始
    context.lineCap = "round";
    context.arc(
      centerX,
      centerY,
      50,
      -Math.PI / 2,
      -Math.PI / 2 + anglePerSec,
      false
    ); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    context.stroke(); //绘制
    context.closePath(); //路径结束
    context.restore();
    //百分比文字绘制
    context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
    context.beginPath(); //路径开始
    context.fillStyle = color; //设置描边样式
    context.font = "26px Arial"; //设置字体大小和字体
    //绘制字体，并且指定位置
    context.fillText(percent + "%", centerX - 25, centerY + 10);

    context.stroke(); //执行绘制

    context.restore();
  },

}
module.exports = chartFun;


