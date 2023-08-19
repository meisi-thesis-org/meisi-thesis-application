const Collection = {
  REGISTER_EXCEPTION: 'register_exception',
  REGISTER_EMAIL: 'register_email'
} as const;
type Keys = (typeof Collection)[keyof typeof Collection];

export {
  Collection,
  type Keys
}
