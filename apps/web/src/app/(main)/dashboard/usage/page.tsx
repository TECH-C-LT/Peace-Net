import { Metadata } from 'next'
import { Suspense } from 'react'
import { MainTitle } from '~/app/(main)/components/text'
import UsageLogChart from './components/usage-log-chart'
import PlanRequestChart from './components/plan-request-chart'

export const metadata: Metadata = {
  title: 'Usage',
}

export default async function Usage() {
  return (
    <section>
      <MainTitle>Usage</MainTitle>
      <Suspense fallback={<div>Loading...</div>}>
        <UsageLogChart />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <PlanRequestChart />
      </Suspense>
    </section>
  )
}
