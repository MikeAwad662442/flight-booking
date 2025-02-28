/*******************************
 * @author: Mike Awad
 * @description: Submit Form Massage
 * ============================
 * [X] Send a new Massage to DB
 * Use react-hook-form & zod
 * Form - Dialog - Button - Avatar - Input shadcn/UI
 *******************************/
"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactEmailSchema,
  ContactEmailSchemaType,
} from "@/lib/Schema/ContactUsSchema";

import { useTranslations } from "next-intl";
// ===================== //
// ===== shadcn/UI ===== //
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
// ===== shadcn/UI ===== //
// ===================== //

import { onSubmitAction } from "@/app/api/contact-us/route";
// ===================== //
// == React Hook Form == //

const FormContactUs = () => {
  const FormT = useTranslations("ContactUs.Form");
  const FormInfo = useForm<ContactEmailSchemaType>({
    resolver: zodResolver(ContactEmailSchema),
    defaultValues: {
      FullName: "",
      Email: "",
      Subject: "",
      Message: "",
    },
    mode: "all",
  });
  // ===================== //
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = FormInfo;
  // == React Hook Form == //
  // ===================== //
  // === Send Data To server === //
  const onSubmit: SubmitHandler<ContactEmailSchemaType> = async (values) => {
    const formData = new FormData();
    formData.append("FullName", values.FullName);
    formData.append("Email", values.Email);
    formData.append("Subject", values.Subject);
    formData.append("Message", values.Message);

    const { message, result, issues } = await onSubmitAction(formData);
    if (result === true) {
      setTimeout(() => {
        toast.success(message);
        window.location.reload();
      }, 2000);
    }
    toast.error(message, {
      description: issues,
    });
    // console.log("onSubmit", formData);
  };

  return (
    <Form {...FormInfo}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-start gap-8"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* FullName: String inputType Text*/}
          <FormField
            control={control}
            name="FullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{FormT("FullName")}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email: String inputType Text*/}
          <FormField
            control={control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{FormT("Email")}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Subject: String inputType Text*/}
          <FormField
            control={control}
            name="Subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{FormT("Subject")}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Message: String inputType Text*/}
          <FormField
            control={control}
            name="Message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{FormT("Message")}</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default FormContactUs;
