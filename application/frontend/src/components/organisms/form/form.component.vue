<template>
    <form class="form" @submit.prevent="definedProps.submitAction">
        <div class="form__inner">
            <div class="form__inner--block">
                <TypographyComponent class="form__inner--block--typography__header" :content="definedProps.header"
                    :segment="'header'">
                </TypographyComponent>
                <TypographyComponent class="form__inner--block--typography__sub-header" :content="definedProps.subHeader"
                    :segment="'sub-header'">
                </TypographyComponent>
            </div>
            <div class="form__inner--block">
                <TypographyComponent
                    v-show="definedProps.hasError"
                    class="form__inner--block--typography__has-error"
                    content="Something went wrong. Please, confirm the provided data. In case the problem persists try again later."
                    :segment="'paragraph'">
                </TypographyComponent>
            </div>
            <div class="form__inner--block">
                <FormGroupComponent v-for="formGroup of definedProps.formGroupCollection" :name="formGroup.name"
                    :form-control-collection="formGroup.formControlCollection"></FormGroupComponent>
            </div>
            <div class="form__inner--block">
                <FormControlComponent :type="'submit'" :value="definedProps.submitLabel"></FormControlComponent>
            </div>
            <DividerComponent :width="'100%'" :height="'0.025rem'"></DividerComponent>
            <div class="form__inner--block link-collection">
                <LinkComponent v-for="link of definedProps.linkCollection" :path="link.path" :content="link.content">
                </LinkComponent>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { FormComponentProps } from './form.component.type';
import { TypographyComponent } from '../../atoms/typography';
import { FormGroupComponent } from '../../molecules/form-group';
import { DividerComponent } from '../../atoms/divider';
import { LinkComponent } from "../../molecules/link";
import { FormControlComponent } from '../../atoms/form-control';

const definedProps = defineProps<FormComponentProps>();
</script>

<style scoped lang="scss">
.form {
    height: 100vh;
    width: 100vw;

    &__inner {
        height: inherit;
        width: inherit;

        display: flex;
        flex-direction: column;
        justify-content: center;

        gap: 1.5rem;
        padding: 0 2rem;

        &--block {
            display: flex;
            flex-direction: column;
            gap: .5rem;

            &--typography {

                &__header,
                &__sub-header,
                &__has-error {
                    text-align: center;
                }

                &__has-error {
                    color: rgb(244, 53, 53);
                }
            }

            &.link-collection {
                gap: 0.25rem;
            }
        }
    }
}
</style>