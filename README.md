# oddo--hackathon

problem statement : Develop a Skill Swap Platform — a mini application that enables users to list their skills and
request others in return

Team Members Details : 
Poonam Sahu (leader)
Mrunal Gaikwad
Shekh Asif 

Team Members Email id :
Poonam Sahu :    poonam2005sahu@gmail.com
Mruanl Gaikwad : mrunalgaikwad02@gmail.com
Shekh Asif :     shekhasifofficial2022@gmail.com


# Oddo - Skill Swap Platform 🛠️

A full-stack web platform that allows users to **swap skills** with each other and helps **admins monitor and manage** the system efficiently.

---

## 🔥 Features

### 👥 User Features
- Register & Login (JWT Auth)
- Basic profile: name, location, availability
- Upload profile photo (optional)
- Add **skills offered** and **skills wanted**
- Make profile **public or private**
- Search others by skill (e.g., Photoshop, Excel)
- Send & manage **skill swap requests**
- Accept or reject swap requests
- Give feedback/rating after completed swaps
- Delete swap request if not accepted

### 🛡️ Admin Features
- Ban or unban users
- Flag or unflag inappropriate skill descriptions
- Monitor pending, accepted, or cancelled swaps
- Send platform-wide announcements (real-time with Socket.IO)
- Download reports (CSV) for:
  - Users
  - Swaps
  - Feedbacks

---

## 🧱 Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Auth**: JWT
- **File Uploads**: Multer
- **Real-Time Notifications**: Socket.IO
- **Reports**: JSON2CSV

---

## 🚀 Project Structure


---

## 🔐 API Endpoints

### 👤 User APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | Login user |
| GET    | `/api/users/me` | Get logged-in user's profile |
| PUT    | `/api/users/update` | Update profile info |
| GET    | `/api/search?skill=excel` | Search users by skill |
| POST   | `/api/swaps` | Create a new swap request |
| PUT    | `/api/swaps/:id/respond` | Accept/Reject swap |
| DELETE | `/api/swaps/:id` | Cancel swap |
| GET    | `/api/swaps` | View my swaps |
| POST   | `/api/feedbacks/:swapId` | Submit feedback |
| GET    | `/api/feedbacks/user/:userId` | Get feedbacks for a user |
| GET    | `/api/notifications` | Get system notifications |

### 🛡️ Admin APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT    | `/api/admin/users/:userId/ban` | Ban a user |
| PUT    | `/api/admin/users/:userId/unban` | Unban a user |
| PUT    | `/api/admin/users/:userId/flag-skill` | Flag a skill |
| PUT    | `/api/admin/users/:userId/unflag-skill` | Unflag a skill |
| GET    | `/api/admin/users` | List all users |
| GET    | `/api/admin/search-skill?skill=python` | Search users by skill |
| POST   | `/api/notifications` | Send real-time notification |
| GET    | `/api/reports/users` | Download users report (CSV) |
| GET    | `/api/reports/swaps` | Download swaps report (CSV) |
| GET    | `/api/reports/feedbacks` | Download feedback report (CSV) |

---

## 🌐 Deployment (Render)

### Setup
- Connect GitHub repo on [Render](https://oddo-hackathon.onrender.com)
- Use following settings:

| Option           | Value                  |
|------------------|------------------------|
| Language         | Node                   |
| Build Command    | `npm install`          |
| Start Command    | `node server.js`       |
| Root Directory   | Leave blank (unless in `/backend`) |
| Environment Vars | Add `.env` variables   |

### Must-Have `.env` Variables


---

## 🧪 Dummy Data for Testing

### Users Collection
```json
{
  "name": "Asif",
  "email": "asif@example.com",
  "password": "hashedpassword",
  "role": "user",
  "skillsOffered": ["JavaScript", "Node.js"],
  "skillsWanted": ["React", "MongoDB"],
  "availability": ["Evenings"],
  "isPublic": true
}

{
  "requester": "ObjectId of User A",
  "recipient": "ObjectId of User B",
  "offeredSkill": "JavaScript",
  "requestedSkill": "React",
  "status": "pending"
}

{
  "from": "ObjectId of requester",
  "to": "ObjectId of recipient",
  "swapId": "ObjectId of swap",
  "rating": 5,
  "comment": "Great collaboration!"
}
