export const differenceBetweenDates = (
  dateOne: any,
  dateTwo: any,
  format: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days',
): number => {
  dateOne = new Date(dateOne);
  dateTwo = new Date(dateTwo);

  const diferencaEmMilissegundos = dateOne - dateTwo;
  if (format === 'milliseconds') return diferencaEmMilissegundos;

  const diferencaEmSegundos = Math.floor(diferencaEmMilissegundos / 1000);
  if (format === 'seconds') return diferencaEmSegundos;

  const diferencaEmMinutos = Math.floor(diferencaEmSegundos / 60);
  if (format === 'minutes') return diferencaEmMinutos;

  const diferencaEmHoras = Math.floor(diferencaEmMinutos / 60);
  if (format === 'hours') return diferencaEmHoras;

  if (format === 'days') return Math.floor(diferencaEmHoras / 24);
};
