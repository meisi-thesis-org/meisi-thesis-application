<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <div id="wrapper__inner--content__section">
                    <Typography :content="'Manage Account'" :segment="'designation'" />
                    <div id="wrapper__inner--content__section--field">
                        <Typography :content="'Username'" :segment="'designation'" />
                        <EditableControl :content="user?.username ?? ''" :is-editable="isOwner" :type="'text'" @on-blur="(data: string) => updateUser({ username: data})" />
                    </div>
                    <div id="wrapper__inner--content__section--field">
                        <Typography :content="'Email'" :segment="'designation'" />
                        <EditableControl :content="user?.email ?? ''" :is-editable="isOwner" :type="'email'" @on-blur="(data: string) => updateUser({ email: data})" />
                    </div>
                    <div id="wrapper__inner--content__section--field">
                        <Typography :content="'Phone Number'" :segment="'designation'" />
                        <EditableControl :content="user?.phoneNumber ?? ''" :is-editable="isOwner" :type="'tel'" @on-blur="(data: string) => updateUser({ phoneNumber: data})" />
                    </div>
                </div>
                <div id="wrapper__inner--content__section">
                    <Typography :content="'Manage Profile'" :segment="'designation'" />
                    <div id="wrapper__inner--content__section--field">
                        <Typography :content="'Name'" :segment="'designation'" />
                        <EditableControl :content="user?.name ?? ''" :is-editable="isOwner" :type="'text'" @on-blur="(data: string) => updateUser({ name: data})" />
                    </div>
                    <div id="wrapper__inner--content__section--field">
                        <Typography :content="'Date Birth'" :segment="'designation'" />
                        <EditableControl :content="user?.dateBirth ?? ''" :is-editable="isOwner" :type="'date'" @on-blur="(data: string) => updateUser({ dateBirth: data})" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Typography from '@/components/Typography.vue';
import EditableControl from '@/components/EditableControl.vue';
import { usePermission } from '@/composables/usePermission';
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useLoader } from '@/composables/useLoader';
import type { Primitive } from '@/types/Primitive';
const { isOwner } = usePermission();
const useUserStore = useUser()
const { user } = storeToRefs(useUserStore);
const { isLoading } = useLoader();

const updateUser = async (data: Record<string, Primitive>) => {
    try {
        isLoading.value = !isLoading.value;
        await useUserStore.updateUserByUuid(user.value!.uuid, data);
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}
</script>

<style scoped lang="scss">
#wrapper {
    &__inner {
        &--content {
            padding: 2.5rem;

            display: flex;
            flex-direction: column;
            gap: 1.5rem;

            &__section {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
        }
    }
}
</style>