<template>
    <div>
        <solution-tip v-if="pageType === 'solution'"></solution-tip>
        <data-source v-if="pageType === 'data'"></data-source>
        <about-author v-if="pageType === 'author'"></about-author>
        <reward-author v-if="pageType === 'reward'"></reward-author>
    </div>
</template>

<script>
import SolutionTip from '../../component/SolutionTip';
import DataSource from '../../component/DataSource';
import AboutAuthor from '../../component/AboutAuthor';
import RewardAuthor from '../../component/RewardAuthor';
export default {
    data() {
        return {
            pageType: ''
        };
    },
    components: {
        SolutionTip,
        DataSource,
        AboutAuthor,
        RewardAuthor
    },
    methods: {
    },
    mounted() {
        this.pageType = this.$root.$mp.query['type'];
    }
};
</script>

<style lang="scss" scoped>
</style>
