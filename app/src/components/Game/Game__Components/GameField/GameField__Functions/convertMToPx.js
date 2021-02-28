export function convertMToPx(valueInM) {
  // TODO
  // if (new RegExp(`\dM`).test(valueInM))
  //   return new Error(`argument is not value in M`);

  const scaleValue = 50;
  const scaleUnit = "px";
  return `${parseFloat(valueInM) * scaleValue}${scaleUnit}`;
}
