import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@peace-net/ui/components/ui/card'
import { Metadata } from 'next'
import Plan from './components/plan'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function Settings() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Plan />
        </CardContent>
      </Card>
    </section>
  )
}
