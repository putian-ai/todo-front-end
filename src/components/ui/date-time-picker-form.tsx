import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "./time-picker-demo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  dateTime: z.date(),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface DateTimePickerFormProps {
  onSubmit: (date: Date) => void;
  initialDateTime?: Date | null; // Add this prop for the initial date
}

export function DateTimePickerForm({ onSubmit, initialDateTime }: DateTimePickerFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { // Set the default value here
      dateTime: initialDateTime || new Date(),
    },
  });

  function handleFormSubmit(data: FormSchemaType) {
    onSubmit(data.dateTime);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }


  return (
    <Form {...form}>
      <form
        className="flex-col items-end gap-4 justify-center"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <FormField
          control={form.control}
          name="dateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
                <div className="p-3 border-t border-border">
                  <TimePickerDemo
                    setDate={field.onChange}
                    date={field.value}
                  />
                </div>
              </Popover>
            </FormItem>
          )}
        />
        <div className="flex justify-between mx-4 mb-4">
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="outline" >Cancel</Button>
        </div>
      </form>
    </Form>
  );
}