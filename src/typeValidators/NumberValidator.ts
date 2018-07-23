import { BaseTypeValidator } from "../BaseTypeValidator"
import { ContainingType } from "../intefaces"
import { number } from "../rules"
import Context from "../Context"

export default class NumberValidator extends BaseTypeValidator {

  constructor (integer: boolean = false, parent: ContainingType = null) {
    super(parent)

    // attaching type validator
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!number.number()(value)) context.addError('number.number', path, {})
      if (integer && !number.integer()(value)) context.addError('number.integer', path, {})
    })
  }

  get type (): string {
    return "number"
  }

  min (min: number, exclusive: boolean = false) {
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!number.min(min, exclusive)(value)) context.addError('number.min', path, {limit: min, exclusive})
    })
    return this
  }

  max (max: number, exclusive: boolean = false) {
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!number.max(max, exclusive)(value)) context.addError('number.max', path, {limit: max, exclusive})
    })
    return this
  }

  multipleOf (modulus: number) {
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!number.multipleOf(modulus)(value)) context.addError('number.multipleOf', path, {modulus})
    })
    return this
  }
}
