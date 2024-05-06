import client from "@/config/apollo";
import OrderState from "@/context/Order/OrderState";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider
      client={client}
    >
      <OrderState>
        <Component {...pageProps} />
      </OrderState>
    </ApolloProvider>
  );
}
