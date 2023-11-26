<template>
    <div id="wrapper">
        <div id="wrapper__innner">
            <Form :form-groups="defineFormProps().formGroups" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormProps } from "@/components/organisms/Form/Form.type";
import Form from "@/components/organisms/Form/Form.vue"

const defineFormProps = (): FormProps => {
    return {
        formGroups: new Array(
        { 
            designation: 'Account Information', 
            formControls: [
                { type: 'password', placeholder: 'Access Code...', rules: ['required'] }
            ] 
        }
    )
    }
}

</script>

<style scoped lang="scss">

</style>