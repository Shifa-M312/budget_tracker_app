import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Direct, absolute registration endpoint link
      await axios.post("https://onrender.com", {
        name,
        email,
        password,
      });

      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 shadow-md rounded w-80"
      >
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
