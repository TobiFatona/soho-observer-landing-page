import SectionLabel from '@/components/ui/SectionLabel'
import StyleCard from '@/components/ui/StyleCard'
import FadeInView from '@/components/motion/FadeInView'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { styleCategories } from '@/constants/styleCategories'

export default function StyleShowcase() {
  const main = styleCategories.find((c) => c.size === 'main')
  const sides = styleCategories.filter((c) => c.size === 'side')

  return (
    <section className="py-section px-[8vw] bg-parchment">
      <FadeInView className="mb-14">
        <SectionLabel>Style Categories</SectionLabel>
      </FadeInView>

      <StaggerGroup>
        {/* Desktop asymmetric grid */}
        <div className="hidden lg:grid gap-4" style={{ gridTemplateColumns: '2fr 1fr' }}>
          <StaggerItem>
            <StyleCard
              name={main.name}
              description={main.description}
              gradient={main.gradient}
              tall
            />
          </StaggerItem>

          <div className="flex flex-col gap-4">
            {sides.map((cat, i) => (
              <StaggerItem key={cat.name}>
                <StyleCard
                  name={cat.name}
                  description={cat.description}
                  gradient={cat.gradient}
                  className={i === 1 ? 'mt-5' : ''}
                />
              </StaggerItem>
            ))}
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="lg:hidden flex flex-col gap-4">
          {styleCategories.map((cat) => (
            <StaggerItem key={cat.name}>
              <StyleCard
                name={cat.name}
                description={cat.description}
                gradient={cat.gradient}
              />
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>
    </section>
  )
}
