import { ValueObject } from './value-object'

export abstract class ValueObjectList<
  T extends ValueObject<unknown>,
  Self extends ValueObjectList<T, Self>
> {
  protected readonly _items: ReadonlyArray<T>

  protected constructor(items: T[]) {
    this.ensureIsArray(items)
    this._items = Object.freeze([...items])
  }

  abstract add(item: T): Self
  abstract remove(item: T): Self

  // immutable array of the items
  get items(): ReadonlyArray<T> {
    return this._items
  }

  // mutable array copy of the items
  get toArray(): T[] {
    return [...this._items]
  }

  get values(): Array<T['value']> {
    return this._items.map(item => item.value)
  }

  get count(): number {
    return this._items.length
  }

  get length(): number {
    return this._items.length
  }

  equals(vo: ValueObjectList<T, Self>): boolean {
    if (vo === null || vo === undefined) {
      return false
    }

    if (vo.constructor !== this.constructor) {
      return false
    }

    if (this._items.length !== vo._items.length) {
      return false
    }

    return this._items.every(item => vo.contains(item))
  }

  contains(id: T): boolean {
    return this._items.some(item => item.equals(id))
  }

  hasDuplicates(): boolean {
    const ids = this._items.map(i => JSON.stringify(i.value))
    const unique = new Set(ids)
    return unique.size !== this._items.length
  }

  private ensureIsArray(items: T[]): void {
    if (!Array.isArray(items)) {
      throw new Error(`[${this.constructor.name}] Items must be an array`)
    }
  }
}
