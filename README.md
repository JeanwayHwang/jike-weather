# jike-weather

> 即刻天气：一款基于Mpvue框架开发的天气工具类微信小程序。

### 扫码体验

微信小程序码：<img src="https://github.com/JeanwayHwang/jike-weather/blob/master/asset/xcx_code.png" width="300" alt="微信小程序码">

### 预览图
<img src="https://github.com/JeanwayHwang/jike-weather/blob/master/asset/home.png" width="200" alt="首页">
<img src="https://github.com/JeanwayHwang/jike-weather/blob/master/asset/home2.png" width="200" alt="首页2">
<img src="https://github.com/JeanwayHwang/jike-weather/blob/master/asset/collection.png" width="200" alt="收藏页">
<img src="https://github.com/JeanwayHwang/jike-weather/blob/master/asset/search.png" width="200" alt="搜索页">
<img src="https://github.com/JeanwayHwang/jike-weather/blob/master/asset/poster.png" width="200" alt="分享页">
<img src="https://github.com/JeanwayHwang/jike-weather/blob/master/asset/setting.png" width="200" alt="设置">

### 已实现功能：

- [x]   自动定位、获取当前位置的天气（含逐时预报、七日预报、空气质量、生活指数等）
- [x]   城市区域搜索功能（含历史记录）
- [x]   多地城市收藏夹功能（含添加、删除、排序等）
- [x]   每日天气精美海报分享功能

### 未来迭代功能：
- [ ]   用户设置、关注城市等信息去本地化实现线上存储
- [ ]   主题换肤功能
- [ ]   新增背景音乐


## 使用方式

``` bash

# 安装依赖
npm i

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```