const FRAMER = "https://framerusercontent.com/images/";

export function img(id: string): string {
  return `${FRAMER}${id}.png`;
}

export function icon(id: string): string {
  return `${FRAMER}${id}.svg`;
}

export const CALL_CREW = `${import.meta.env.BASE_URL}images/nacew_crew.png`;
export const FOUNDER_COVER = `${import.meta.env.BASE_URL}images/nacew_crew2.png`;
export const CLIRIM_SIGNATURE = `${import.meta.env.BASE_URL}images/clirim-signature.svg`;
