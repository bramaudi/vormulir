export type Fields = string[]

export type FormField = {
  [key: string]: string;
}

export type FormState = {
  loading: boolean;
  success: string | null;
  field: FormField
}

export type ErrorsState = {
  [key: string]: any;
}

export type StateHelper = {
  form: FormState,
  errors: ErrorsState
}

export type ValidationRules = {
  [key: string]: any
}