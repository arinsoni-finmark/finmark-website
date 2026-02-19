import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

export default function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <span ref={ref}>
      {inView ? (
        <CountUp
          start={0}
          end={value}
          duration={2.5}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          decimal="."
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  )
}
