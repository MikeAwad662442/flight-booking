/*******************************
 * @author: Mike Awad
 * @description: Submit Contact Us as Feedback to Database
 * ============================
 * [X] Send Feedback to Database
 * [X] Show Feedback From Database
 *******************************/

"use server";
import { prisma } from "@/lib/prisma";
import { ContactEmailSchema } from "@/lib/Schema/ContactUsSchema";

/*******************************
 * ============================
 * = Get Feedback | Full info
 * ============================
 *******************************/

const ShowFeedback = async () => {
  try {
    const Show = await prisma.feedback.findMany();
    return {
      Show,
      result: true,
    };
  } catch (error) {
    return {
      issues: `the issues : ${error}`,
      message: "there are no Feedback sent to us",
      result: false,
    };
  }
};
/*******************************
 * ============================
 * = Get Feedback | Full info
 * ============================
 * = Send Feedback
 *******************************/
const onSubmitAction = async (data: FormData) => {
  const formData = Object.fromEntries(data);
  const CreateForm = ContactEmailSchema.safeParse(formData);
  // === Check if all input submitted is correct === //
  if (!CreateForm.success) {
    // Handle validation errors for creating a form
    return {
      message: "Invalid form data ",
      issues: CreateForm.error.issues.map((issue) => issue.message),
    };
  }
  const { FullName, Email, Subject, Message } = CreateForm.data;
  await prisma.feedback.create({
    data: {
      fullName: FullName,
      email: Email,
      subject: Subject,
      message: Message,
    },
  });
  console.log(formData);
  return {
    result: true,
    message: "Your message successfully",
  };
};

export { ShowFeedback, onSubmitAction };
