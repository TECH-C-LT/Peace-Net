import { getUserPlan } from '~/app/(main)/dashboard/usage/data'

export default async function PlanRequestChart() {
  const plan = await getUserPlan()

  return (
    <div>
      <h3>Plan Request</h3>
      <div className="">{JSON.stringify(plan)}</div>
    </div>
  )
}
