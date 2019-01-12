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
Paintbrush.prototype._a2r = function(angle){
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

/**
 * @param {Number} startX 起始x坐标
 * @param {Number} startY 起始y坐标
 * @param {Number} w 宽度
 * @param {Number} h 高度
 * @param {Boolean} isFill 是否填充
 * @param {Object} style 样式
 * @param {Object} transform 变换
 * @param {String} beginPath 是否beginPath
 */
Paintbrush.prototype.drawRect = function(startX, startY, w, h, isFill, style, transform, beginPath){
    // 如果没传参，则报错
    if(arguments.length < 5) throw new Error('有些参数是必填的');
    var ctx = this.ctx;
    if(transform !== null && typeof transform === 'object'){
        ctx.save();
        if(transform.translate){
            ctx.translate.apply(ctx, transform.translate);
        }
        if(transform.scale){
            ctx.scale.apply(ctx, transform.scale);
        }
        if(transform.rotate){
            var arr = transform.rotate;
            startX = startX - arr[0];
            startY = startY - arr[1];
            ctx.translate(arr[0], arr[1]);
            ctx.rotate(this._a2r(arr[2]));
        }
    }
    // 是否beginPath()
    if(arguments[arguments.length - 1] === 'beginPath') ctx.beginPath();
    // 如果需要设置样式
    if(style !== null && typeof style === 'object'){
        Object.keys(style).forEach(key => {
            ctx[key] = style[key];
        })
    }
    isFill ? ctx.fillRect(startX, startY, w, h) : ctx.strokeRect(startX, startY, w, h);
    if(transform !== null && typeof transform === 'object'){
        ctx.restore();
    }
}


// var pb = new Paintbrush(canvas);
// pb.drawLine()