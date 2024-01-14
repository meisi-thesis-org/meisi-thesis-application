<template>
    <textarea @blur="$emit('onBlur', $event)" :class="definedProps.color" :disabled="!definedProps.isEditable" id="editable-field" type="text" v-model="content">
</textarea>
</template>

<script setup lang="ts">
import type { EditableFieldProps } from '@/types/EditableField';
import { ref } from 'vue';
const definedProps = defineProps<EditableFieldProps>()
const definedEmitters = defineEmits(['onBlur'])
const content = ref(definedProps.content)
</script>

<style scoped lang="scss">
#editable-field {
    width: 100%;
    border: none;
    background-color: inherit;
    outline: none;
}
</style>