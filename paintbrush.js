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

/**
 * @param {Number} startX 起始x坐标
 * @param {Number} startY 起始y坐标
 * @param {Array} coordinates lineTo()坐标集合
 * @param {Object} style 样式
 * @param {String} beginPath 是否beginPath
 * @method 画线
 */
Paintbrush.prototype.drawLine = function(startX, startY, coordinates, style, beginPath){
    // 如果没传参，则报错
    if(arguments.length < 3) throw new Error('有些参数是必填的');
    // coordinates必须传入一个坐标数组，否则不绘画
    if(Object.prototype.toString.call(coordinates) === '[object Array]'){
        var ctx = this.ctx;
        // 是否beginPath()
        if(arguments[arguments.length - 1] === 'beginPath') ctx.beginPath();
        // 如果需要设置样式
        if(typeof style === 'object'){
            Object.keys(style).forEach(key => {
                ctx[key] = style[key];
            })
        }
        // 开始画线
        ctx.moveTo(startX, startY);
        var n = Math.floor(coordinates.length/2);
        for(var i=0; i<n; i++){
            ctx.lineTo(coordinates[i*2], coordinates[i*2+1]);
        }
        ctx.stroke();
    }
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

/**
 * @param {Number} cX 圆心x坐标
 * @param {Number} cY 圆心y坐标
 * @param {Number} r 半径
 * @param {Number} startAngle 起始角度
 * @param {Number} endAngle 结束角度
 * @param {Boolean} isFan 是否为扇形
 * @param {Boolean} isClosePath 是否闭合路径
 * @param {Boolean} isFill 是否填充
 * @param {Object} style 样式
 * @param {Object} transform 画布变化
 * @param {String} beginPath 是否beginPath
 */
Paintbrush.prototype.drawArc = function(cX, cY, r, startAngle, endAngle, isFan, isClosePath, isFill, style, transform, beginPath){
    if(arguments.length < 8) throw new Error('有些参数是必填的');
    var ctx = this.ctx;
    // 如果画布需要变化
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
            cX = cX - arr[0];
            cY = cY - arr[1];
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
    // 如果是画扇形
    if(isFan){
        ctx.moveTo(cX, cY);
        ctx.arc(cX, cY, r, this._a2r(startAngle), this._a2r(endAngle));
        ctx.closePath();
        isFill ? ctx.fill() : ctx.stroke();
    }else{  // 否则是画圆或圆弧
        ctx.arc(cX, cY, r, this._a2r(startAngle), this._a2r(endAngle));
        // 圆弧是否闭合路径
        if(isClosePath) ctx.closePath();
        isFill ? ctx.fill() : ctx.stroke();

    }
    if(transform !== null && typeof transform === 'object'){
        ctx.restore();
    }
}

/**
 * @param {Number} startX 起始x坐标
 * @param {Number} startY 起始y坐标
 * @param {Array} coordinates lineTo()坐标集合
 * @param {Boolean} isFill 是否填充
 * @param {Object} style 样式
 * @param {Object} transform 画布变化
 * @param {String} beginPath 是否beginPath
 */
Paintbrush.prototype.drawPolygon = function(startX, startY, coordinates, isFill, style, transform, beginPath){
    // 如果没传参，则报错
    if(arguments.length < 4) throw new Error('有些参数是必填的');
    // coordinates必须传入一个坐标数组，否则不绘画
    if(Object.prototype.toString.call(coordinates) === '[object Array]'){
        var ctx = this.ctx;
        var n = Math.floor(coordinates.length/2);
        // 如果画布需要变化
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
                for(var j=0; j<n; j++){
                    coordinates[j*2] = coordinates[j*2] - arr[0];
                    coordinates[j*2+1] = coordinates[j*2+1] - arr[1];
                }
                ctx.translate(arr[0], arr[1]);
                ctx.rotate(this._a2r(arr[2]));
            }
        }
        // 是否beginPath()
        if(arguments[arguments.length - 1] === 'beginPath') ctx.beginPath();
        // 如果需要设置样式
        if(typeof style === 'object'){
            Object.keys(style).forEach(key => {
                ctx[key] = style[key];
            })
        }
        // 开始画线
        ctx.moveTo(startX, startY);
        // var n = Math.floor(coordinates.length/2);
        for(var i=0; i<n; i++){
            ctx.lineTo(coordinates[i*2], coordinates[i*2+1]);
        }
        ctx.closePath();
        isFill ? ctx.fill() : ctx.stroke();
    }
}

// var pb = new Paintbrush(canvas);
// pb.drawLine()