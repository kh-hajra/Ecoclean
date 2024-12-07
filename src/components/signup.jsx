import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, UserPlus, ArrowLeft } from "lucide-react";
import Button from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import logo from "../assets/images/logo.svg"
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up attempt with:", { fullName, email, password, confirmPassword });
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col">
       <header className="bg-background shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1 items-center">
              <Button variant="ghost" size="icon" className="mr-4" aria-label="Go back" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <Link to="/" className="flex items-center">
                <span className="sr-only">EcoClean</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src={logo} // Correct File Reference
                  alt="EcoClean Logo"
                />
                <span className="ml-2 text-xl font-bold text-primary">EcoClean</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link to="/login" className="whitespace-nowrap text-base font-medium text-muted-foreground hover:text-primary">
                Sign in
              </Link>
              <Button href="/CleanerSignup" className="group relative  flex justify-center py-2 px-4 mx-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => navigate('/signup-cleaner')}>
                Sign up as Cleaner
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg">
          <div>
          <img
                  className="h-8 w-auto sm:h-10"
                  src={logo} // Correct File Reference
                  alt="EcoClean Logo"
                />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="full-name">Full name</Label>
                <div className="mt-1 relative">
                  <User className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="full-name"
                    name="full-name"
                    type="text"
                    required
                    className="pl-10"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email-address">Email address</Label>
                <div className="mt-1 relative">
                  <Mail className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    className="pl-10"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1 relative">
                  <Lock className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm password</Label>
                <div className="mt-1 relative">
                  <Lock className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
