import { RootState } from "@/globalStates/_prototype";
import { useAuthEmailVerification } from "@/hooks/query/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { shallowEqual, useSelector } from "react-redux";

export default function EmailVerification() {
  const router = useRouter();
  const { mutate: doAuthEmailVerification } = useAuthEmailVerification()
  const { authData } = useSelector(
    (state: RootState) => ({
      authData: state.auth.auth,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionID = query.get('session_id')
    const sessionToken = query.get('session_token')
    if (sessionID && sessionToken) {
      doAuthEmailVerification({
        session_id: sessionID,
        session_token: sessionToken
      }, {
        onSuccess: () => {
          if (!authData) {
            return router.replace('/')
          }
          router.replace('/app?message=Email verified successfully')
        },
        onError: (error) => {
          if (!authData) {
            return router.replace('/')
          }
          router.replace('/app?error=Email verification failed')
        }
      })
    }
  }, [authData, doAuthEmailVerification, router])

  return (
    <p>Loading</p>
  )
}

EmailVerification.UseClientSideLayout = true
