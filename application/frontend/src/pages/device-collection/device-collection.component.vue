<template>
    <div class="container">
        <div class="container__inner">
            <div class="container__inner--header">
                <InfoBoxComponent 
                    :backgroundColor="'light-purple'" 
                    :content="'Devices'" 
                    :color="'hard-purple'"
                ></InfoBoxComponent>
                <IconComponent :name="'plus-device'" :color="'hard-purple'"></IconComponent>
            </div>
            <div class="container__inner--body">
                <CardComponent></CardComponent>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CardComponent } from "./../../components/organisms/card";
import { InfoBoxComponent } from "./../../components/molecules/info-box";
import { IconComponent } from "./../../components/atoms/icon";
</script>

<style scoped lang="scss">
.container {
    width: inherit;
    min-height: inherit;

    &__inner {
        width: 100vw;
        padding: 2.5rem;

        display: flex;
        flex-direction: column;

        &--header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>