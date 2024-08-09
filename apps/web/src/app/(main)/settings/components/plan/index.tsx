import { getUserPlan } from '../../data'
import UpgradeButton from './upgrade-button'

export default async function Plan() {
  const plan = await getUserPlan()

  return (
    <div className="flex flex-wrap gap-3">
      <div className="p-4">
        <span className="text-muted-foreground text-sm">現在のプラン</span>
        <p className="text-4xl font-bold">{plan?.plans?.name}</p>
        <p className="text-muted-foreground mt-3 text-sm">
          <span className="text-nowrap text-xs">使用回数上限</span>
          <br />
          {plan?.plans?.total_request_limit}
          <span className="ml-0.5 text-xs">回</span>
        </p>
      </div>
      {plan?.plans?.name === 'FREE' && (
        <div className="rounded-md border p-4">
          <p className="text-sm">
            このプランは、使用量によって制限されます。
            <br />
            このプランは、その含まれている使用量のクォータを超えると、APIが応答しなくなることがあります。
            使用量を超過する場合は、有料プランにアップグレードしてください。
          </p>
          <div className="mb-4 mt-10 flex justify-center">
            <UpgradeButton />
          </div>
        </div>
      )}
    </div>
  )
}
