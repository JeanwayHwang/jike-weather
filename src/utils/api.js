import fly from './fly';

/**
 * 获取实时天气
 *
 * @param {string} 当前地区名称
 * @return {Promise} Promise 响应结果
 */
export function getCurrentWeather (location = '北京市') {
    return fly.get('/weather/now', {
        location
    });
}
