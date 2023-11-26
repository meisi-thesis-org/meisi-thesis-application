<template>
    <form id="form" onsubmit="onSubmit()">
        <div id="form__inner">
            <div id="form__inner--header">
                <Typography :content="'E-Bookler'" :segment="'header'" />
                <Typography :content="'Start typing on E-Bookler to monetize your content'" :segment="'sub-header'" />
            </div>
            <div id="form__inner--groups">
                <div id="form__inner--groups__item" v-for="formGroup of definedProps.formGroups">
                    <FormGroup :designation="formGroup.designation" :form-controls="formGroup.formControls" />
                </div>
            </div>
            <Divider :width="'100%'" :height="'0.025rem'" :background-color="'dark-theme'" />
            <div id="form__inner--actions">
                <FormButton :content="'Continue'" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import Typography from "@/components/atoms/Typography/Typography.vue"
import FormButton from "@/components/molecules/FormButton/FormButton.vue";
import FormGroup from "@/components/molecules/FormGroup/FormGroup.vue";
import Divider from "@/components/atoms/Divider/Divider.vue"
import type { FormProps } from "./Form.type";
const definedProps = defineProps<FormProps>()
const onSubmit = () => {}
</script>

<style scoped lang="scss">
#form {
    &__inner {
        padding: 1.5rem;

        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        &--header {
            text-align: center;
        }
    }
}
</style>