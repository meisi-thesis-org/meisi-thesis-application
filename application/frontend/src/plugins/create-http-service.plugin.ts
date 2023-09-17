import { HttpService } from '@/services/http.service'
import { provide } from 'vue'

export const createHttpService = {
  install: () => {
    provide('httpService', new HttpService());
  }
}
