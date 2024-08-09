import { getUsageLogs } from '~/app/(main)/dashboard/usage/data'
import Chart from './chart'

export default async function UsageLogChart() {
  const graphData = await getUsageLogs()

  if (!graphData) {
    return null
  }

  return (
    <div>
      <Chart data={graphData} />
    </div>
  )
}
