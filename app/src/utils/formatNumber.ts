export function formatNumber(number: number, locale: string | undefined) {
  const currentFormat = locale === 'en' ? 'en-US' : 'pt-BR';

  return new Intl.NumberFormat(currentFormat).format(number);
}
