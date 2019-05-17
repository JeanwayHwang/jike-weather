import {condCodeMap} from './condCodeMap';

/**
 * 返回上一页
 *
 */
export function goBackPage() {
    wx.navigateBack({
        delta: 1
    });
}

/**
 * 页面跳转
 *
 * @param {string} 目标页面标识
 */
export function goToPage(targetPage, query) {
    let queryStr = '';
    if (query) {
        queryStr = '?';
    }
    for (let key in query) {
        queryStr += `${key}=${query[key]}`;
    }
    wx.navigateTo({
        url: `/pages/${targetPage}/main${queryStr}`
    });
}

/**
 * 页面跳转（关闭当前页面，跳转到应用内某个页面）
 *
 * @param {string} 目标页面标识
 */
export function redirectToPage(targetPage, query) {
    let queryStr = '';
    if (query) {
        queryStr = '?';
    }
    for (let key in query) {
        queryStr += `${key}=${query[key]}`;
    }
    wx.redirectTo({
        url: `/pages/${targetPage}/main${queryStr}`
    });
}

/**
 * 根据天气代号映射对应的图腾
 *
 * @param {string} 天气状况代号
 * @return {string} 对于图腾名称
 */
export function getConditionTotem(condCode) {
    let totemName = '';
    if ([100, 900].indexOf(+condCode) > -1) {
        totemName = 'sunny';
    } else if (+condCode >= 101 && +condCode <= 204) {
        totemName = 'cloudy';
    } else if (+condCode >= 500 && +condCode <= 515) {
        totemName = 'foggy';
    } else {
        totemName = 'rainy';
    }
    return totemName;
}

/**
 * 根据天气代号映射对应的气象图标
 *
 * @param {string} 天气状况代号
 * @return {string} 对应气象图标名称
 */
export function getConditionIcon(condCode) {
    return condCodeMap[condCode];
}

/**
 * 根据Type类型获取对应生活指数的指标名称
 *
 * @param {string} Type类型
 * @return {string} 对应生活指数指标
 */
export function getLifestyleName(typeName) {
    if (!typeName) {
        return '';
    }
    const lifestyleTypeMap = {
        'comf': '体感',
        'drsg': '穿衣',
        'flu': '感冒',
        'sport': '运动',
        'trav': '旅行',
        'uv': '紫外线',
        'cw': '洗车',
        'air': '空气污染'
    };
    return lifestyleTypeMap[typeName] || '';
}

/**
 * 根据Type类型获取对应生活指数的指标图标
 *
 * @param {string} Type类型
 * @return {string} 对应生活指数图标
 */
export function getLifestyleIcon(typeName) {
    if (!typeName) {
        return '';
    }
    const lifestyleIconMap = {
        'comf': 'icon-chongwu',
        'drsg': 'icon-zhuti',
        'flu': 'icon-yiliao',
        'sport': 'icon-huodong',
        'trav': 'icon-jipiao',
        'uv': 'icon-qing1',
        'cw': 'icon-cheliang',
        'air': 'icon-wumai'
    };
    return lifestyleIconMap[typeName] || '';
}

/**
 * 获取今天是星期几
 *
 * @return {string} 星期字符串
 */
export function getWeekDate(date) {
    let day = date ? new Date(date).getDay() : new Date().getDay();
    let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weeks[day];
}

/**
 * 格式化当前时间
 *
 * @return {string} hh:mm格式的时间字符串
 */
export function getFormatTime() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    return (hour >= 10 ? hour : '0' + hour) + ':' + min;
}

/**
 * @desc 计算两个时间点的间隔
 * @param {Number} 目标时间点的时间戳
 * @param {Number} 源时间点的时间戳（可选，若无该参数则源时间点为当前时间）
 * @return {Number} 时间间隔（秒）
 */

export const compareWithMoment = (targetTime, originTime) => {
    const gap = (originTime || new Date().getTime()) - targetTime;
    return gap;
};

/**
 * @desc 存储当前地理位置&所属城市的映射表
 * @param {String} 当前地理位置
 * @param {String} 所属城市
 */

export const setCity = (location, city) => {
    let cityMap = wx.getStorageSync('cityMap') || {};
    if (!cityMap[location]) {
        // 存储表尚无记录，则添加新映射内容
        cityMap[location] = city;
        wx.setStorageSync('cityMap', cityMap);
    }
};

/**
 * @desc 获取当前地理位置的所属城市
 * @param {String} 当前地理位置
 * @return {String} 所属城市
 */

export const getCity = (location) => {
    let cityMap = wx.getStorageSync('cityMap') || {};
    return cityMap[location] || '';
};
