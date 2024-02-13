<template>
    <input 
        v-if="definedProps.isEditable || content"
        :placeholder="'Type something here...'" 
        @blur="$emit('onBlur', content)" 
        :class="definedProps.color"
        :disabled="!definedProps.isEditable" 
        id="editable-control" 
        v-model="content" />
</template>
  
<script setup lang="ts">
import type { EditableControlProps } from '@/types/EditableControl';
import { ref } from 'vue';
const definedProps = defineProps<EditableControlProps>()
const definedEmitters = defineEmits(['onBlur'])
const content = ref(definedProps.content)
</script>
  
<style scoped lang="scss">
#editable-control {
    width: 100%;
    border: none;
    background-color: inherit;
    outline: none;
}

textarea::placeholder {
    color: currentColor;
}
</style>