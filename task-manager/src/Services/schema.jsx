import * as Yup from "yup";

export const TaskSchema = Yup.object({
  title: Yup.string().min(2).max(30).required("Please enter title."),
  description: Yup.string()
    .min(3)
    .max(100)
    .required("Please enter description."),
  start_date: Yup.date().required("Please choose a valid date."),
  end_date: Yup.date()
    .required("Please choose a valid date.")
    .min(Yup.ref("start_date"), "End date cannot be earlier than start date."),
  status: Yup.string()
    .required("Please select a valid status")
    .notOneOf(
      [""],
      "Please select a valid status"
    ),
  priority: Yup.string()
    .required("Please select a valid Priority")
    .notOneOf([""], "Please select a valid Priority"),
});
