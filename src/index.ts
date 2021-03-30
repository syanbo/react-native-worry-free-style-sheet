/**
 * Author   : Syan
 * Date     : 2019-08-27
 * Project [ godfrey ] Coded on WebStorm.
 */
// @ts-ignore
import { Platform, StyleSheet } from 'react-native';
import * as screenUtil from './screenUtil';

const { hairlineWidth, absoluteFill, flatten, absoluteFillObject, compose } = StyleSheet;
const { scaleSize, setSpText } = screenUtil;

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

function transformStyle(styleObj, prop) {
    const value = styleObj[prop];
    if (!value || !transformKeys[prop]) return;
    if (value.hasOwnProperty('value')) {
        styleObj[prop] = value.value;
        return;
    }
    if (value.hasOwnProperty('ceilValue')) {
        styleObj[prop] = Math.ceil(scaleSize(value.ceilValue));
        return;
    }
    if (isNaN(value)) return;
    if (prop === 'fontSize') {
        styleObj[prop] = setSpText(value);
        return;
    }
    styleObj[prop] = scaleSize(value);
}

export default {
    hairlineWidth,
    // 使用这个值, 来规避IDE的警告
    hairlineUnit: hairlineWidth,

    absoluteFill,

    absoluteFillObject,

    compose,

    flatten,

    create: StyleSheet.create((obj) => {
        for (const key in obj) {
            const styleObj = obj[key];
            if (styleObj) {
                for (const prop in styleObj) {
                    transformStyle(styleObj, prop);
                }
            }
        }
        return obj;
    }),

    ...screenUtil,

    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
};

export class IgnoreValue {
    private value: number;
    constructor(value) {
        this.value = value;
    }
}

export class CeilValue {
    private ceilValue: number;
    constructor(value) {
        this.ceilValue = value;
    }
}
