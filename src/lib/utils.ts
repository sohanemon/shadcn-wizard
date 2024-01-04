export function camelToKebab(camelCase: string): string {
  const kebabCase = camelCase
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
  return kebabCase;
}

export function camelToNormal(camelCase: string): string {
  const normalCase = camelCase.replace(/([a-z])([A-Z])/g, '$1 $2');
  const capitalized = normalCase.charAt(0).toUpperCase() + normalCase.slice(1);
  return capitalized;
}
