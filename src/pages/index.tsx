import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
        <Link href="/app/sign-in">Sign In</Link>
      </button>
      <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
        <Link href="/app/sign-up">Sign Up</Link>
      </button>
    </div>
  )
}
