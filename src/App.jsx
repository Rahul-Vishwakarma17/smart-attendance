import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { QRCodeCanvas } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [className, setClassName] = useState("");
  const [records, setRecords] = useState([]);
  const [filterClass, setFilterClass] = useState("");
  const [qrClass, setQrClass] = useState("");

  useEffect(() => {
    getUser();
    fetchAttendance();
  }, []);

  async function getUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  }

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) alert(error.message);
    else alert("Signup successful ✅");
  }

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else {
      alert("Login successful ✅");
      getUser();
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function fetchAttendance() {
    let query = supabase.from("attendance").select("*");

    if (filterClass) {
      query = query.eq("class_name", filterClass);
    }

    const { data, error } = await query;

    if (!error) {
      setRecords(data);
    }
  }

  async function markAttendance(customClass) {
    const selectedClass = customClass || className;

    if (!user) {
      alert("Please login first ❌");
      return;
    }

    const { data: existing } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_name", user.email)
      .eq("class_name", selectedClass);

    if (existing.length > 0) {
      alert("Attendance already marked ❌");
      return;
    }

    const { error } = await supabase
      .from("attendance")
      .insert([
        {
          user_name: user.email,
          class_name: selectedClass,
        },
      ]);

    if (error) {
      alert("Error saving attendance");
    } else {
      alert("Attendance marked ✅");
      fetchAttendance();
    }
  }

  // QR Scanner
  function startScanner() {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(async (decodedText) => {
      alert("Scanned: " + decodedText);

      setClassName(decodedText);

      await markAttendance(decodedText);

      scanner.clear();
    });
  }

  // Grouping for teacher dashboard
  const grouped = {};
  records.forEach((item) => {
    if (!grouped[item.user_name]) {
      grouped[item.user_name] = 0;
    }
    grouped[item.user_name]++;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Attendance 🚀</h1>

      {!user ? (
        <>
          <h2>Login 🔐</h2>

          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />

          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          <button onClick={signUp}>Sign Up</button>
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <h3>Logged in as: {user.email}</h3>
          <button onClick={logout}>Logout</button>

          <hr />

          {/* Manual Attendance */}
          <h2>Mark Attendance ✍️</h2>

          <input
            type="text"
            placeholder="Enter class name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <br /><br />

          <button onClick={() => markAttendance()}>
            Mark Attendance
          </button>

          <hr />

          {/* QR Generator */}
          <h2>Generate QR 📱</h2>

          <input
            type="text"
            placeholder="Enter class for QR"
            value={qrClass}
            onChange={(e) => setQrClass(e.target.value)}
          />

          <br /><br />

          {qrClass && <QRCodeCanvas value={qrClass} size={200} />}

          <hr />

          {/* QR Scanner */}
          <h2>Scan QR 📷</h2>

          <button onClick={startScanner}>
            Start Scanner
          </button>

          <div id="reader" style={{ width: "300px" }}></div>

          <hr />

          {/* Teacher Dashboard */}
          <h2>Teacher Dashboard 👨‍🏫</h2>

          <input
            type="text"
            placeholder="Filter by class"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          />

          <button onClick={fetchAttendance}>
            View Class Data
          </button>

          <h3>Attendance Count 📊</h3>

          <ul>
            {Object.entries(grouped).map(([user, count]) => (
              <li key={user}>
                {user} — {count} days
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;