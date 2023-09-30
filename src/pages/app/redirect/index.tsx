import { RootState } from "@/globalStates/_prototype";
import { useAuthRedirect } from "@/hooks/query/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

export default function Redirect() {
  const router = useRouter()
  const { loginProvider } = useSelector(
    (state: RootState) => ({
      loginProvider: state.auth.loginProvider,
    }),
    shallowEqual,
  );

  const { refetch: doAuthRedirect } = useAuthRedirect(loginProvider || '', window.location.search, {
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  }, {
    onSuccess() {
      router.push('/app')
    },
    onError(error) {
      const query = new URLSearchParams()
      query.append('error', error.response?.data.message || error.message)
      router.push(`/app/login?${query.toString()}`)
    }
  });

  useEffect(() => {
    if (loginProvider && window.location.search) {
      doAuthRedirect()
    }
  }, [doAuthRedirect, loginProvider])

  return (
    <p>Redirecting...</p>
  )
};

Redirect.UseClientSideLayout = true
