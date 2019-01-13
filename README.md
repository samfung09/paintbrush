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

### 画线drawRect(startX, startY, w, h, isFill, style, transform, beginPath)
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
pb.drawRect(50, 50, 200, 100, false, {
    strokeStyle: 'red',
    lineWidth: 10,
    lineJoin: 'round'
}, {
    translate: [100, 100],
    rotate: [150, 100, 30]
})
```