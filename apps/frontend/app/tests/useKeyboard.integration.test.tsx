import React, { useState } from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { useKeyboard } from '../hooks/useKeyboard'

afterEach(cleanup)

function TestComponent({ disabled = false }: { disabled?: boolean }) {
  const [keysPressed, setKeysPressed] = useState<string[]>([])
  const onKeyPress = (key: string) => {
    setKeysPressed((prev) => [...prev, key])
  }
  useKeyboard(onKeyPress, disabled)
  return <div data-testid="key-list">{keysPressed.join('')}</div>
}

describe('useKeyboard hook', () => {
  it('calls onKeyPress with ENTER when Enter is pressed', () => {
    const { getByTestId } = render(<TestComponent />)
    fireEvent.keyDown(document, { key: 'Enter' })
    expect(getByTestId('key-list').textContent).toBe('ENTER')
  })

  it('calls onKeyPress with BACKSPACE when Backspace is pressed', () => {
    const { getByTestId } = render(<TestComponent />)
    fireEvent.keyDown(document, { key: 'Backspace' })
    expect(getByTestId('key-list').textContent).toBe('BACKSPACE')
  })

  it('calls onKeyPress with the corresponding uppercase letter for letter keys', () => {
    const { getByTestId } = render(<TestComponent />)
    fireEvent.keyDown(document, { key: 'a' })
    fireEvent.keyDown(document, { key: 'b' })
    expect(getByTestId('key-list').textContent).toBe('AB')
  })

  it('does not call onKeyPress when disabled is true', () => {
    const { getByTestId } = render(<TestComponent disabled />)
    fireEvent.keyDown(document, { key: 'Enter' })
    expect(getByTestId('key-list').textContent).toBe('')
  })
})

describe('Integration: TestGame component using useKeyboard', () => {
  function TestGame() {
    const [lastKey, setLastKey] = useState<string>('')
    useKeyboard((key: string) => setLastKey(key))
    return <div data-testid="last-key">{lastKey}</div>
  }

  it('updates the game component with the last key pressed', () => {
    const { getByTestId } = render(<TestGame />)
    fireEvent.keyDown(document, { key: 'x' })
    expect(getByTestId('last-key').textContent).toBe('X')
    fireEvent.keyDown(document, { key: 'Enter' })
    expect(getByTestId('last-key').textContent).toBe('ENTER')
  })
})
