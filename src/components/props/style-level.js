export const styleLevelProp = {
  required: false,
  type: String,
  default: "minimal",
  validator(value) {
    return ['unstylized', 'minimal', 'opinionated'].includes(value)
  }
}
