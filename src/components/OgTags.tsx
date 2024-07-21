import Head from "expo-router/head";
import { expo } from "../../app.json";

export const OgTags = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  const fullTitle = title ? `${title} | ${expo.name}` : expo.name;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta property="og:title" content={fullTitle} />
      <meta
        name="description"
        content={
          description ??
          "Leia e escreva colas de músicas para tocar no carnaval de rua"
        }
      />
    </Head>
  );
};
