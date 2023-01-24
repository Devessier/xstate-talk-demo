import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-4">
      <Link href="/with-xstate">With XState</Link>
      <Link href="/without-xstate">Without XState</Link>
      <Link href="/with-nothing">With nothing</Link>
    </div>
  )
}
