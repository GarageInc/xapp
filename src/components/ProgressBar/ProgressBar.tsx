import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ThemeColors } from 'theme/styled'

const Container = styled.div`
  height: 3px;
  width: 100%;
  background-color: ${({ theme }) => theme.dark15};
  border-radius: 50px;
`

const Filler = styled.div<{ completed: number; color?: ThemeColors }>`
  height: 100%;
  width: ${({ completed }) => completed}%;
  background-color: ${({ theme, color = 'darkOrange' }) => theme[color]}};
  border-radius: inherit;
  transition: width 1s ease-in-out;
`

export const ProgressBar = ({ completed: isCompleted, color }: { completed?: boolean; color?: ThemeColors }) => {
  const [status, setStatus] = useState(isCompleted ? 100 : 0)

  useEffect(() => {
    setInterval(
      () =>
        setStatus((prev) => {
          if (prev >= 100) {
            return prev
          }
          const value = Math.floor(Math.random() * 100) + 1

          return value > prev ? value : prev
        }),
      2000
    )
  }, [])

  useEffect(() => {
    if (isCompleted) {
      setStatus(100)
    }
  }, [isCompleted])

  return (
    <Container>
      <Filler completed={status} color={color} />
    </Container>
  )
}
