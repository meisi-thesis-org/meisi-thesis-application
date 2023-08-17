const Collection = {
  INTERNAL_SERVER_ERROR: 500,
  NON_FOUND_EXCEPTION: 404
} as const;
type Keys = (typeof Collection)[keyof typeof Collection];

export {
  Collection,
  type Keys
}
