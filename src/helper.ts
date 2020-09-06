import { Fields, StateHelper } from './types.js'

export const makeState = (fields: Fields): StateHelper => {
  // Define "errors" & "form" state with types
  let errors = {}
  const form = {
    success: '',
    loading: false,
    field: {}
  }

  // Loop the fields into state
  fields.forEach(key => {
    errors = {
      ...errors,
      ...{
        [key]: null
      }
    }
    form.field = {
      ...form.field,
      ...{ [key]: '' }
    }
  })

  return { errors, form }
}