import { getUsageLogs } from '~/app/(main)/dashboard/usage/data'

export default async function UsageLogChart() {
  const usageLogs = await getUsageLogs()

  return (
    <div>
      <h3>Spend</h3>
      <div className="">{JSON.stringify(usageLogs)}</div>
    </div>
  )
}
