import { Container } from '@mantine/core'
import StatCard from '../../../components/cards/StatCard'
import { stats } from '../../../utils/data'

export default function StatsSection() {
  return (
    <section
      style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #0B1F3A 0%, #132F52 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '40px solid rgba(212,167,44,0.06)',
          pointerEvents: 'none',
        }}
      />

      <Container size="xl">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
            gap: '40px',
            textAlign: 'center',
          }}
        >
          {stats.map((stat, i) => (
            <div key={i}>
              <StatCard value={stat.value} label={stat.label} delay={i * 0.15} light />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
