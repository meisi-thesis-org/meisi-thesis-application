<template>
  <div class="container">
    <div class="container__inner">
      <FormComponent
        :greeting="'Welcome to E-Bookler!'"
        :formGroups="formGroups"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import FormComponent from '@/components/organisms/form/form.component.vue';

  const formGroups = new Array(
    { type: "password", placeholder: "Your digital E-Bookler Access Code" }
  );

  function onContinue(): void {}
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