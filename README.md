## Paintbrush我的画笔
### new Paintbrush(canvas)
| 形参 | 类型 | 是否必填 | 描述 |
| ------ | ------ | ------ | ------ |
| canvas | DOM Object | 必填 | canvas DOM对象 |

### 画线drawLine(startX, startY, endX, endY, style, beginPath)
| 形参 | 类型 | 是否必填 | 描述 |
| ------ | ------ | ------ | ------ |
| startX | Number | 必填 | moveTo x坐标 |
| startY | Number | 必填 | moveTo y坐标 |
| endX | Number | 必填 | lineTo x坐标 |
| endY | Number | 必填 | lineTo y坐标 |
| style | Object | 可选 | 样式 |
| beginPath | String | 可选 | 是否beginPath |

举例：
```javascript
var pb = new Paintbrush(canvas);
pb.drawLine(20, 20, 200, 100, {
    strokeStyle: 'red',
    lineWidth: 10,
    lineCap: 'round'
})
```