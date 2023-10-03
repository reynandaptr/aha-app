import { getApiURL } from "@/constants";
import { setAuthData } from "@/globalStates/auth";
import { useAuthLogout } from "@/hooks/query/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
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

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('message')) {
      toast.success(query.get('message'))
    } else if (query.get('error')) {
      toast.error(query.get('error'))
    }
  }, [])
  return (
    <>
      <p>Dashboard</p>
    </>
  )
}

App.UseClientSideLayout = true
