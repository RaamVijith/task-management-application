"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar1 } from "iconsax-react";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function CalendarForm({
  onDateSelect,
}: {
  onDateSelect: (date: string) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    
  });

  return (
    <Form {...form} >
      <FormField
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem className="flex flex-col z-50">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <div className="h-9 w-9 rounded-full cursor-pointer border-dashed border-[1px] border-[#C8C8C8] flex items-center justify-center">
                    <Calendar1 size="20" color="#727272" />
                  </div>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date); // Update the form state
                    if (date) {
                      const formattedDate = format(date, "MM-dd");
                      onDateSelect(formattedDate); // Update parent
                    }
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
