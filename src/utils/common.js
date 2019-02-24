import {condCodeMap} from './condCodeMap';
/**
 * 页面跳转
 *
 * @param {string} 目标页面标识
 */
export function goToPage(targetPage) {
    wx.navigateTo({
        url: `/pages/${targetPage}/main`
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
