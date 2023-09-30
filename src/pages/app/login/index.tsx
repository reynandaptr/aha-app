import { getApiURL } from "@/constants";
import { setLoginMode } from "@/globalStates/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';

export default function Login() {
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('error')) {
      toast.error(query.get('error'))
    }
  }, [])

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-50">
          TheWatcher
        </a>
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="flex flex-col justify-center items-center">
            <a href={`${getApiURL()}/v1/auth/login/google`} onClick={() => dispatch(setLoginMode('GOOGLE'))} className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-4">
              <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              Continue with Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Login.UseClientSideLayout = true
