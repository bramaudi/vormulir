import { makeState } from './helper'
import { Rules } from './rules'

import { StateHelper, ErrorsState, Fields, FormField, ValidationRules} from './types'

export default class Vormulir {
  public state: StateHelper
  
  private errors: ErrorsState
  private fields: Fields

  constructor (fields: Fields) {
    this.fields = fields
    const { form, errors } = makeState(fields)
    
    // Set state
    this.errors = { passes: true, ...errors }
    this.state = { form, errors: this.errors }
  }

  flattenMessage = (errorsMessage: ErrorsState) => {
    const objectExists = Object.keys(errorsMessage)
    const { passes } = errorsMessage
    let result = {}

    objectExists && objectExists.forEach((fieldName, index) => {
      this.fields.forEach(i => {
        if (fieldName === i) {
          // Find false state
          errorsMessage[fieldName] && Object.keys(errorsMessage[fieldName]).forEach(func => {
            // Make sure only proccess rules function
            const availFuncList = ['required', 'maxLength', 'minLength', 'custom']
            if (availFuncList.indexOf(func) !== -1) {
              const getMessage = errorsMessage[fieldName][func].message
              if (!errorsMessage[fieldName][func].state) {
                result = {
                  ...result,
                  [fieldName]: getMessage
                }
              }
            }
          })
        }
      })
    })
    
    return { passes, ...result }
  }

  validate = (input: FormField, rules: ValidationRules, debug = false) => {
    let passes = true
    Object.keys(rules).forEach(i => {
      Object.keys(rules[i]).forEach(func => {
        const funcName = func
        const fieldName = i
        const validator = new Rules(input[fieldName])
        const funcValue = rules[fieldName][funcName].value
        const funcRegex = rules[fieldName][funcName].regex
        const funcMessage = rules[fieldName][funcName].message

        const pushErrMsg = (funcResult: boolean): void => {
          if (!funcResult) {
            passes = false
            this.errors[fieldName] = {
              ...this.errors[fieldName],
              [funcName]: {
                state: false,
                message: funcMessage || rules[fieldName][funcName]
              }
            }
          } else {
            this.errors[fieldName] = {
              ...this.errors[fieldName],
              [funcName]: {
                state: true,
                message: ''
              }
            }
          }
        }

        if ('optional' in rules[fieldName]) {
          if (input[i].length) {
            if (funcName === 'required') {
              pushErrMsg(validator[funcName]())
            }        
            if (funcName === 'custom') {
              pushErrMsg(funcRegex.test(input[i]))
            }
            if (funcName === 'minLength' || funcName === 'maxLength') {
              pushErrMsg(validator[funcName](funcValue))
            }  
          }
        } else {
          if (funcName === 'required') {
            pushErrMsg(validator[funcName]())
          }        
          if (funcName === 'custom') {
            pushErrMsg(funcRegex.test(input[i]))
          }
          if (funcName === 'minLength' || funcName === 'maxLength') {
            pushErrMsg(validator[funcName](funcValue))
          }
        }

      })
    })
    
    this.errors.passes = passes
    if (!debug) {
      this.errors = this.flattenMessage(this.errors)
    }
    return this.errors
  }
}
