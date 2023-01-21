import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-y-4">
      <Link href="/with-xstate">With XState</Link>
      <Link href="/without-xstate">Without XState</Link>
    </div>
  )
}
