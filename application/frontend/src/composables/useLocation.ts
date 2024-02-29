import type { Location } from "@/types/Location";
import { ref } from "vue"

const state = ref<Location>({ latitude: 0, longitude: 0 });

export const useLocation = () => {
    const loadLocation = async () => {
        const position = await new Promise<{ coords: { latitude: number, longitude: number } }>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => resolve(position), error => reject(error))
        })

        state.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
    }

    return { location: state, loadLocation, }
}