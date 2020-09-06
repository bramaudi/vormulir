export class Rules {
  private input: string | number

  constructor (input: string) {
    this.input = input
  }

  count (): number {
    const { input } = this
    return typeof input === 'number'
      ? input.toString().length
      : input.length
  }

  required (): boolean {
    return !!this.count()
  }

  minLength (number: number): boolean {
    const { input } = this
    return this.count() < number ? false : true
  }

  maxLength (number: number): boolean {
    const { input } = this
    return this.count() > number ? false : true
  }
}