import { makeState } from './helper.js'
import { Rules } from './rules.js'

export default class Helper {
  state = {}
  errors = {}
  fields = []

  constructor (fields) {
    this.fields = fields
    const { form, errors } = makeState(fields)
    // Set state
    this.errors = { passes: true, ...errors }
    this.state = { form, errors: this.errors }
  }

  flattenMessage = (errorsMessage) => {
    let state = null
    let message = ''
    let result = {}
    Object.keys(errorsMessage).forEach((fieldName, index) => {
      this.fields.forEach(i => {
        if (fieldName === i) {
          // Find false state
          Object.keys(errorsMessage[fieldName]).forEach(key => {
            const getMessage = errorsMessage[fieldName][key].message
            if (!errorsMessage[fieldName][key].state) {
              state = false
              message = getMessage
              result = {
                ...result,
                [fieldName]: { state, message }
              }
            }
          })
        }
      })
    })
    return result
  }

  validate = (input, rules) => {
    let passes = true
    Object.keys(rules).forEach(i => {
      Object.keys(rules[i]).forEach(func => {
        const funcName = func
        const fieldName = i
        const validator = new Rules(input[fieldName])
        const funcValue = rules[fieldName][funcName].value
        const funcMessage = rules[fieldName][funcName].message

        // Which rules func? because some rules have different args number
        if (funcName === 'required') {
          if (!validator[funcName]()) {
            passes = false
            this.errors[fieldName][funcName] = {
              state: false,
              message: rules[fieldName][funcName]
            }
          } else {
            this.errors[fieldName][funcName] = {
              state: true,
              message: ''
            }
          }
        }

        if (funcName === 'minLength') {
          if (!validator[funcName](funcValue)) {
            passes = false
            this.errors[fieldName][funcName] = {
              state: false,
              message: funcMessage || `Min. ${fieldName} length is ${funcValue}`
            }
          } else {
            this.errors[fieldName][funcName] = {
              state: true,
              message: ''
            }
          }
        }

        if (funcName === 'maxLength') {
          if (!validator[funcName](funcValue)) {
            passes = false
            this.errors[fieldName][funcName] = {
              state: false,
              message: funcMessage || `Max. ${fieldName} length is ${value}`
            }
          } else {
            this.errors[fieldName][funcName] = {
              state: true,
              message: ''
            }
          }
        }
        
      })
    })
    this.errors.passes = passes
    return this.errors
  }
}
