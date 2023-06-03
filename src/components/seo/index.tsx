import Head from "next/head";
import { StaticImageData } from "next/image";

interface seo {
  title: string;
  description: string;
  icon?: StaticImageData;
}

const Seo = ({ title, description }: seo) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
};
export default Seo;
