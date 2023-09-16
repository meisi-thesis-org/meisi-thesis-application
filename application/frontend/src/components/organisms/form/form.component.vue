<template>
    <div class="form">
        <div class="form__inner">
            <div class="form__inner--block">
                <TypographyComponent 
                    class="form__inner--block--typography__header" 
                    :content="definedProps.header" 
                    :segment="'header'">
                </TypographyComponent>
                <TypographyComponent 
                    class="form__inner--block--typography__sub-header" 
                    :content="definedProps.subHeader" 
                    :segment="'sub-header'">
                </TypographyComponent>
            </div>
            <div class="form__inner--block">
                <FormGroupComponent 
                    v-for="formGroup of definedProps.formGroupCollection" 
                    :name="formGroup.name" 
                    :form-field-collection="formGroup.formFieldCollection"
                ></FormGroupComponent>
            </div>
            <div class="form__inner--block">
                <ButtonComponent 
                    :content="definedProps.buttonLabel" 
                    :action="definedProps.buttonAction"
                ></ButtonComponent>
            </div>
            <DividerComponent :width="'100%'" :height="'0.025rem'"></DividerComponent>
            <div class="form__inner--block link-collection">
                <LinkComponent v-for="link of definedProps.linkCollection" :path="link.path" :content="link.content"></LinkComponent>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { FormProps } from './form.component.type';
    import { TypographyComponent } from '../../atoms/typography';
    import { FormGroupComponent } from '../../molecules/form-group';
    import { ButtonComponent } from "../../molecules/button";
    import { DividerComponent } from '../../atoms/divider';
    import { LinkComponent } from "../../molecules/link";

    const definedProps = defineProps<FormProps>();
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
                    &__sub-header {
                        text-align: center;
                    }
                }

                &.link-collection {
                    gap: 0.25rem;
                }
            }
        }
    }
</style>