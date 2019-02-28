<template>
    <div>Search</div>
</template>

<script>
import QQMapWX from '../../../static/js/qqmap-wx-jssdk.js';
export default {
    data() {
        return {

        };
    },

    components: {},

    methods: {
    },

    mounted() {
        let qqmapsdk = new QQMapWX({
            key: 'YSJBZ-6SE3G-YNXQP-IG5UK-FAAPQ-S4B7D'
        });
        qqmapsdk.search({
            keyword: '百度',
            success: function (res) {
                console.log('1111', res);
            },
            fail: function(res) {
                console.log('2222', res.status, res.message);
            }
        });
    }
};
</script>

<style lang="scss" scoped>

</style>
