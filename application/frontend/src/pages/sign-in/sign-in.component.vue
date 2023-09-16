<template>
    <div class="container">
        <div class="container--inner">
            <FormComponent
                :header="'Sign In'"
                :sub-header="'Access your account to start typing!'"
                :form-group-collection="formGroupCollection"
            ></FormComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { FormGroup } from "../../components/molecules/form-group";
    import { FormComponent } from "./../../components/organisms/form";
    
    const formGroupCollection = new Array<FormGroup>(
        {
            name: "Access code",
            formFieldCollection: []
        }
    );
</script>

<style scoped lang="scss">
    .container {
        width: 100vw;
        height: 100vh;
    }
</style>