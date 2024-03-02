import { useFetch } from '@/composables/useFetch';
import type { SubscriptionEntity } from '@/types/Entities';
import type { Primitive } from '@/types/Primitive';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useSubscription = defineStore('subscriptions', () => {
  const { createRequest } = useFetch();
  const state = ref<SubscriptionEntity[]>([])

  const findSubscriptionByUuid = async (uuid: string) => {
    try {
      const response = await createRequest<SubscriptionEntity>(`accounting/subscriptions/${uuid}`, 'GET');
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }

  const findSubscriptionsByForeignsUuid = async (
    walletUuid?: string,
    dossierUuid?: string,
    bookUuid?: string,
    subscriptionUuid?: string,
    pageUuid?: string
  ) => {
    try {
      const response = await createRequest<SubscriptionEntity[]>('accounting/subscriptions', 'GET', undefined, { walletUuid, dossierUuid, bookUuid, subscriptionUuid, pageUuid });
      return response.data;
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const createSubscription = async (data: Record<string, Primitive>) => {
    try {
      const response = await createRequest<SubscriptionEntity>('accounting/subscriptions', 'POST', data);
      state.value?.push(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateSubscriptionByUuid = async (uuid: string, data: Record<string, Primitive>) => {
    try {
      const response = await createRequest<SubscriptionEntity>(`accounting/subscriptions/${uuid}`, 'PUT', data);
      state.value = state.value.map((subscription) => {
        if (subscription.uuid === response.data.uuid) {
          subscription.visible = response.data.visible;
          subscription.active = response.data.active;
          subscription.updatedAt = response.data.updatedAt;
        }
        return subscription;
      })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    subscriptions: state,
    findSubscriptionByUuid,
    findSubscriptionsByForeignsUuid,
    createSubscription,
    updateSubscriptionByUuid,
    updateState: (subscriptions: SubscriptionEntity[]) => state.value = subscriptions
  }
})

export { useSubscription };
