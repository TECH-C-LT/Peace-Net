import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-1">
      <Image src="/peace-net.webp" alt="peace-net" width={40} height={40} />
      <h1 className="text-lg font-bold">平和ネット</h1>
    </div>
  )
}
