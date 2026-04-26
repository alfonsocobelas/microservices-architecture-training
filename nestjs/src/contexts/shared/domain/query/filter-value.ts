import { PrimitiveValueObject } from '../value-objects/primitive-value-object'

export type FilterValueType = string | number | boolean;

export class FilterValue extends PrimitiveValueObject<FilterValueType> {
  constructor(value: FilterValueType) {
    super(value)
  }

  static create(value: string): FilterValue {
    return new FilterValue(value)
  }
}

// export type FilterValueType = string | number | boolean

// type ValueObjectType = StringValueObject | NumberValueObject | BooleanValueObject

// export class FilterValue {
//   private readonly valueObject: ValueObjectType

//   private constructor(valueObject: ValueObjectType) {
//     this.valueObject = valueObject
//   }

//   static create(value: FilterValueType): FilterValue {
//     if (typeof value === 'string') {
//       return new FilterValue(new (class extends StringValueObject {}) (value))
//     }
//     if (typeof value === 'number') {
//       return new FilterValue(new (class extends NumberValueObject {}) (value))
//     }
//     if (typeof value === 'boolean') {
//       return new FilterValue(new (class extends BooleanValueObject {}) (value))
//     }
//     throw new Error('Invalid filter value type')
//   }

//   get value(): FilterValueType {
//     return this.valueObject.value
//   }
// }

// // primitive-value-object.ts
// export abstract class PrimitiveValueObject<T extends string | number | boolean> {
//   constructor(public readonly value: T) {
//     this.validate(value)
//   }

//   protected abstract validate(value: T): void
// }

// // string-value-object.ts
// import { PrimitiveValueObject } from './primitive-value-object'

// export class StringValueObject extends PrimitiveValueObject<string> {
//   protected validate(value: string): void {
//     if (!value || !value.trim().length) {
//       throw new Error('String value cannot be empty')
//     }
//   }
// }

// // number-value-object.ts
// import { PrimitiveValueObject } from './primitive-value-object'

// export class NumberValueObject extends PrimitiveValueObject<number> {
//   protected validate(value: number): void {
//     if (typeof value !== 'number' || isNaN(value)) {
//       throw new Error('Value must be a valid number')
//     }
//   }
// }

// // boolean-value-object.ts
// import { PrimitiveValueObject } from './primitive-value-object'

// export class BooleanValueObject extends PrimitiveValueObject<boolean> {
//   protected validate(value: boolean): void {
//     if (typeof value !== 'boolean') {
//       throw new Error('Value must be a boolean')
//     }
//   }
// }

// // filter-value.ts
// import { PrimitiveValueObject } from './primitive-value-object'
// import { StringValueObject } from './string-value-object'
// import { NumberValueObject } from './number-value-object'
// import { BooleanValueObject } from './boolean-value-object'

// export type FilterValueType = string | number | boolean

// export class FilterValue {
//   private readonly valueObject: PrimitiveValueObject<FilterValueType>

//   private constructor(valueObject: PrimitiveValueObject<FilterValueType>) {
//     this.valueObject = valueObject
//   }

//   static create(value: FilterValueType): FilterValue {
//     if (typeof value === 'string') {
//       return new FilterValue(new StringValueObject(value))
//     }
//     if (typeof value === 'number') {
//       return new FilterValue(new NumberValueObject(value))
//     }
//     if (typeof value === 'boolean') {
//       return new FilterValue(new BooleanValueObject(value))
//     }
//     throw new Error('Invalid filter value type')
//   }

//   get value(): FilterValueType {
//     return this.valueObject.value
//   }
// }
