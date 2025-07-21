// src/hooks/useStatusSounds.ts
import { useEffect, useRef, useState } from 'react'
import type { LetterStatus } from '../types/game'

export const useStatusSounds = () => {
  const soundsRef = useRef<Record<LetterStatus, HTMLAudioElement>>({} as any)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    soundsRef.current = {
      correct: new Audio('/assets/correct.wav'),
      present: new Audio('/assets/present.wav'),
      absent: new Audio('/assets/absent.wav'),
      unused: new Audio('./assets/touche.mp3'),
    }

    const entries = Object.values(soundsRef.current)
    Promise.all(
      entries.map((audio) => {
        audio.preload = 'auto'
        return new Promise<void>((res) => {
          audio.addEventListener('canplaythrough', () => res(), { once: true })
          setTimeout(res, 3000)
        })
      })
    ).then(() => setIsLoaded(true))
  }, [])

  const playStatusSound = (status: LetterStatus) => {
    if (!isLoaded) return
    const audio = soundsRef.current[status]
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  return { playStatusSound, isLoaded }
}
