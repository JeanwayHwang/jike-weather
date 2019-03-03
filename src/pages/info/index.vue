<template>
    <div>
        <solution-tip v-if="pageType === 'solution'"></solution-tip>
        <data-source v-if="pageType === 'data'"></data-source>
        <about-author v-if="pageType === 'author'"></about-author>
    </div>
</template>

<script>
import SolutionTip from '../../component/SolutionTip';
import DataSource from '../../component/DataSource';
import AboutAuthor from '../../component/AboutAuthor';
export default {
    data() {
        return {
            pageType: ''
        };
    },
    components: {
        SolutionTip,
        DataSource,
        AboutAuthor
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
