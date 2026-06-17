import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Direct, absolute login endpoint link
      const { data } = await axios.post("https://onrender.com", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("loggedIn", "true");

      alert("Login successful");
      navigate("/transactions"); 
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 shadow-md rounded w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
