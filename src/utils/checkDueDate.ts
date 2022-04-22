import { differenceInDays } from "date-fns";

const checkDueDate = (date: string) => {
  const getDate = new Date(date);
  const difference = differenceInDays(getDate, Date.now());

  return difference > 0 ? `Due in ${difference} Days` : "Date is Over";
};

export default checkDueDate;
