import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TripFormDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: TripFormData) => void;
  initialData?: TripFormData;
  mode?: "create" | "edit";
}

interface TripFormData {
  destination: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  status: "planned" | "in-progress";
}

const TripFormDialog = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
  initialData = {
    destination: "",
    dateRange: {
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    status: "planned" as const,
  },
  mode = "create",
}: TripFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Trip" : "Edit Trip"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new trip to your dashboard"
              : "Update your trip details"}
          </DialogDescription>
        </DialogHeader>

        <Form>
          <div className="grid gap-4 py-4">
            <FormField
              name="destination"
              defaultValue={initialData.destination}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter destination" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the main destination of your trip
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="dateRange"
              defaultValue={initialData.dateRange}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Range</FormLabel>
                  <DatePickerWithRange {...field} />
                  <FormDescription>
                    Select the start and end dates of your trip
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="status"
              defaultValue={initialData.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trip Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trip status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Current status of your trip</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                onSubmit(initialData);
              }}
            >
              {mode === "create" ? "Create Trip" : "Save Changes"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TripFormDialog;
