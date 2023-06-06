import { type HttpStatusCode } from '../collections/http-status-code.collection'

export interface IException {
  status: HttpStatusCode
  message: string
}
