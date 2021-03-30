// @ts-ignore
import { PixelRatio, Dimensions, Platform, StatusBar } from 'react-native';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;

const getResolvedDimensions = () => {
  const { width, height } = Dimensions.get('window');
  if (width === 0 && height === 0) return Dimensions.get('screen');
  return { width, height };
};

const { width, height } = getResolvedDimensions();

export const onePixel = 1 / PixelRatio.get();
export const screenW = Math.min(width, height);
export const screenH = Math.max(width, height);

// 以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的defaultWidth和defaultHeight为对应尺寸即可. 以下为1倍图时
const defaultWidth = 375;
const defaultHeight = 667;

// 缩放比例
const _scaleWidth = screenW / defaultWidth;
const _scaleHeight = screenH / defaultHeight;

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios'
    && !Platform.isPad
    && !Platform.isTVOS
    && (dimen.height === 780
      || dimen.width === 780
      || dimen.height === 812 || dimen.width === 812
      || dimen.height === 844 || dimen.width === 844
      || dimen.height === 896 || dimen.width === 896
      || dimen.height === 926 || dimen.width === 926)
  );
};

/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleSize(size: number) {
  // 如果是 "1%" 样式 直接返回不进行换算
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(size)) {
    return size;
  }
  // 如果size不为0 并且 小于一个像素 那么就返回一个像素 处理负数 - 0.1  -一个像素
  if (size && Math.abs(size) < onePixel) {
    return size < 0 ? -onePixel : onePixel;
  }
  // ok  进行换算 基准宽度 375
  const pixel = PixelRatio.getPixelSizeForLayoutSize(size) * _scaleWidth;
  return Math.floor(pixel) * onePixel;
}

/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleWidth(size: number) {
  return size * _scaleWidth;
}

/**
 * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleHeight(size: number) {
  return size * _scaleHeight;
}

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp ,会随系统缩放比例改变，如不需要请去掉 * fontScale
 */
export function setSpText(size: number) {
  const scale = Math.min(_scaleWidth, _scaleHeight);
  return size * scale;
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  } else if (Platform.OS === 'ios') {
    return iosStyle;
  } else {
    if (androidStyle) return androidStyle;
    return iosStyle;
  }
}

/**
 * 状态栏高度
 */
export function statusBarHeight() {
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      return 44;
    }
    return 20;
  } else {
    // 自动获取导航栏高度，官方参考 720 * 1280 尺寸为 48
    return StatusBar.currentHeight;
  }
}

/**
 * 常规导航栏高度（包含状态栏）
 */
export function navigationBarHeight() {
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      return 88;
    }
    return 64;
  } else {
    return HEADER_HEIGHT;
  }
}

/**
 * 状态栏加导航栏的高度
 * @returns {*}
 */
export function navBarHeight() {
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      return 44 + 44;
    }
    return 20 + 44;
  } else {
    // 自动获取导航栏高度，官方参考 720 * 1280 尺寸为 48
    return StatusBar.currentHeight + 54;
  }
}

/**
 * 导航栏高度(不包含状态栏)
 * @returns {*}
 */
export function navBarUnlessStatusHeight() {
  return APPBAR_HEIGHT;
}

export function tabBarHeight() {
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      return 88;
    }
    return 64;
  } else {
    return 55;
  }
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
