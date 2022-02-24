export const getDifferenceOfTwoDatesInSeconds = (startDate, endDate) => {
  if (startDate == null || endDate == null) {
    return 0
  }
  const difference = startDate.getTime() - endDate.getTime();
  return difference / 1000;
}
