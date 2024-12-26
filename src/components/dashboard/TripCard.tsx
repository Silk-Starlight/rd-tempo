import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2 } from "lucide-react";

interface TripCardProps {
  destination: string;
  startDate: string;
  endDate: string;
  status: "planned" | "in-progress";
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

const TripCard = ({
  destination = "Paris, France",
  startDate = "2024-06-01",
  endDate = "2024-06-07",
  status = "planned",
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
}: TripCardProps) => {
  return (
    <Card className="w-[350px] h-[280px] bg-white hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{destination}</CardTitle>
          <Badge
            variant={status === "planned" ? "secondary" : "default"}
            className="capitalize"
          >
            {status}
          </Badge>
        </div>
        <CardDescription>
          {new Date(startDate).toLocaleDateString()} -{" "}
          {new Date(endDate).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${destination}`}
          alt={destination}
          className="w-full h-32 object-cover rounded-md"
        />
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Trip</DialogTitle>
              <DialogDescription>
                Edit your trip details here.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onEdit}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Trip</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this trip? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button variant="default" size="icon" onClick={onView}>
          <Eye className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TripCard;
