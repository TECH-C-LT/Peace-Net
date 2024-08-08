import Image from 'next/image'

export default function Loading() {
  return (
    <section className="flex h-dvh w-full flex-col items-center justify-center gap-3">
      <Image src="/peace-net.webp" alt="Loading..." width={100} height={100} />
      <p>ロード中です...</p>
    </section>
  )
}
