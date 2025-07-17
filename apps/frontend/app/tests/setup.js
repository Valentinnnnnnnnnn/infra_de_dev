import '@testing-library/jest-dom'
// Mock de localStorage (car jsdom ne l'a pas par défaut)
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})
// Nettoyer les mocks avant chaque test
beforeEach(() => {
  vi.clearAllMocks()
})
