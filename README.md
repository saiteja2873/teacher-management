# 🎓 Teacher Management System (Next.js + TailwindCSS)

This is a modern, responsive admin dashboard built using **Next.js (App Router)** and **TailwindCSS**, with support for:
- ⚙️ Admin Settings (Dark mode, Notifications)
- 👩‍🏫 Dynamic Teacher Profile Management (Editable)
- 📆 Dashboard with Schedule & Summary Cards
- 💰 UPI QR Code Generator (Receive Payments)
- 🌙 Dark Mode support
- 📱 Fully mobile-responsive UI

---

## 🚀 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** – for animations
- **React Icons** – modern icons
- **React Toastify** – toast notifications
- **React QR Code** – UPI QR generation

---

## 📦 Features

### ✅ Dashboard Page
- Summary Cards: Teachers, Students, Classes
- Today's Schedule Table (Responsive)
- Recent Activity Feed

### ✅ Teacher Profile Page
- Edit name, email, phone, address
- Add/Edit private & group qualifications
- Inline validation & total rates
- Fully animated interactions

### ✅ Settings Page
- Update Admin name/email
- Dark mode toggle 🌙
- Notifications toggle 🔔
- Save confirmation via toast

### ✅ UPI Payment (QR Generator)
- Enter UPI ID, amount, and remarks
- Generates dynamic UPI QR
- Validation + user-friendly error handling

---

## 📁 Project Structure

```
teacher-management-main/              # Root directory
├── .gitignore                        # Files to ignore in Git
├── README.md                         # Project documentation
└── frontend/                         # Frontend Next.js app            
    ├── public/                      # Static assets
    └── src/                         # App source code
        └── app/
            ├── globals.css          # Global styles
            ├── layout.tsx           # Root layout
            ├── page.tsx             # Dashboard/homepage
            ├── attendance/          # Attendance management
            ├── leaves/              # Leave tracking
            ├── logout/              # Logout route
            ├── payments/            # Payment summary
            ├── schedules/           # Class schedules
            ├── settings/            # Admin settings
            ├── teachers/            # Teacher CRUD pages
            │   ├── [id]/            # Individual teacher details
            │   └── add/             # Add new teacher
            └── upi/                 # UPI payment system
                ├── page.tsx         # UPI landing
                ├── receive/         # Generate UPI QR
                └── send/            # UPI payment send page
```


## 🚀 Installation

```bash
# Navigate into the project
cd teacher-management-main/frontend

# Install dependencies
npm install


## ▶️ Usage

# Start the development server
npm run dev

# App will be live at http://localhost:3000

```
---

## 📘 Final Notes

This project was built to simplify teacher management workflows through an intuitive UI and modern tech stack.

Thanks for exploring the **Teacher Management System**!  
Feel free to fork, star ⭐, or share your suggestions.
