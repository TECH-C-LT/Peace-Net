import { Metadata } from 'next'
import { Suspense } from 'react'
import UsageLogChart from './components/usage-log-chart'
import PlanRequestChart from './components/plan-request-chart'
import { Skeleton } from '@peace-net/ui/components/ui/skeleton'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@peace-net/ui/components/ui/card'

export const metadata: Metadata = {
  title: 'Usage',
}

export default async function Usage() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>使用状況を確認できます。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row-reverse flex-wrap justify-center overflow-hidden rounded-lg border p-4">
            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-center gap-4 p-6">
                  <h3 className="font-semibold">合計使用回数</h3>
                  <Skeleton className="h-[144px] w-[144px] rounded-full" />
                </div>
              }
            >
              <PlanRequestChart />
            </Suspense>
            <Suspense
              fallback={<Skeleton className="h-[300px] w-[550px] rounded-md" />}
            >
              <UsageLogChart />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
