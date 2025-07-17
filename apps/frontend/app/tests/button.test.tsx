import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../components/ui/Button'

describe('Button component', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600')
    expect(button).toHaveClass('px-4', 'py-2', 'text-base')
  })

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button', { name: /secondary/i })
    expect(button).toHaveClass('bg-gray-600')
  })

  it('renders danger variant', () => {
    render(<Button variant="danger">Danger</Button>)
    const button = screen.getByRole('button', { name: /danger/i })
    expect(button).toHaveClass('bg-red-600')
  })

  it('applies size classes for sm, md, and lg', () => {
    // Small button
    render(<Button size="sm">Small</Button>)
    let button = screen.getByRole('button', { name: /small/i })
    expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm')
    cleanup()

    // Medium button
    render(<Button size="md">Medium</Button>)
    button = screen.getByRole('button', { name: /medium/i })
    expect(button).toHaveClass('px-4', 'py-2', 'text-base')
    cleanup()

    // Large button
    render(<Button size="lg">Large</Button>)
    button = screen.getByRole('button', { name: /large/i })
    expect(button).toHaveClass('px-6', 'py-3', 'text-lg')
  })

  it('calls onClick handler when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    const button = screen.getByRole('button', { name: /click/i })
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
