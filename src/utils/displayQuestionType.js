export const displayQuestionType = (key) => {
  switch (key?.toString()) {
    case "1":
      return "Multiple Choice"
    case "2":
      return "True or False"
    case "3":
      return "Identification"
    case "4":
      return "Essay"
    case "5":
      return "Enumeration"
    default:
      return "Invalid question type"
  }
};
