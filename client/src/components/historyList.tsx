import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryCard from "./historyCard";

interface HistoryItem {
  id: number;
  songId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  song: {
    id: number;
    trackId: string;
    trackName: string;
    artistName: string;
    albumName: string;
    albumImageUrl: string;
    playerUri: string;
  };
}

const HistoryList: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    axios
      .get("/api/users/history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("id_token")}`,
        },
      })
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-start pl-6">
      {/* Align cards to the left with padding */}
      {history.map((item) => (
        <div className="max-w-lg w-full mb-4">
          {/* Restrict width to max lg with margin for spacing */}
          <HistoryCard key={item.id} historyItem={item} />
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
