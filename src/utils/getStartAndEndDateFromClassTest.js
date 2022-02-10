export default function getStartAndEndDateFromClassTest(exam) {
  
  let startDate = null;
  let endDate = null;
  if (exam?.classTest) {
    startDate = new Date(exam.classTest.startDate);
    startDate.setHours(
      exam.classTest.startTime.split(":")[0],
      exam.classTest.startTime.split(":")[1]
    );
    endDate = new Date(exam.classTest.endDate);
    endDate.setHours(
      exam.classTest.endTime.split(":")[0],
      exam.classTest.endTime.split(":")[1]
    );
  }
  return {startDate, endDate}
}