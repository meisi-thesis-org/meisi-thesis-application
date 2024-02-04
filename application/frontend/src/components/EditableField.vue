<template>
  <textarea
    :maxlength="maxLength"
    placeholder="Type something here..." 
    @blur="$emit('onBlur', content)"
    :class="definedProps.color" 
    :disabled="!definedProps.isEditable" 
    id="editable-field" 
    v-model="content">
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

textarea::placeholder {
  color: currentColor;
}
</style>