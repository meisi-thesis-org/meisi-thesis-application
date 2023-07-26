<template>
  <form class="form">
    <HeaderTypographyComponent 
      v-show="props.greeting"
      :typography="props.greeting"
    />
    <FormGroupComponent
      v-for="formGroup of props.formGroups"
      :name="formGroup.name"
      :type="formGroup.type"
      :placeholder="formGroup.placeholder"
    />
    <div class="form__actions">
      <div class="form__actions__button">
        <ButtonComponent :typography="'Sign In'" />
      </div>
      <div class="form__actions__link">
        <LinkComponent :typography="'New to the platform? SignUp here!'" />
        <LinkComponent :typography="'Forgot your access code? Recover here!'" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
  import FormGroupComponent from '@/components/molecules/form-group/form-group.component.vue';
  import HeaderTypographyComponent from '@/components/atoms/typography/header-typography/header-typography.component.vue';
  import ButtonComponent from '@/components/molecules/button/button.component.vue';
  import LinkComponent from '@/components/molecules/link/link.component.vue';

  const props = defineProps({
    greeting: String,
    formGroups: Array<{ name?: string, type: string, placeholder: string}>
  })
</script>

<style scoped lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    width: 80%;
    max-width: 520px;
    min-width: 320px;
  }

  .form__actions {
      width: 100%;

      display: flex;
      flex-direction: column;
  
      gap: 2.5rem;
  }

  .form__actions__link {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

</style>