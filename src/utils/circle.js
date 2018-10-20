// function Circle() {
//     this.radius = 100;    // 圆环半径 
//     this.lineWidth = 25;  // 圆环边的宽度    
//     this.strokeStyle = '#ccc'; //边的颜色    
//     this.fillStyle = 'blue';  //填充色    
//     this.lineCap = 'round';
// }
// Circle.prototype.draw = function (ctx) {
//     ctx.beginPath();
//     ctx.arc(250, 250, this.radius, 0, Math.PI * 2, true);  // 坐标为250的圆，这里起始角度是0，结束角度是Math.PI*2    
//     ctx.lineWidth = this.lineWidth;
//     ctx.strokeStyle = this.strokeStyle;
//     ctx.stroke();  // 这里用stroke画一个空心圆，想填充颜色的童鞋可以用fill方法
// }

// function Ring(startAngle, percent,ctx) {
//     let radius = 100;    // 圆环半径 
//     let lineWidth = 25;  // 圆环边的宽度    
//     let strokeStyle = '#ccc'; //边的颜色    
//     let fillStyle = 'blue';  //填充色    
//     let lineCap = 'round';
//     let startAngle = startAngle || 3 * Math.PI / 2; //弧起始角度    
//     let percent = percent;  //弧占的比例

//     ctx.beginPath();
//     ctx.arc(250, 250, radius, 0, Math.PI * 2, true);  // 坐标为250的圆，这里起始角度是0，结束角度是Math.PI*2    
//     ctx.lineWidth = lineWidth;
//     ctx.strokeStyle = strokeStyle;
//     ctx.stroke();  // 这里用stroke画一个空心圆，想填充颜色的童鞋可以用fill方法

//     ctx.beginPath();
//     var anglePerSec = 2 * Math.PI / (100 / percent); // 蓝色的弧度     
//     ctx.arc(250, 250,radius, startAngle, startAngle + false); //这里的圆心坐标要和cirle的保持一致     
//     ctx.strokeStyle = that.fillStyle;
//     ctx.lineCap = that.lineCap;
//     ctx.stroke();
//     ctx.closePath();
// }


// Ring.prototype = Object.create(Circle.prototype),
// Ring.prototype.drawRing = function (ctx) {
//     this.draw(ctx);  // 调用Circle的draw方法画圈圈     // angle     
//     ctx.beginPath();
//     var anglePerSec = 2 * Math.PI / (100 / this.percent); // 蓝色的弧度     
//     ctx.arc(250, 250, this.radius, this.startAngle, this.startAngle + false); //这里的圆心坐标要和cirle的保持一致     
//     ctx.strokeStyle = that.fillStyle;
//     ctx.lineCap = that.lineCap;
//     ctx.stroke();
//     ctx.closePath();
// }





// class Ring{
//     constructor(startAngle, percent){
       
//         this.radius = 100;    // 圆环半径 
//         this.lineWidth = 25;  // 圆环边的宽度    
//         this.strokeStyle = '#ccc'; //边的颜色    
//         this.fillStyle = 'blue';  //填充色    
//         this.lineCap = 'round';
//         this.startAngle = startAngle || 3 * Math.PI / 2; //弧起始角度    
//         this.percent = percent;  //弧占的比例
//     }
//     draw(ctx){
//         ctx.beginPath();
//         ctx.arc(250, 250, this.radius, 0, Math.PI * 2, true);  // 坐标为250的圆，这里起始角度是0，结束角度是Math.PI*2    
//         ctx.lineWidth = this.lineWidth;
//         ctx.strokeStyle = this.strokeStyle;
//         ctx.stroke();  // 这里用stroke画一个空心圆，想填充颜色的童鞋可以用fill方法
//     }
//     drawRing(ctx){
//         this.draw(ctx);  // 调用Circle的draw方法画圈圈     // angle     
//         ctx.beginPath();
//         var anglePerSec = 2 * Math.PI / (100 / this.percent); // 蓝色的弧度     
//         ctx.arc(250, 250, this.radius, this.startAngle, this.startAngle + false); //这里的圆心坐标要和cirle的保持一致     
//         ctx.strokeStyle = that.fillStyle;
//         ctx.lineCap = that.lineCap;
//         ctx.stroke();
//         ctx.closePath();
//     }
    
// }

export default Ring;