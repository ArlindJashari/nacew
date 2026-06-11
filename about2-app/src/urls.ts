/** Main marketing site (index.html at repo root), not this about app. */
export function homeUrl(): string {
  if (typeof window === "undefined") return "/";

  const { protocol, hostname, port, href } = window.location;
  const onStaticSite = port === "8000" || port === "";

  if (onStaticSite) {
    return new URL("../", href).href;
  }

  return `${protocol}//${hostname}:8000/`;
}
