<template>
  <a class="link" :href="$props.href">
    <SpanTypographyComponent :typography="$props.typography"  />
  </a>
</template>

<script setup lang="ts">
  import SpanTypographyComponent from '@/components/atoms/typography/span-typography/span-typography.component.vue';

  defineProps({
    typography: String,
    href: String
  })
</script>

<style scoped lang="scss">
  .link {
    cursor: pointer;
  }

  .link:hover {
    text-decoration: underline;
  }

</style>