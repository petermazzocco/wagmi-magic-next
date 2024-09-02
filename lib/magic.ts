import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth2";

const createMagic = (key: string) => {
  return (
    typeof window !== "undefined" &&
    new Magic(key, {
      extensions: [new OAuthExtension()],
    })
  );
};

export const magic = createMagic(
  process.env.NEXT_PUBLIC_MAGIC_API_KEY as string
);
