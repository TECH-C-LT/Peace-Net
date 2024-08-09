import { getUserPlan } from '~/app/(main)/dashboard/usage/data'
import { CircularProgressBar } from './circular-progress'

export default async function PlanRequestChart() {
  const plan = await getUserPlan()

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <h3 className="font-semibold">合計使用回数</h3>
      <CircularProgressBar
        max={plan?.plans?.total_request_limit || 30}
        value={plan?.total_requests_used || 0}
      />
    </div>
  )
}
