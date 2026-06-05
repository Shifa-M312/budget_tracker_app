import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const loggedIn = localStorage.getItem("loggedIn");
  const userRaw = localStorage.getItem("user"); 

  let userDisplayName = "User Account";

  if (userRaw) {
    try {
      const parsedUser = JSON.parse(userRaw);
      if (parsedUser && parsedUser.name) {
        userDisplayName = parsedUser.name; 
      } else if (parsedUser && parsedUser.email) {
        userDisplayName = parsedUser.email.split("@")[0]; 
      }
    } catch (e) {
      if (userRaw !== "undefined" && userRaw !== "null") {
        userDisplayName = userRaw;
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
    alert("Logged out successfully");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center w-full shadow-lg border-b border-slate-800">
      <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Budget Insights
      </h2>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-400 transition text-sm font-medium">Home</Link>
        <Link to="/transactions" className="hover:text-blue-400 transition text-sm font-medium">Transactions</Link>

        {!loggedIn ? (
          <>
            <Link to="/login" className="hover:text-blue-400 transition text-sm font-medium">Login</Link>
            <Link to="/signup" className="bg-blue-600 px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-500 transition text-sm">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-md font-medium max-w-[180px] truncate text-slate-300">
               Welcome, {userDisplayName}
            </span>
            <button onClick={handleLogout} className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition text-sm font-medium">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
