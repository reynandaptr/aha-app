import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/">Home</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/app">App</Link>
    </>
  )
}
