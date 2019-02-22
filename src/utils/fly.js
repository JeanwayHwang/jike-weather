import Fly from 'flyio/dist/npm/wx';
let fly = new Fly(); // 创建fly实例

// 添加请求拦截器
fly.interceptors.request.use((request) => {
    wx.showLoading({title: '拼命加载中...'});
    return request;
});

// 添加响应拦截器
fly.interceptors.response.use((response, promise) => {
    wx.hideLoading();
    return Promise.resolve(response.data);
}, (err, promise) => {
    wx.hideLoading();
    wx.showToast({
        title: err.message,
        icon: 'none'
    });
    return promise.resolve();
});

return fly;
