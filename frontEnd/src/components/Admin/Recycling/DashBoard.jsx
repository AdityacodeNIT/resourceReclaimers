import { useState } from "react";

import RecyclingForm from "./RecyclingForm";
import RecyclingList from "./RecyclingList";

const Dashboard = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const refreshData = () => setRefresh(!refresh);
  const closeForm = () => setSelectedRecord(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recycling Dashboard</h1>
      <RecyclingList onEdit={setSelectedRecord} refreshData={refreshData} />
      { <RecyclingForm selectedRecord={selectedRecord} refreshData={refreshData} onClose={closeForm} />}
    </div>
  );
};

export default Dashboard;
