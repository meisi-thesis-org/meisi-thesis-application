<template>
    <div id="form-control">
        <input :name="definedProps.name" :type="definedProps.type" :placeholder="definedProps.placeholder"
            v-model="state[definedProps.name]" @blur="$emit('updateState', emitterAction())">
        <Typography v-if="$v.$dirty === true" v-for="error of $v.$errors" :content="(error.$message as string)"
            :segment="'error'" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { FormControlProps } from './FormControl.type';
import useVuelidate, { type ValidationRuleWithoutParams } from '@vuelidate/core';
import Typography from '../typography/Typography.vue';
const definedProps = defineProps<FormControlProps>()
const definedEmits = defineEmits(['updateState'])

const createdRules = computed(() => {
    const rules: Record<string, Record<string, ValidationRuleWithoutParams<any>>> = {}
    rules[definedProps.name] = definedProps.rules
    return rules;
})

const createdState = computed(() => {
    const state: Record<string, string> = {}
    state[definedProps.name] = ''
    return state;
})

const state = ref(createdState.value);
const $v = useVuelidate(createdRules, state);
const emitterAction = () => { touchField(); return isInvalid.value; }
const touchField = () => $v.value[definedProps.name].$touch();
const isDirty = computed<boolean>(() => $v.value[definedProps.name].$dirty);
const isInvalid = computed<boolean>(() => isDirty.value === true && $v.value[definedProps.name].$errors.length > 0);
</script>

<style scoped lang="scss">
#form-control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    input {
        padding: 1.5rem;
        width: 100%;
        border: hidden;
        box-shadow: 0 0 0 0.020rem var(--dark--theme--color);
        border-radius: 0.050rem;
        outline: none;
    }
}
</style>