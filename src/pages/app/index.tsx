import { getApiURL } from "@/constants";
import { setAuthData } from "@/globalStates/auth";
import { useAuthLogout } from "@/hooks/query/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { refetch: doAuthLogOut } = useAuthLogout({
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  }, {
    onSuccess: () => {
      router.replace('/')
      dispatch(setAuthData(undefined))
    },
    onError: () => {
      router.replace('/')
      dispatch(setAuthData(undefined))
    }
  })
  return (
    <>
      <a onClick={() => doAuthLogOut()} className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4">
        LogOut
      </a>
    </>
  )
}

App.UseClientSideLayout = true
