<template>
    <input :id="definedId" :type="definedProps.type" :name="definedProps.name"
        :placeholder="definedProps.placeholder" v-model="state[definedProps.name]" @input="$emit('isInvalid', onInputEmitter())">
</template>

<script setup lang="ts">
import type { FormControlProps } from '@/types/FormControl';
import { useVuelidate, type ValidationRuleWithoutParams } from '@vuelidate/core';
import { computed, ref } from 'vue';

const definedProps = defineProps<FormControlProps>()
const definedEmits = defineEmits(['isInvalid'])
const definedId = computed(() => `${definedProps.name}__form-control`)

const createdRules = computed(() => {
    const rules: Record<string, Record<string, ValidationRuleWithoutParams>> = {}
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
const touchField = () => $v.value[definedProps.name].$touch();
const onInputEmitter = () => { console.log($v.value); touchField(); return isInvalid.value; }
const isDirty = computed<boolean>(() => $v.value[definedProps.name].$dirty);
const isInvalid = computed<boolean>(() => isDirty.value === true && $v.value[definedProps.name].$errors.length > 0);
</script>

<style scoped lang="scss">
input {
    padding: 1rem;

    border: none;
    border-radius: 0.15rem;
    box-shadow: 0 0 0 0.025rem currentColor;
    outline: none;
}
</style>