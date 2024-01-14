<template>
    <textarea :class="definedProps.color" :disabled="isUnknown" id="editable-field" type="text" v-model="content">
</textarea>
</template>

<script setup lang="ts">
import { usePermission } from '@/composables/usePermission';
import type { EditableFieldProps } from '@/types/EditableField';
import { ref } from 'vue';
const { isUnknown } = usePermission()

const definedProps = defineProps<EditableFieldProps>()
const content = ref(definedProps.content)
</script>

<style scoped lang="scss">
#editable-field {
    width: 100%;
    border: none;
    background-color: inherit;
}
</style>