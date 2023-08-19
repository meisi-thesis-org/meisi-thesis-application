const Collection = {
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400
} as const;
type Keys = (typeof Collection)[keyof typeof Collection];

export {
  Collection,
  type Keys
}
