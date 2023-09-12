<template>
    <div class="container">
        <div class="container__inner">
            <div class="container__inner__group">
                <BrandTypography content="E-Bookler"></BrandTypography>
            </div>
            <div class="container__inner__group">
                <Divider width="0.025rem" height="1rem"></Divider>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import BrandTypography from '../../atoms/typographies/brand-typography/brand-typography.component.vue';
import Divider from '../../atoms/divider/divider.component.vue';

</script>

<style scoped lang="scss">
    .container {
        width: 100vw;
        height: auto;

        &__inner {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            padding: 1.5rem;

            &__group {
                display: flex;
                flex-direction: row;
                align-items: center;
                
                * {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
</style>