// pages/_app.js
import PeerConnection from "@/components/PeerConnection";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PeerConnection />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
