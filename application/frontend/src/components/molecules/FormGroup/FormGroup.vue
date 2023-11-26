<template>
    <div id="form-group">
        <Typography :content="definedProps.designation" :segment="'designation'" />
        <div id="form-group--controls">
            <div id="form-group--controls__item" v-for="formControl of definedProps.formControls">
                <FormControl :type="formControl.type" :placeholder="formControl.placeholder" :rules="formControl.rules" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Typography from "@/components/atoms/Typography/Typography.vue"
import type { FormGroupProps } from "./FormGroup.type";
import FormControl from "@/components/atoms/FormControl/FormControl.vue";

const definedProps = defineProps<FormGroupProps>()
</script>

<style scoped lang="scss">
#form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>