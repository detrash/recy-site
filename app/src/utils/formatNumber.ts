export function formatNumber(number: number) {
  return new Intl.NumberFormat('pt-BR').format(number);
}
