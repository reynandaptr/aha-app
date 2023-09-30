import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { persistor, store } from "@/globalStates/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { DynamicLayout } from '@/layouts/DynamicLayout';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

type ComponentAppWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    UseClientSideLayout?: boolean
  }
}

export default function App({ Component, pageProps, router }: ComponentAppWithPageLayout) {
  return (
    <>
      {
        Component.UseClientSideLayout ? (
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <Toaster />
                <DynamicLayout Component={Component} pageProps={pageProps} router={router} />
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        ) : (
          <>
            <Navbar />
            <main>
              <Component {...pageProps} key={router.route} />
            </main>
            <Footer />
          </>
        )
      }
    </>
  )
}
