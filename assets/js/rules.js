export class Rules {
  constructor (input) {
    this.input = input
  }

  count () {
    const { input } = this
    return typeof input === 'number'
      ? input.toString().length
      : input.length
  }

  required () {
    return !!this.count()
  }

  minLength (number) {
    const { input } = this
    return this.count() < number ? false : true
  }

  maxLength (number) {
    const { input } = this
    return this.count() > number ? false : true
  }
}