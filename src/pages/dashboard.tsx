import React from "react";
import TripGrid from "@/components/dashboard/TripGrid";
import TripFormDialog from "@/components/dashboard/TripFormDialog";

const DashboardPage = () => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedTripId, setSelectedTripId] = React.useState<string | null>(
    null,
  );

  const handleAddTrip = () => {
    setSelectedTripId(null);
    setIsFormOpen(true);
  };

  const handleEditTrip = (id: string) => {
    setSelectedTripId(id);
    setIsFormOpen(true);
  };

  const handleDeleteTrip = (id: string) => {
    // Placeholder for delete functionality
    console.log("Delete trip:", id);
  };

  const handleViewTrip = (id: string) => {
    // Placeholder for view functionality
    console.log("View trip:", id);
  };

  const handleFormSubmit = (data: any) => {
    // Placeholder for form submission
    console.log("Form submitted:", data);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TripGrid
        onAddTrip={handleAddTrip}
        onEditTrip={handleEditTrip}
        onDeleteTrip={handleDeleteTrip}
        onViewTrip={handleViewTrip}
      />

      <TripFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        mode={selectedTripId ? "edit" : "create"}
      />
    </div>
  );
};

export default DashboardPage;
