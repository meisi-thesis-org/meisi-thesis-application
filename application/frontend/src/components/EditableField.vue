<template>
  <textarea
    v-if="definedProps.isEditable || content"
    :maxlength="maxLength ?? ''"
    :placeholder="'Type something here...'" 
    @blur="$emit('onBlur', content)"
    :class="definedProps.color" 
    :disabled="!definedProps.isEditable" 
    id="editable-field" 
    v-model="content"
    :style="isEditable ? { 'filter': 'blur(0)' } : { 'filter': 'blur(0.25rem)' }">
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
  overflow:hidden;
  resize: none;
  width: 100%;
  border: none;
  background-color: inherit;
  outline: none;
}

textarea::placeholder {
  color: currentColor;
}
</style>