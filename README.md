## Paintbrush我的画笔
### new Paintbrush(canvas)
| 形参 | 类型 | 是否必填 | 描述 |
| ------ | ------ | ------ | ------ |
| canvas | DOM Object | 必填 | canvas DOM对象 |

### 画线drawLine(startX, startY, coordinates, style, beginPath)
| 形参 | 类型 | 是否必填 | 描述 |
| ------ | ------ | ------ | ------ |
| startX | Number | 必填 | moveTo x坐标 |
| startY | Number | 必填 | moveTo y坐标 |
| coordinates | Array | 必填 | 一个或多个lineTo坐标集合 |
| style | Object | 可选 | 样式 |
| beginPath | String | 可选 | 是否beginPath，传入'beginPath'或者不传 |

举例：
```javascript
var pb = new Paintbrush(canvas);
pb.drawLine(50, 200, [100, 150, 150, 140, 200, 180, 250, 100], {
    strokeStyle: 'violet',
    lineWidth: 5,
    lineCap: 'round',
    lineJoin: 'round'
})
```
![image](https://github.com/samfung09/paintbrush/blob/master/images/drawLine.png)

### 画矩形drawRect(startX, startY, w, h, isFill, style, transform, beginPath)
| 形参 | 类型 | 是否必填 | 描述 |
| ------ | ------ | ------ | ------ |
| startX | Number | 必填 | 起始x坐标 |
| startY | Number | 必填 | 起始y坐标 |
| w | Number | 必填 | 宽度 |
| h | Number | 必填 | 高度 |
| isFill | Boolean | 必填 | 是否填充 |
| style | Object | 可选 | 样式 |
| transform | Object | 可选 | 变换，如果传入该参数，那么前一个形参style就是必填的 |
| beginPath | String | 可选 | 是否beginPath，传入'beginPath'或者不传 |

举例：
```javascript
var pb = new Paintbrush(canvas);
pb.drawRect(50, 50, 200, 100, false, {
    lineWidth: 10,
    lineJoin: 'round'
})
pb.drawRect(50, 50, 200, 100, false, {
    strokeStyle: 'red',
    lineWidth: 10,
    lineJoin: 'round'
}, {
    rotate: [150, 100, 30]
})
```
![image](https://github.com/samfung09/paintbrush/blob/master/images/drawRect.png)

### 画圆弧drawArc(cX, cY, r, startAngle, endAngle, isFan, isClosePath, isFill, style, transform, beginPath)
| 形参 | 类型 | 是否必填 | 描述 |
| ------ | ------ | ------ | ------ |
| cX | Number | 必填 | 圆心x坐标 |
| cY | Number | 必填 | 圆心y坐标 |
| r | Number | 必填 | 半径 |
| startAngle | Number | 必填 | 起始角度 |
| endAngle | Number | 必填 | 结束角度 |
| isFan | boolean | 必填 | 是否为扇形 |
| isClosePath | boolean | 必填 | 是否闭合路径 |
| isFill | boolean | 必填 | 是否填充 |
| style | Object | 可选 | 样式 |
| transform | Object | 可选 | 变换，如果传入该参数，那么前一个形参style就是必填的 |
| beginPath | String | 可选 | 是否beginPath，传入'beginPath'或者不传 |

举例：
```javascript
var pb = new Paintbrush(canvas);
pb.drawArc(100, 100, 60, 0, 60, true, false, false)
pb.drawArc(100, 100, 60, 0, 60, true, false, false, {
    strokeStyle: 'violet'
}, {
    rotate: [100, 100, 90]
}, 'beginPath')
```
![image](https://github.com/samfung09/paintbrush/blob/master/images/drawArc.png)

### 画多边形drawPolygon(startX, startY, coordinates, isFill, style, transform, beginPath)
| 形参 | 类型 | 是否必填 | 描述 |
| ------ | ------ | ------ | ------ |
| startX | Number | 必填 | 起始x坐标 |
| startY | Number | 必填 | 起始y坐标 |
| coordinates | Array | 必填 | 一个或多个lineTo坐标集合 |
| isFill | boolean | 必填 | 是否填充 |
| style | Object | 可选 | 样式 |
| transform | Object | 可选 | 变换，如果传入该参数，那么前一个形参style就是必填的 |
| beginPath | String | 可选 | 是否beginPath，传入'beginPath'或者不传 |

举例：
```javascript
var pb = new Paintbrush(canvas);
pb.drawPolygon(100, 100, [200, 200, 100, 200], false)
pb.drawPolygon(100, 100, [200, 200, 100, 200], false, {
    strokeStyle: 'red'
}, {
    rotate: [100, 200, 30]
}, 'beginPath')
```
![image](https://github.com/samfung09/paintbrush/blob/master/images/drawPolygon.png)