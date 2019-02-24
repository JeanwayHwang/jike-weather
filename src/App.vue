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
    html, body {
        background-color: #f7f5f4;
    }
</style>
