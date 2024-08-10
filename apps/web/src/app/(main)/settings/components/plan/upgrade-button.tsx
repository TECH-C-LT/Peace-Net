import ShimmerButton from '@peace-net/ui/components/magicui/shimmer-button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@peace-net/ui/components/ui/alert-dialog'

export default function UpgradeButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <ShimmerButton className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg dark:from-white dark:to-slate-900/10">
            有料プランにアップグレード
          </span>
        </ShimmerButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>有料プランにアップグレード</AlertDialogTitle>
          <AlertDialogDescription>
            有料プランはまだ利用できません。🙇
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>また今度</AlertDialogCancel>
          <AlertDialogAction>アップグレード</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
