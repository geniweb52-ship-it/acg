import ServiceDetailTemplate from './ServiceDetailTemplate'
import { services, projects } from '../../utils/data'

export default function ServiceLogistique() {
  const service = services.find((s) => s.slug === 'logistique')!
  const related = projects.filter((p) => p.sector === 'logistique')
  return <ServiceDetailTemplate service={service} relatedProjects={related} />
}
