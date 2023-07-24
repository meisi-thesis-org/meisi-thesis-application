<template>
  <div class="container">
    <div class="container__inner">
      <FormComponent
        :greeting="'Welcome back to E-Bookler!'"
        :formGroups="formGroups"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import FormComponent from '@/components/organisms/form/form.component.vue';

  const formGroups = new Array(
    { name: "Access Code", type: "text", placeholder: "Your digital E-Bookler Access Code" }
  );
</script>

<style scoped lang="scss">
  .container {
    min-height: 100vh;
    width: 100vw;
  }
  
  .container__inner {
    min-height: inherit;
    width: inherit;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>