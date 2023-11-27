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
                <div id="form__inner--actions__buttons">
                    <div id="form__inner--actions__buttons__item" v-for="formLink of definedProps.formActions.formButtons">
                        <FormButton :content="formLink.content" />
                    </div>
                </div>
                <Divider :width="'100%'" :height="'0.025rem'" :background-color="'dark-theme'" />
                <div id="form__inner--actions__links">
                    <div id="form__inner--actions__links__item" v-for="formLink of definedProps.formActions.formLinks">
                        <FormLink :href="formLink.href" :content="formLink.content" />
                    </div>
                </div>
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
import FormLink from "@/components/atoms/FormLink/FormLink.vue";
const definedProps = defineProps<FormProps>()

const onSubmit = () => { }
</script>

<style scoped lang="scss">
#form {
    min-height: inherit;
    
    &__inner {
        min-height: inherit;
        padding: 1.5rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.5rem;

        &--header {
            text-align: left;

            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        &--groups {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        &--actions {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;

            &__buttons {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;
                flex-wrap: wrap;

                &__item {
                    flex: 1;
                }
            }

            &__links {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
        }
    }
}
</style>