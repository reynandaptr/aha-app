import { setAuthData } from "@/globalStates/auth";
import { useAuthResendEmailVerification, useAuthValidateToken } from "@/hooks/query/auth";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Loading } from "./Loading";
import { RootState } from "@/globalStates/_prototype";
import { DashboardNavbar } from "./DashboardNavbar";
import { DashboardFooter } from "./DashboardFooter";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

export default function ProtectedPage({ children }: { children: JSX.Element }) {
  const router = useRouter()
  const dispatch = useDispatch();
  const { authData } = useSelector(
    (state: RootState) => ({
      authData: state.auth.auth,
    }),
    shallowEqual,
  );

  const { isLoading: isLoadingValidateToken } = useAuthValidateToken({
    retry: false,
    refetchOnWindowFocus: false,
  }, {
    onSuccess(data) {
      dispatch(setAuthData(data.data.data))
    },
    onError() {
      dispatch(setAuthData(undefined));
    }
  });

  const { mutate: doAuthResendEmailVerification } = useAuthResendEmailVerification()
  const resendEmailVerification = () => {
    doAuthResendEmailVerification({}, {
      onSuccess() {
        toast.success('Email verification sent!')
      },
      onError(error) {
        toast.error(error.response?.data.message || error.message)
      }
    })
  }

  if (!authData) router.replace('/app/sign-in')
  if (!authData || isLoadingValidateToken) return (<Loading />);

  return (
    <>
      <DashboardNavbar />
      {authData.is_verified ? children : (
        <div>
          <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <Button onClick={() => resendEmailVerification()}>Re-send email verification</Button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
