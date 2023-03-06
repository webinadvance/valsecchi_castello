import { animated, useInView } from '@react-spring/web'
import { type ReactNode, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'

export interface AnimatedSectionProps {
  children: ReactNode
}

export const AnimatedSection = ({ children }: AnimatedSectionProps) => {
  const [ref, inView] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: 100
			},
      to: {
        opacity: 1,
        y: 0
			},
      once: true,
      threshold: 0.2
		})
  )

  const isMobile = useMediaQuery('(max-width:1024px)')

	useEffect(() => {
    if (inView) {
      console.log('In view!')
		}
  }, [inView])

	if (isMobile) {
    return <>{children}</>
	}

  return (
		<animated.section ref={ref} style={inView}>
			{children}
		</animated.section>
  );
}
