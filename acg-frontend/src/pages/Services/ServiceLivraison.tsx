import ServiceDetailTemplate from './ServiceDetailTemplate'
import { services, projects } from '../../utils/data'

export default function ServiceLivraison() {
  const service = services.find((s) => s.slug === 'livraison')!
  const related = projects.filter((p) => p.sector === 'livraison')
  return <ServiceDetailTemplate service={service} relatedProjects={related} />
}
