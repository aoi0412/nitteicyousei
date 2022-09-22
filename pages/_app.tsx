import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Box marginTop="68px">
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
