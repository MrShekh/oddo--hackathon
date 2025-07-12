import React, { useState, useMemo, useEffect } from "react";
import UserSearch from "./components/UserSearch";
import UserFilters from "./components/UserFilters";
import Pagination from "./components/Pagination";
import UserTable from "./components/UserTable";
import UserProfileModal from "./UserProfileModal";

const API_BASE = "https://oddo-hackathon.onrender.com";

// Expanded mock data
const initialUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    swaps: 12,
    rating: 4.6,
    bio: "A passionate learner and teacher.",
    skillsOffered: ["Web Dev", "Design"],
    skillsWanted: ["Marketing"],
    availability: "Weekends",
    swapHistory: ["Swap 1", "Swap 2"],
    feedback: ["Great to work with!", "Very helpful."],
    reports: [],
  },
  {
    name: "Jane Admin",
    email: "jane@platform.com",
    role: "admin",
    status: "active",
    swaps: null,
    rating: null,
    bio: "Platform administrator.",
    skillsOffered: ["Management"],
    skillsWanted: [],
    availability: "Weekdays",
    swapHistory: [],
    feedback: [],
    reports: [],
  },
  {
    name: "Alice R.",
    email: "alice@sample.com",
    role: "user",
    status: "banned",
    swaps: 5,
    rating: 3.8,
    bio: "Freelancer and mentor.",
    skillsOffered: ["Writing"],
    skillsWanted: ["Design"],
    availability: "Evenings",
    swapHistory: ["Swap A"],
    feedback: ["Needs improvement."],
    reports: ["Spam report"],
  },
  {
    name: "Lucas Bennett",
    email: "lucas.bennett@example.com",
    role: "user",
    status: "active",
    swaps: 8,
    rating: 4.2,
    bio: "Photographer and designer.",
    skillsOffered: ["Photography", "Graphic Design"],
    skillsWanted: ["Web Dev"],
    availability: "Flexible",
    swapHistory: ["Swap X", "Swap Y"],
    feedback: ["Excellent work!"],
    reports: [],
  },
  {
    name: "Sophia Carter",
    email: "sophia.carter@example.com",
    role: "admin",
    status: "active",
    swaps: 2,
    rating: 4.9,
    bio: "Admin and mentor.",
    skillsOffered: ["Web Dev"],
    skillsWanted: ["Photography"],
    availability: "Mornings",
    swapHistory: ["Swap Z"],
    feedback: ["Very professional."],
    reports: [],
  },
  // More mock users
  {
    name: "Emily Zhang",
    email: "emily.zhang@example.com",
    role: "user",
    status: "active",
    swaps: 15,
    rating: 4.7,
    bio: "Full-stack developer.",
    skillsOffered: ["Web Dev", "Data Analysis"],
    skillsWanted: ["UI/UX"],
    availability: "Evenings",
    swapHistory: ["Swap 3", "Swap 4"],
    feedback: ["Very skilled!"],
    reports: [],
  },
  {
    name: "Carlos Rivera",
    email: "carlos.rivera@example.com",
    role: "user",
    status: "banned",
    swaps: 3,
    rating: 2.9,
    bio: "Marketing specialist.",
    skillsOffered: ["Marketing"],
    skillsWanted: ["Web Dev"],
    availability: "Weekends",
    swapHistory: ["Swap 5"],
    feedback: ["Needs improvement."],
    reports: ["Inappropriate content"],
  },
  {
    name: "Priya Singh",
    email: "priya.singh@example.com",
    role: "user",
    status: "active",
    swaps: 10,
    rating: 4.4,
    bio: "UI/UX designer.",
    skillsOffered: ["UI/UX", "Design"],
    skillsWanted: ["Web Dev"],
    availability: "Flexible",
    swapHistory: ["Swap 6", "Swap 7"],
    feedback: ["Creative and helpful."],
    reports: [],
  },
  {
    name: "Mohammed Ali",
    email: "mohammed.ali@example.com",
    role: "user",
    status: "active",
    swaps: 7,
    rating: 4.1,
    bio: "Backend developer.",
    skillsOffered: ["Node.js", "APIs"],
    skillsWanted: ["Frontend"],
    availability: "Weekdays",
    swapHistory: ["Swap 8"],
    feedback: ["Reliable partner."],
    reports: [],
  },
  {
    name: "Sara Kim",
    email: "sara.kim@example.com",
    role: "admin",
    status: "active",
    swaps: 1,
    rating: 5.0,
    bio: "Platform admin and mentor.",
    skillsOffered: ["Mentoring"],
    skillsWanted: [],
    availability: "Anytime",
    swapHistory: ["Swap 9"],
    feedback: ["Excellent admin."],
    reports: [],
  },
  {
    name: "David Lee",
    email: "david.lee@example.com",
    role: "user",
    status: "active",
    swaps: 6,
    rating: 4.0,
    bio: "Content writer.",
    skillsOffered: ["Writing"],
    skillsWanted: ["Editing"],
    availability: "Evenings",
    swapHistory: ["Swap 10"],
    feedback: ["Great writing skills."],
    reports: [],
  },
  {
    name: "Olivia Brown",
    email: "olivia.brown@example.com",
    role: "user",
    status: "banned",
    swaps: 4,
    rating: 3.2,
    bio: "Graphic designer.",
    skillsOffered: ["Design"],
    skillsWanted: ["Web Dev"],
    availability: "Weekends",
    swapHistory: ["Swap 11"],
    feedback: ["Needs to improve communication."],
    reports: ["Spam"],
  },
  {
    name: "Ethan Patel",
    email: "ethan.patel@example.com",
    role: "user",
    status: "active",
    swaps: 9,
    rating: 4.3,
    bio: "Frontend developer.",
    skillsOffered: ["React", "CSS"],
    skillsWanted: ["Backend"],
    availability: "Flexible",
    swapHistory: ["Swap 12"],
    feedback: ["Quick learner."],
    reports: [],
  },
  {
    name: "Mia Wilson",
    email: "mia.wilson@example.com",
    role: "user",
    status: "active",
    swaps: 11,
    rating: 4.8,
    bio: "Mentor and developer.",
    skillsOffered: ["Mentoring", "Web Dev"],
    skillsWanted: ["Design"],
    availability: "Anytime",
    swapHistory: ["Swap 13"],
    feedback: ["Very supportive."],
    reports: [],
  },
];

