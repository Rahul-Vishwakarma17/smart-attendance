📚 Smart Attendance System

A full-stack Smart Attendance System built using React (Vite) for frontend and Supabase for backend, deployed on Vercel.

🚀 Live Demo

👉 https://smart-attendance-sable.vercel.app/

🧠 Features

✔ User Authentication (Supabase)
✔ QR-based Attendance System
✔ Real-time data storage
✔ Teacher Dashboard
✔ Responsive UI
✔ Deployed on Vercel

🛠️ Tech Stack
Frontend: React (Vite)
Backend: Supabase
Deployment: Vercel
Version Control: Git & GitHub
📁 Project Structure
smart-attendance/
│
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── components/
├── index.html
├── package.json
└── vite.config.js
⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/your-username/smart-attendance.git
cd smart-attendance
2️⃣ Install dependencies
npm install
3️⃣ Configure Supabase

Create a .env file in root:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
4️⃣ Run the project
npm run dev
5️⃣ Build for production
npm run build
🧪 How It Works
User logs in via Supabase authentication
Teacher generates QR code
Students scan QR using mobile
Attendance data is stored in Supabase
Teacher can view attendance in dashboard
📊 Database
Uses Supabase tables
Row Level Security (RLS) enabled
Secure data handling
🌐 Deployment
Frontend deployed on Vercel
Backend powered by Supabase
Auto deployment via GitHub
🔐 Security

✔ Environment variables used
✔ Supabase RLS enabled
✔ Secure API keys

📌 Future Improvements
QR auto-scanner improvements
Attendance analytics
CSV export
Location-based validation
UI enhancements
👨‍💻 Author

Rahul Vishwakarma

⭐ Acknowledgements
React
Supabase
Vercel
GitHub
📄 License

This project is licensed under the MIT License.