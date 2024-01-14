<template>
    <div class="form-control" :id="definedId">
        <input class="form-control__input" :class="classes" :type="definedProps.type" :name="definedProps.name"
            :placeholder="definedProps.placeholder" v-model="state[definedProps.name]"
            @input="$emit('isInvalid', onInputEmitter())">
        <div v-if="isInvalid && definedProps.hideAlerts === false" class="form-control__errors">
            <Typography v-if="isInvalid" v-for="error of $v.$errors" :content="'* ' + error.$message.toString()"
                :segment="'error'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormControlProps } from '@/types/FormControl';
import { useVuelidate, type ValidationRuleWithoutParams } from '@vuelidate/core';
import { computed, ref } from 'vue';
import Typography from './Typography.vue';

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
const onInputEmitter = () => { touchField(); return isInvalid.value; }
const isDirty = computed<boolean>(() => $v.value[definedProps.name].$dirty);
const isInvalid = computed<boolean>(() => isDirty.value === true && $v.value[definedProps.name].$errors.length > 0);
const classes = computed(() => {
    if (isDirty.value === false || definedProps.hideAlerts === true) return
    return isInvalid.value && isDirty.value ? 'invalid' : 'valid'
})
</script>

<style scoped lang="scss">
.form-control {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    &__input {
        padding: 1rem;

        border: none;
        border-radius: 0.15rem;
        box-shadow: 0 0 0 0.025rem currentColor;
        outline: none;

        &.valid {
            box-shadow: 0 0 0 0.050rem green;
        }

        &.invalid {
            box-shadow: 0 0 0 0.050rem red;
        }
    }

    &__errors {
        padding: 0.25rem 0.5rem;
        display: inherit;
        flex-direction: inherit;
        gap: 0.5rem;
    }
}</style>