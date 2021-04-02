# react-native-worry-free-style-sheet

一个省心的React-Native StyleSheet工具方法

#### 使用

`yarn add react-native-worry-free-style-sheet`

```js
import StyleSheet, { IgnoreValue } from 'react-native-worry-free-style-sheet';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    marginTop: 50,
    width: 375,
    height: new IgnoreValue(30),
    backgroundColor: 'red',
    borderWidth: 0.6,
    borderColor: 'red',
    borderRadius: 20,
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
  },
});
```

#### 注意
- 如果需要忽略转换 使用 IgnoreValue 类
- 如果需要设置屏幕宽度使用你设置的基准值 默认375
- 转换结果小于一个像素的时候会返回一个像素（比如iPhone 11 width: 0.1）返回onePixel一个像素0.3333

#### 自动转换设计稿尺寸 默认 375

- 修改基准值

```js
import StyleSheet from 'react-native-worry-free-style-sheet';
StyleSheet.setConfig({
    baseWidth: 750,
});
```

#### 方法
包含默认StyleSheet的方法


| 方法/常量                    | 参数类型                               | 描述                                 |
|--------------------------|------------------------------------|------------------------------------|
| scaleSize                | number                             | 屏幕适配, 缩放size , 默认根据宽度适配，纵向也可以使用此方法 |
| setConfig                | { baseWidth }                      | 修改配置                               |
| IgnoreValue              | new IgnoreValue(100)               | 忽略转换                               |
| isIphoneX                |                                    | 判断是否为iphoneX                       |
| ifIphoneX                | iphoneXStyle,iosStyle,androidStyle | 根据是否是iPhoneX返回不同的样式                |
| statusBarHeight          |                                    | 状态栏高度                              |
| navigationBarHeight      |                                    | 常规导航栏高度（包含状态栏）                     |
| navBarHeight             |                                    | 状态栏加导航栏的高度                         |
| navBarUnlessStatusHeight |                                    | 导航栏高度(不包含状态栏)                      |
| getBottomSpace           |                                    | 获取底部边距                             |
| onePixel                 | 常量                                 | 1个像素                               |
| screenW                  | 常量                                 | 屏幕宽度                               |
| screenH                  | 常量                                 | 屏幕高度                               |
| isIOS                    | 常量                                 | 是否 iOS                             |
| isAndroid                | 常量                                 | 是否 Android                         |




#### 支持转换的样式表

```js
const transformKeys = {
    fontSize: true,
    width: true,
    height: true,
    start: true,
    end: true,
    top: true,
    left: true,
    right: true,
    bottom: true,
    minWidth: true,
    maxWidth: true,
    minHeight: true,
    maxHeight: true,
    margin: true,
    marginVertical: true,
    marginHorizontal: true,
    marginTop: true,
    marginBottom: true,
    marginLeft: true,
    marginRight: true,
    marginStart: true,
    marginEnd: true,
    padding: true,
    paddingVertical: true,
    paddingHorizontal: true,
    paddingTop: true,
    paddingBottom: true,
    paddingLeft: true,
    paddingRight: true,
    paddingStart: true,
    paddingEnd: true,
    lineHeight: true,
    borderRadius: true,
    borderWidth: true,
    borderTopWidth: true,
    borderStartWidth: true,
    borderEndWidth: true,
    borderRightWidth: true,
    borderBottomWidth: true,
    borderLeftWidth: true,
    borderBottomEndRadius: true,
    borderBottomLeftRadius: true,
    borderBottomRightRadius: true,
    borderBottomStartRadius: true,
    borderTopEndRadius: true,
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    borderTopStartRadius: true,
};
```

#### 待办
* [ ] 新增Colors常量
* [ ] 新增公共样式配置文件
* [ ] 新增中间件 方便自定义处理scaleSize转换方法
* [ ] 优化文档

