export function createStyle(size, position, MScale) {
  let style = {};

  if (size) {
    style.width = `${size.widthInM * MScale.scaleValue}${MScale.scaleUnit}`;
    style.height = `${size.heightInM * MScale.scaleValue}${MScale.scaleUnit}`;
  }

  if (position) {
    style.left = `${position.leftInM * MScale.scaleValue}${MScale.scaleUnit}`;
    style.bottom = `${position.bottomInM * MScale.scaleValue}${
      MScale.scaleUnit
    }`;
  }

  return style;
}