const PAGE_SIZE = 9;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [profileUser, setProfileUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  // Fetch all users from backend
  useEffect(() => {
    let url = `${API_BASE}/api/admin/users`;
    if (status === "Banned") url += "?banned=true";
    else if (status === "Active") url += "?banned=false";
    fetch(url)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]));
  }, [status]);

  // Search by skill
  useEffect(() => {
    if (search.trim() === "") return;
    const timeout = setTimeout(() => {
      fetch(`${API_BASE}/api/admin/search-skill?skill=${encodeURIComponent(search)}`)
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(() => {});
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  // Filtering, searching, sorting
  const filteredUsers = useMemo(() => {
    let filtered = [...users];
    if (search) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (role !== "All") {
      filtered = filtered.filter(u => u.role.toLowerCase() === role.toLowerCase());
    }
    if (status !== "All") {
      filtered = filtered.filter(u => u.status.toLowerCase() === status.toLowerCase());
    }
    filtered.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [users, search, role, status, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const pagedUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Handlers
  const handleSort = key => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  const handleView = user => {
    setProfileUser(user);
    setProfileOpen(true);
  };
  const handleBanToggle = async (user, ban) => {
    try {
      const endpoint = ban ? `/api/admin/users/${user.id}/ban` : `/api/admin/users/${user.id}/unban`;
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to update user status');
      setUsers(users =>
        users.map(u =>
          u.id === user.id ? { ...u, status: ban ? 'banned' : 'active' } : u
        )
      );
    } catch (err) {
      alert('Error updating user: ' + err.message);
    }
  };

  // Flag a skill
  const handleFlagSkill = async (user, skill) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${user.id}/flag-skill`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill }),
      });
      if (!res.ok) throw new Error('Failed to flag skill');
      alert('Skill flagged!');
    } catch (err) {
      alert('Error flagging skill: ' + err.message);
    }
  };

  // Unflag a skill
  const handleUnflagSkill = async (user, skill) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${user.id}/unflag-skill`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill }),
      });
      if (!res.ok) throw new Error('Failed to unflag skill');
      alert('Skill unflagged!');
    } catch (err) {
      alert('Error unflagging skill: ' + err.message);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 px-10">
        <UserSearch value={search} onSearch={setSearch} />
        <UserFilters role={role} status={status} onRoleChange={setRole} onStatusChange={setStatus} />
      </div>
      <div className="px-10">
        <UserTable
          users={pagedUsers}
          onView={handleView}
          onBanToggle={handleBanToggle}
          onSort={handleSort}
          sortKey={sortKey}
          sortOrder={sortOrder}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        <UserProfileModal open={profileOpen} user={profileUser} onClose={() => setProfileOpen(false)} />
      </div>
    </div>
  );
};

export default Users; 