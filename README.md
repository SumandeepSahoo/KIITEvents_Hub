# 🎓 KIIT Events Hub

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)  
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=flat&logo=mongodb)](https://www.mongodb.com/atlas)  
[![Clerk](https://img.shields.io/badge/Auth-Clerk-blue?style=flat&logo=clerk)](https://clerk.com/)  
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=flat&logo=tailwindcss)](https://tailwindcss.com/)  
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)  

A modern event management platform for **KIIT University**, built with Next.js, MongoDB Atlas, and Clerk authentication.  
Deployed seamlessly on **Vercel**.

---
## 🌐 Screenshot

<img width="711" height="470" alt="Screenshot 2025-08-09 234351" src="https://github.com/user-attachments/assets/e025f59d-70d6-4233-aacc-5731ca7e1551" />

---
## ✨ Features

✅ Secure user authentication with Clerk  
✅ Event listing and details page  
✅ Responsive & modern UI (Tailwind CSS + shadcn/ui + Radix)  
✅ MongoDB Atlas integration for persistent storage  
✅ Easy deployment with Vercel  

---

## 🛠️ Tech Stack

- ⚡ **Next.js 15** (App Router, Turbopack)  
- ⚛️ **React 18**  
- 🎨 **Tailwind CSS** + [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)  
- 🔑 **Clerk** (Authentication)  
- 🗄️ **MongoDB Atlas** (Database)  

---

## ⚙️ Getting Started

Clone the repository:

```bash
git clone https://github.com/<your-username>/KIITEvents_Hub.git
cd KIITEvents_Hub

# Install dependencies:
npm install

# Start the development server:
npm run dev

👉 The app will be running at http://localhost:9002
```

---

## 🔑 Environment Variables
  Create a .env.local file in the root directory and configure the following:
```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

# API Base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:9002
```
    ⚠️ Replace placeholders with your actual keys.
---

## 📂 Project Structure
```
KIITEvents_Hub/
 ┣ 📂 src/
 ┃ ┣ 📂 app/        # Next.js App Router pages
 ┃ ┣ 📂 components/ # Reusable UI components
 ┃ ┣ 📂 lib/        # Config, models, helpers
 ┃ ┗ 📂 styles/     # Tailwind styles
 ┣ 📜 package.json
 ┣ 📜 next.config.mjs
 ┣ 📜 tailwind.config.ts
 ┗ 📜 README.md
```

---

## 🤝 Contributing
```
Contributions are welcome!
Fork the repository
Create a branch (git checkout -b feature/my-feature)
Commit your changes (git commit -m "Add my feature")
Push the branch (git push origin feature/my-feature)
Open a Pull Request 🚀
```

---

## 📜 License

This project is licensed under the MIT License.

---
