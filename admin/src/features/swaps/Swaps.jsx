import React, { useState, useMemo } from "react";
import SwapsTable from "./components/SwapsTable";
import SwapsFilters from "./components/SwapsFilters";
import SwapsModal from "./components/SwapsModal";
import Pagination from "../users/components/Pagination";

const swapsData = [
  { from: "Liam Carter", to: "Sophia Bennett", offered: "Photography", requested: "Web Design", status: "Pending", date: "2024-07-01", message: "Looking forward to collaborating!" },
  { from: "Ethan Harper", to: "Olivia Turner", offered: "Graphic Design", requested: "Marketing", status: "Accepted", date: "2024-07-02" },
  { from: "Ava Mitchell", to: "Noah Parker", offered: "Content Writing", requested: "SEO", status: "Rejected", date: "2024-07-03", message: "Can we reschedule?" },
  { from: "Isabella Reed", to: "Jackson Hayes", offered: "Video Editing", requested: "Social Media", status: "Cancelled", date: "2024-07-04" },
  { from: "Mia Foster", to: "Lucas Coleman", offered: "Illustration", requested: "Copywriting", status: "Pending", date: "2024-07-05" },
  { from: "Noah Parker", to: "Ava Mitchell", offered: "SEO", requested: "Content Writing", status: "Accepted", date: "2024-07-06" },
  { from: "Sophia Bennett", to: "Liam Carter", offered: "Web Design", requested: "Photography", status: "Pending", date: "2024-07-07", message: "Excited to swap skills!" },
  { from: "Jackson Hayes", to: "Isabella Reed", offered: "Social Media", requested: "Video Editing", status: "Rejected", date: "2024-07-08" },
  { from: "Lucas Coleman", to: "Mia Foster", offered: "Copywriting", requested: "Illustration", status: "Cancelled", date: "2024-07-09" },
  { from: "Olivia Turner", to: "Ethan Harper", offered: "Marketing", requested: "Graphic Design", status: "Accepted", date: "2024-07-10" },
  { from: "Emily Zhang", to: "David Lee", offered: "Data Analysis", requested: "Public Speaking", status: "Pending", date: "2024-07-11" },
  { from: "David Lee", to: "Emily Zhang", offered: "Public Speaking", requested: "Data Analysis", status: "Accepted", date: "2024-07-12" },
  { from: "Priya Singh", to: "Carlos Rivera", offered: "UI/UX Design", requested: "Marketing", status: "Rejected", date: "2024-07-13" },
  { from: "Carlos Rivera", to: "Priya Singh", offered: "Marketing", requested: "UI/UX Design", status: "Cancelled", date: "2024-07-14" },
];

const PAGE_SIZE = 9;
const quickDateOptions = [
  { label: "Today", days: 0 },
  { label: "Last 7 Days", days: 7 },
  { label: "Last 30 Days", days: 30 },
];

function isWithinDays(dateStr, days) {
  const date = new Date(dateStr);
  const now = new Date();
  if (days === 0) {
    return date.toDateString() === now.toDateString();
  }
  const diff = (now - date) / (1000 * 60 * 60 * 24);
  return diff <= days;
}

const Swaps = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("All");
  const [skill, setSkill] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [quickDate, setQuickDate] = useState("");
  const [user, setUser] = useState("");
  const [sort, setSort] = useState("newest");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState(null);

  // Collect all unique skills for dropdown
  const allSkills = Array.from(new Set(swapsData.flatMap(s => [s.offered, s.requested])));

  const filteredSwaps = useMemo(() => {
    let filtered = [...swapsData];
    if (status !== "All") filtered = filtered.filter(s => s.status === status);
    if (skill) filtered = filtered.filter(s => s.offered.toLowerCase().includes(skill.toLowerCase()) || s.requested.toLowerCase().includes(skill.toLowerCase()));
    if (user) filtered = filtered.filter(s =>
      s.from.toLowerCase().includes(user.toLowerCase()) ||
      s.to.toLowerCase().includes(user.toLowerCase())
    );
    if (dateFrom) filtered = filtered.filter(s => new Date(s.date) >= new Date(dateFrom));
    if (dateTo) filtered = filtered.filter(s => new Date(s.date) <= new Date(dateTo));
    if (quickDate) {
      const days = quickDateOptions.find(q => q.label === quickDate)?.days;
      if (days !== undefined) filtered = filtered.filter(s => isWithinDays(s.date, days));
    }
    if (sort === "newest") filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "oldest") filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === "skill") filtered.sort((a, b) => a.offered.localeCompare(b.offered));
    return filtered;
  }, [status, skill, user, dateFrom, dateTo, quickDate, sort]);

  // Pagination
  const totalPages = Math.ceil(filteredSwaps.length / PAGE_SIZE);
  const pagedSwaps = filteredSwaps.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Reset to page 1 on filter/sort change
  React.useEffect(() => { setCurrentPage(1); }, [status, skill, user, dateFrom, dateTo, quickDate, sort]);

  const handleView = (swap) => {
    setSelectedSwap(swap);
    setModalOpen(true);
  };

  return (
    <div className="w-full px-10 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <SwapsFilters
          status={status} setStatus={setStatus}
          skill={skill} setSkill={setSkill} allSkills={allSkills}
          user={user} setUser={setUser}
          dateFrom={dateFrom} setDateFrom={setDateFrom}
          dateTo={dateTo} setDateTo={setDateTo}
          sort={sort} setSort={setSort}
        />
      </div>
      <SwapsTable swaps={pagedSwaps} onView={handleView} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <SwapsModal open={modalOpen} swap={selectedSwap} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Swaps; 