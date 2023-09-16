<template>
    <div class="container">
        <div class="container--inner">
            <FormComponent
                :header="'E-Bookler'"
                :sub-header="'Start monetizing your writting time!'"
                :form-group-collection="formGroupCollection"
            ></FormComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { FormGroupProps } from "../../components/molecules/form-group";
    import { FormComponent } from "./../../components/organisms/form";
    
    const formGroupCollection = new Array<FormGroupProps>(
        {
            name: "Account Information",
            formFieldCollection: [
                {
                    type: 'password',
                    placeholder: 'Bookler Key...'
                }
            ]
        }
    );
</script>

<style scoped lang="scss">
    .container {
        width: 100vw;
        height: 100vh;
    }
</style>