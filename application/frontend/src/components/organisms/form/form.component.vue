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
        </div>
    </div>
</template>

<script setup lang="ts">
    import { FormProps } from './form.component.type';
    import { TypographyComponent } from '../../atoms/typography';
    import { FormGroupComponent } from '../../molecules/form-group';

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

            gap: 2rem;

            &--block {
                display: flex;
                flex-direction: column;
                gap: .5rem;

                padding: 0 2rem;
                &--typography {
                    &__header,
                    &__sub-header {
                        text-align: center;
                    }
                }
            }
        }
    }
</style>