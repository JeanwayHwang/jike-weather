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

</style>
