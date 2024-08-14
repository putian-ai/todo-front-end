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

export function DateTimePickerForm({ onSubmit }: { onSubmit: (date: Date) => void }) { // Added onSubmit prop
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  function handleFormSubmit(data: FormSchemaType) { // Renamed to handleFormSubmit
    onSubmit(data.dateTime); // Call the provided onSubmit function
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
        <div>
          <Button type="submit" >Submit</Button>
          <Button type="submit">Cancel</Button>
        </div>
      </form>
    </Form>
  );
}