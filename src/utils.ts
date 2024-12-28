export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

export const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/[\s-]+/g, "-");
};

/**
 * Returns the extension like `.pdf`, `.jpg` from a url like https://example.com/file.pdf
 */
export const getExtensionFromUrl = (url: string): string | undefined => {
  try {
    const urlObj = new URL(url);
    const lastPath = urlObj.pathname.split("/").at(-1);
    if (lastPath?.includes(".")) {
      return `.${lastPath.split(".").at(-1)}`;
    }
  } catch {}
  return undefined;
};
