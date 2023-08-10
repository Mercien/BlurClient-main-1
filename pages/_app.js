import Head from "next/head";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import { NFTProvider } from "../context/NFTcontext";
import "../styles/globals.css";
import { Navbar, Footer } from "../components";
import Provider from "./provider";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../ProtoMonoFont/Proto Mono Light.ttf",
});

const App = ({ Component, pageProps }) => (
  <Provider>
    <NFTProvider>
      <ThemeProvider attribute="class">
        <div
          style={{
            backgroundImage: "url('/blurBackground.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="dark:bg-nft-dark"
        >
          <Head>
            <title>Blur</title>
            <meta
              name="description"
              content="Market NFT where you can buy and sell new NFTs."
            />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <NextNProgress
            color="#EB1484"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow
            options={{ showSpinner: false }}
          />
          <Navbar />
          <div style={myFont.style} className="pt-65">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </NFTProvider>
  </Provider>
);

export default App;
