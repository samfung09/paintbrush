/**
 * @param {dom} canvas canvas DOM对象
 */
function Paintbrush(canvas){
    if(!canvas) throw new Error('必须传入一个canvas DOM对象');
    this.ctx = canvas.getContext('2d');
}

/**
 * @param {number} startX 起始x坐标
 * @param {number} startY 起始y坐标
 * @param {number} w 宽度
 * @param {number} h 高度
 * @method 清除画布
 */
Paintbrush.prototype.clearRect = function(startX, startY, w, h){
    this.ctx.clearRect(startX, startY, w, h);
}
/**
 * @param {number} angle 角度
 * @method 角度转弧度
 * @returns 返回一个弧度
 */
Paintbrush.prototype.a2r = function(angle){
    return angle * Math.PI/180;
}

Paintbrush.prototype.drawLine = function(startX, startY, endX, endY, style, beginPath){
    // 如果没传参，则报错
    if(arguments.length < 4) throw new Error('有些参数是必填的');
    var ctx = this.ctx;
    // 是否beginPath()
    if(arguments[arguments.length - 1] === 'beginPath') ctx.beginPath();
    // 如果需要设置样式
    if(typeof style === 'object'){
        Object.keys(style).forEach(key => {
            ctx[key] = style[key];
        })
    }
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

Paintbrush.prototype.drawRect = function(startX, startY, w, h, isFill, style, beginPath){
    // 如果没传参，则报错
    if(arguments.length < 4) throw new Error('有些参数是必填的');
    var ctx = this.ctx;
    // 是否beginPath()
    if(arguments[arguments.length - 1] === 'beginPath') ctx.beginPath();
    // 如果需要设置样式
    if(typeof style === 'object'){
        Object.keys(style).forEach(key => {
            ctx[key] = style[key];
        })
    }
    isFill ? ctx.fillRect(startX, startY, w, h) : ctx.strokeRect(startX, startY, w, h);
}


// var pb = new Paintbrush(canvas);
// pb.drawLine()