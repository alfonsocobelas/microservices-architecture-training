/* eslint-disable @typescript-eslint/no-explicit-any */
import { Criteria } from 'src/contexts/shared/domain/query/criteria'

export abstract class MockRepository<T> {
  private mocks: Map<string, jest.Mock> = new Map()

  protected getMock(methodName: string): jest.Mock {
    if (!this.mocks.has(methodName)) {
      this.mocks.set(methodName, jest.fn())
    }
    return this.mocks.get(methodName)!
  }

  protected setMockResult(methodName: string, result: unknown): void {
    this.getMock(methodName).mockResolvedValue(result)
  }

  assertCalled(methodName: string): void {
    expect(this.getMock(methodName)).toHaveBeenCalled()
  }

  assertNotCalled(methodName: string): void {
    expect(this.getMock(methodName)).not.toHaveBeenCalled()
  }

  assertCalledWith(methodName: string, ...expectedArgs: unknown[]): void {
    const calls = this.getMock(methodName).mock.calls
    const match = calls.some(call =>
      call.length === expectedArgs.length &&
      call.every((arg: unknown, i: number) => this.valueObjectEquals(arg, expectedArgs[i]))
    )

    expect(match).toBe(true)
  }

  assertLastCalledWith(methodName: string, ...expectedArgs: unknown[]): void {
    const calls = this.getMock(methodName).mock.calls
    const lastCall = calls[calls.length - 1]
    const match =
      lastCall &&
      lastCall.length === expectedArgs.length &&
      lastCall.every((arg: unknown, i: number) => this.valueObjectEquals(arg, expectedArgs[i]))

    expect(match).toBe(true)
  }

  assertCalledTimes(methodName: string, times: number): void {
    expect(this.getMock(methodName)).toHaveBeenCalledTimes(times)
  }

  assertMatchingCalledWith(check: (criteria: Criteria) => boolean): void {
    const mock = this.getMock('matching')
    const lastCallIndex = mock.mock.calls.length - 1
    const lastCallCriteria = mock.mock.calls[lastCallIndex][0] as Criteria
    expect(check(lastCallCriteria)).toBe(true)
  }

  assertCountCalledWith(check: (criteria: Criteria) => boolean): void {
    const mock = this.getMock('count')
    const lastCallIndex = mock.mock.calls.length - 1
    const lastCallCriteria = mock.mock.calls[lastCallIndex][0] as Criteria
    expect(check(lastCallCriteria)).toBe(true)
  }

  assertCalledWithSpecification(methodName: string, expectedSpec: Criteria) {
    const calls = this.getMock(methodName).mock.calls
    const match = calls.some(call =>
      call.length === 1 &&
      call[0] instanceof expectedSpec.constructor &&
      JSON.stringify(call[0]) === JSON.stringify(expectedSpec)
    )
    expect(match).toBe(true)
  }

  private valueObjectEquals(a: any, b: any): boolean {
    // Ambos son arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {return false}
      return a.every((item, i) => this.valueObjectEquals(item, b[i]))
    }

    // Uno es ValueObjectList y el otro es array
    if (a && typeof a.toArray === 'function' && Array.isArray(b)) {
      return this.valueObjectEquals(a.toArray, b)
    }
    if (b && typeof b.toArray === 'function' && Array.isArray(a)) {
      return this.valueObjectEquals(a, b.toArray)
    }

    // Ambos son ValueObjectList
    if (a && typeof a.equals === 'function' && b && typeof b.equals === 'function') {
      return a.equals(b)
    }

    // Value object simple
    if (a && typeof a.equals === 'function') {
      return a.equals(b)
    }
    if (b && typeof b.equals === 'function') {
      return b.equals(a)
    }

    // Primitivos
    return a === b
  }
}
