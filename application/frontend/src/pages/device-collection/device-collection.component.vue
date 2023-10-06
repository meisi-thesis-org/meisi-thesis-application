<template>
    <div class="container">
        <div class="container__inner">
            <CardComponent
                :header="{ content: 'Devices', backgroundColor: 'light-purple', color: 'hard-purple' }"
            ></CardComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CardComponent } from "./../../components/organisms/card";
</script>

<style scoped lang="scss">
.container {
    width: inherit;
    min-height: inherit;

    &__inner {
        min-height: inherit;
        padding: 2.5rem;
    }
}
</style>