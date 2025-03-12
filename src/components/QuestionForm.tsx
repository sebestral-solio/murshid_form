import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import FormAlert from "./FormAlert";

const formSchema = z.object({
  questionText: z.string().min(1, { message: "Question text is required" }),
  questionType: z.enum(["General", "Technical", "Creative"], {
    required_error: "Please select a question type",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface QuestionFormProps {
  webhookUrl?: string;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  webhookUrl = "https://n8n.republicofengineers.com/webhook-test/recv_words", // Default webhook URL
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: "",
      questionType: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setAlertInfo({
        visible: true,
        type: "success",
        title: "Submission Successful",
        message: "Your question has been submitted successfully.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertInfo({
        visible: true,
        type: "error",
        title: "Submission Failed",
        message:
          "There was an error submitting your question. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAlert = () => {
    setAlertInfo({ ...alertInfo, visible: false });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Submit Your Question
      </h2>

      <FormAlert
        type={alertInfo.type}
        title={alertInfo.title}
        message={alertInfo.message}
        visible={alertInfo.visible}
        onClose={closeAlert}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="questionText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Question</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your question in any language..."
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can write your question in any language.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="questionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a question type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the category that best fits your question.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Question"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuestionForm;
