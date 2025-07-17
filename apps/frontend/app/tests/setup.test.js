import { describe, test, expect } from 'vitest'
describe('Configuration des tests', () => {
  test('Vitest fonctionne correctement', () => {
    expect(true).toBe(true)
  })
  test('Jest-DOM matchers sont disponibles', () => {
    const element = document.createElement('div')
    element.textContent = 'Hello World'
    document.body.appendChild(element)
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('Hello World')
  })
  test('localStorage mock fonctionne', () => {
    localStorage.setItem('test', 'value')
    expect(localStorage.setItem).toHaveBeenCalledWith('test', 'value')
  })
})
