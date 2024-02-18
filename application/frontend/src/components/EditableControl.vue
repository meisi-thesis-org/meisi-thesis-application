<template>
    <input 
        v-if="definedProps.isEditable || content"
        :placeholder="placeholder" 
        :maxlength="definedProps.length"
        :type="definedProps.type"
        @blur="$emit('onBlur', content)" 
        :class="definedProps.color"
        :disabled="!definedProps.isEditable" 
        id="editable-control" 
        v-model="content"
        autocomplete="off" />
</template>
  
<script setup lang="ts">
import type { EditableControlProps } from '@/types/EditableControl';
import { computed, ref } from 'vue';
const definedProps = defineProps<EditableControlProps>()
const definedEmitters = defineEmits(['onBlur'])
const content = ref(definedProps.content)
const placeholder = computed(() => definedProps.type === 'text' ? 'Type something here' : 'Type a numerical value here')
</script>
  
<style scoped lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

#editable-control {
    width: 100%;
    border: none;
    background-color: inherit;
    outline: none;
}

::placeholder {
    color: currentColor;
}
</style>