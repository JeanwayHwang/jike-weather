<script>
export default {
    created() {
        const logs = mpvue.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        console.log(`log at:${Date.now()}`);
    }
};
</script>

<style>
    @import './common/css/iconfont.css';
    body {
        background-color:#f5f5f5;
        padding-bottom: 70px;
    }
    @font-face {
        font-family: "xiaoli";
        src: url("./common/css/font/xiaoli.eot"); /* IE9 */
        src: url("./common/css/font/xiaoli.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
        url("./common/css/font/xiaoli.woff") format("woff"), /* chrome、firefox */
        url("./common/css/font/xiaoli.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
        url("./common/css/font/xiaoli.svg#xiaoli") format("svg"); /* iOS 4.1- */
        font-style: normal;
        font-weight: normal;
    }
</style>
