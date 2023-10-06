<template>
    <div class="info-box" :class="definedProps.backgroundColor"> 
        <div class="info-box__inner">
            <TypographyComponent 
                :content="definedProps.content" 
                :segment="'info'" 
                :color="'hard-purple'"
            ></TypographyComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Colors } from "../../../app.style";
import { TypographyComponent } from "./../../atoms/typography";
type InfoBoxComponentProps = {
    backgroundColor: Colors;
    color: Colors;
    content: string;
}
const definedProps = defineProps<InfoBoxComponentProps>();
</script>

<style scoped lang="scss">
.info-box {
    border-radius: 0.50rem;

    &.light-purple {
        background-color: var(--purple-secondary);
    }

    &.hard-purple {
        background-color: var(--purple-primary);
    }
    
    &__inner {
        padding: 0.75rem;
    }
}
</style>