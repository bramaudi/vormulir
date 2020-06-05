export const makeState = (fields) => {
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
        [key]: {}
      }
    }
    form.field = {
      ...form.field,
      ...{ [key]: '' }
    }
  })

  return { errors, form }
}
