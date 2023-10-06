<template>
    <div class="card">
        <div class="card__inner">
            <div class="card__inner--header">
                <InfoBoxComponent 
                    :backgroundColor="definedProps.header.backgroundColor" 
                    :content="definedProps.header.content" 
                    :color="definedProps.header.color"
                ></InfoBoxComponent>
                <IconComponent :name="'plus-device'" :color="'hard-purple'"></IconComponent>
            </div>
            <div class="card__inner--body"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { InfoBoxComponent } from "./../../molecules/info-box";
import { IconComponent } from "./../../atoms/icon";
import { Colors } from "../../../app.style";
type CardComponentProps = {
    readonly header: {
        readonly backgroundColor: Colors;
        readonly color: Colors;
        readonly content: string;
    },
}
const definedProps = defineProps<CardComponentProps>();
</script>

<style scoped lang="scss">
.card {
    &__inner {
        width: 100%;
        display: flex;
        flex-direction: row;

        &--header {
            width: inherit;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>