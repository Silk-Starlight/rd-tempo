import React from "react";
import TripCard from "./TripCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "planned" | "in-progress";
}

interface TripGridProps {
  trips?: Trip[];
  onAddTrip?: () => void;
  onEditTrip?: (id: string) => void;
  onDeleteTrip?: (id: string) => void;
  onViewTrip?: (id: string) => void;
}

const TripGrid = ({
  trips = [
    {
      id: "1",
      destination: "Paris, France",
      startDate: "2024-06-01",
      endDate: "2024-06-07",
      status: "planned",
    },
    {
      id: "2",
      destination: "Tokyo, Japan",
      startDate: "2024-07-15",
      endDate: "2024-07-30",
      status: "in-progress",
    },
    {
      id: "3",
      destination: "New York, USA",
      startDate: "2024-08-10",
      endDate: "2024-08-15",
      status: "planned",
    },
  ],
  onAddTrip = () => {},
  onEditTrip = () => {},
  onDeleteTrip = () => {},
  onViewTrip = () => {},
}: TripGridProps) => {
  const [sortBy, setSortBy] = React.useState<"date" | "status">("date");

  const sortedTrips = React.useMemo(() => {
    return [...trips].sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      } else {
        return a.status.localeCompare(b.status);
      }
    });
  }, [trips, sortBy]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">My Trips</h2>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as "date" | "status")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="status">Sort by Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onAddTrip}>
            <Plus className="h-4 w-4 mr-2" />
            Add Trip
          </Button>
        </div>

        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">No trips yet</h3>
            <p className="text-gray-500 mb-4">
              Start planning your next adventure by adding a new trip
            </p>
            <Button onClick={onAddTrip}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Trip
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedTrips.map((trip) => (
              <TripCard
                key={trip.id}
                destination={trip.destination}
                startDate={trip.startDate}
                endDate={trip.endDate}
                status={trip.status}
                onEdit={() => onEditTrip(trip.id)}
                onDelete={() => onDeleteTrip(trip.id)}
                onView={() => onViewTrip(trip.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripGrid;
