<template>
    <div class="card">
        <div class="card__inner">

        </div>
    </div>
</template>

<script setup lang="ts">
type CardComponentProps = {}
const definedProps = defineProps();
</script>

<style scoped lang="scss">
.card {
    &__inner {
        width: 100%;
        display: flex;
        flex-direction: row;
    }
}
</style>