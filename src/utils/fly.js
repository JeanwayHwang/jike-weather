import Fly from 'flyio/dist/npm/wx';
let fly = new Fly(); // 创建fly实例

const APP_KEY = '85526899de2143f49e233b05266a3a89';

// 基础配置
fly.config.timeout = 10000;
fly.config.baseURL = 'https://free-api.heweather.net/s6';

// 添加请求拦截器
fly.interceptors.request.use((request) => {
    wx.showLoading({title: '拼命加载中...'});
    console.log(request);
    request.body['key'] = APP_KEY;
    return request;
});

// 添加响应拦截器
fly.interceptors.response.use((response, promise) => {
    console.log(response);
    wx.hideLoading();
    return Promise.resolve(response.data);
}, (err, promise) => {
    const errMsg = '请求数据异常：' + err.status;
    wx.hideLoading();
    wx.showToast({
        title: errMsg,
        icon: 'none'
    });
    return promise.reject(errMsg);
});

export default fly;
