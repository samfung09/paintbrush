/**
 * @param {dom} canvas canvas DOM对象
 */
function Paintbrush(canvas){
    if(!canvas) throw new Error('必须传入一个canvas DOM对象');
    this.ctx = canvas.getContext('2d');
}

Paintbrush.prototype.drawLine = function(startX, startY, endX, endY, style, beginPath){
    var ctx = this.ctx;
    if(beginPath === 'beginPath') ctx.beginPath();
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
    var ctx = this.ctx;
    if(beginPath === 'beginPath') ctx.beginPath();
    if(typeof style === 'object'){
        Object.keys(style).forEach(key => {
            ctx[key] = style[key];
        })
    }
    isFill ? ctx.fillRect(startX, startY, w, h) : ctx.strokeRect(startX, startY, w, h);
}


// var pb = new Paintbrush(canvas);
// pb.drawLine()