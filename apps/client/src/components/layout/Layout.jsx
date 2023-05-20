import favIcon from "@assets/images/fav.png";
import Header from "@sections/Header/v1";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        {/* meta tag*/}
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <link rel="shortcut icon" type="image/x-icon" href={favIcon.src} />
        {/* responsive tag */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Head>
      <main>
        <Header />
        {children}
      </main>
    </>
  );
};

export default Layout;
