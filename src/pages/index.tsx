import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <Button variant={'default'}>
        <Link href="/app/sign-in">Sign In</Link>
      </Button>
      <Button variant={'default'}>
        <Link href="/app/sign-up">Sign Up</Link>
      </Button>
    </div>
  )
}
