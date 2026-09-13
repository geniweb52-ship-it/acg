import ServiceDetailTemplate from './ServiceDetailTemplate'
import { services, projects } from '../../utils/data'

export default function ServiceCommunication() {
  const service = services.find((s) => s.slug === 'communication')!
  const related = projects.filter((p) => p.sector === 'communication')
  return <ServiceDetailTemplate service={service} relatedProjects={related} />
}
