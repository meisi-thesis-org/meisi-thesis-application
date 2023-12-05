<template>
    <div id="form-control">
        <div id="form-control__inner">
            <input :class="defineClasses" :name="definedProps.name" :type="definedProps.type"
                :placeholder="definedProps.placeholder" v-model="state[definedProps.name]"
                @input="$emit('isInvalid', emitterAction())">
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { FormControlProps } from './FormControl.type';
import useVuelidate, { type ValidationRuleWithoutParams } from '@vuelidate/core';
const definedProps = defineProps<FormControlProps>()
const definedEmits = defineEmits(['isInvalid'])

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
const emitterAction = () => { console.log($v.value); touchField(); return isInvalid.value; }
const touchField = () => $v.value[definedProps.name].$touch();
const isDirty = computed<boolean>(() => $v.value[definedProps.name].$dirty);
const isInvalid = computed<boolean>(() => isDirty.value === true && $v.value[definedProps.name].$errors.length > 0);
const defineClasses = computed(() => {
    if(isDirty.value === false) return
    return isInvalid.value && isDirty.value ? 'invalid' : 'valid'
})
</script>

<style scoped lang="scss">
#form-control {
    &__inner {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        input {
            padding: 1.5rem;
            width: 100%;
            border: hidden;
            box-shadow: 0 0 0 0.025rem var(--dark--theme--color);
            border-radius: 0.15rem;
            outline: none;
        }

        .valid {
            box-shadow: 0 0 0 0.050rem green;
        }

        .invalid {
            box-shadow: 0 0 0 0.050rem red;
        }
    }
}
</style>