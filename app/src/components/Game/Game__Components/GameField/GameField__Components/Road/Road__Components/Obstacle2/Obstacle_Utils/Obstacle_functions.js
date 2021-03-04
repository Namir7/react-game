export function determineIsObstaclePassedGameField(size, position) {
  return size.heightInM + position.bottomInM <= 0;
}

export function createStyleObjectWithSizeAndPositionForObstacle(
  width,
  height,
  left,
  bottom,
  MScale
) {
  let style = {
    width: `${parseFloat(width) * MScale.scaleValue}${MScale.scaleUnit}`,
    height: `${parseFloat(height) * MScale.scaleValue}${MScale.scaleUnit}`,
    left: `${parseFloat(left) * MScale.scaleValue}${MScale.scaleUnit}`,
    bottom: `${parseFloat(bottom) * MScale.scaleValue}${MScale.scaleUnit}`,
  };

  return style;
}

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
