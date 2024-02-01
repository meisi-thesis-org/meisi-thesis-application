<template>
  <textarea :name="definedProps.name" placeholder="Type something here..." @blur="$emit('onBlur', emitContent)"
    :class="definedProps.color" :disabled="!definedProps.isEditable" id="editable-field" v-model="content">
</textarea>
</template>

<script setup lang="ts">
import type { EditableFieldProps } from '@/types/EditableField';
import { computed, ref } from 'vue';
const definedProps = defineProps<EditableFieldProps>()
const definedEmitters = defineEmits(['onBlur'])
const content = ref(definedProps.content)
const emitContent = computed(() => {
  const data: Record<string, Record<string, string>> = {}
  data[definedProps.name] = content.value as any
  return data;
})
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