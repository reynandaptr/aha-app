import { setAuthData } from "@/globalStates/auth";
import { useAuthLogout } from "@/hooks/query/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {refetch: doAuthLogOut} = useAuthLogout({
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  }, {
    onSuccess: () => {
      router.push('/')
      dispatch(setAuthData(undefined))
    },
    onError: () => {
      router.push('/')
      dispatch(setAuthData(undefined))
    }
  })
  return (
    <>
      <div className="bg-yellow-400 h-screen" />
    </>
  )
}

App.UseClientSideLayout = true
