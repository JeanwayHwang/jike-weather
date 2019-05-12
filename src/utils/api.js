import fly from './fly';
import Fly from 'flyio/dist/npm/wx';

/**
 * 获取常规天气数据集合（含7天天气预报、实况天气、逐3小时天气预报、生活指数）
 *
 * @param {string} 当前地区名称
 * @return {Promise} Promise 响应结果
 */
export function getWeather(location = '北京市') {
    return fly.get('/weather', {
        location
    });
}

/**
 * 获取当前空气质量
 *
 * @param {string} 当前地区名称
 * @return {Promise} Promise 响应结果
 */
export function getNowAir(location = '北京市') {
    return fly.get('/air/now', {
        location
    });
}

/**
 * 获取实时天气
 *
 * @param {string} 当前地区名称
 * @return {Promise} Promise 响应结果
 */
export function getNowWeather(location = '北京市') {
    return fly.get('/weather/now', {
        location
    });
}

/**
 * 获取生活指数
 *
 * @param {string} 当前地区名称
 * @return {Promise} Promise 响应结果
 */
export function getLifeStyle(location = '北京市') {
    return fly.get('/weather/lifestyle', {
        location
    });
}

/**
 * 获取逐时天气
 *
 * @param {string} 当前地区名称
 * @return {Promise} Promise 响应结果
 */
export function getHourlyWeather(location = '北京市') {
    return fly.get('/weather/hourly', {
        location
    });
}

/**
 * 获取未来7天天气预报
 *
 * @param {string} 当前地区名称
 * @return {Promise} Promise 响应结果
 */
export function getForecast(location = '北京市') {
    return fly.get('/weather/forecast', {
        location
    });
}

/**
 * 城市地域搜索
 *
 * @param {string} 检索词
 * @return {Promise} Promise 响应结果
 */
export function searchLocation(location = '北京市') {
    fly.config.baseURL = 'https://search.heweather.net';
    return fly.get('/find', {
        location
    });
}

/**
 * 获取当前所在位置（IP定位服务）
 *
 * @return {Promise} Promise 响应结果
 */
export function getMyLocation() {
    let fly = new Fly();
    fly.config.baseURL = 'https://apis.map.qq.com/ws/location/v1';
    return fly.get('/ip?key=YSJBZ-6SE3G-YNXQP-IG5UK-FAAPQ-S4B7D');
}
