import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import Button from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import logo from '../assets/images/logo.svg';
import useLogin from '../hooks/useLogin';
import { useSelector } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, onSubmit, loginError, showError, setShowError } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  // Add this to check if the user is already authenticated
  const isAuthenticated = useSelector((state) => 
    state.user.isAuthenticated || state.cleaner.isAuthenticated
  );

  // Redirect authenticated users to the home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
                <img className="h-8 w-auto sm:h-10" src={logo} alt="EcoClean Logo" />
                <span className="ml-2 text-xl font-bold text-primary">EcoClean</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-10">
              <Link to="/home" className="text-base font-medium text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link to="/about" className="text-base font-medium text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link to="/services" className="text-base font-medium text-muted-foreground hover:text-primary">
                Services
              </Link>
              <Link to="/contact" className="text-base font-medium text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link to="/signup" className="whitespace-nowrap text-base font-medium text-muted-foreground hover:text-primary">
                Sign up
              </Link>
              <Button className="mx-2" onClick={() => navigate('/signup-cleaner')}>
                Sign up as Cleaner
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg">
          <div>
            <img className="h-8 w-auto sm:h-10" src={logo} alt="EcoClean Logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email-address">Email address</Label>
                <div className="mt-1 relative">
                  <Mail className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="pl-10"
                    placeholder="Email address"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1 relative">
                  <Lock className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="pl-10"
                    placeholder="Password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80">
                Forgot your password?
              </Link>
            </div>

            {loginError && showError && (
              <div className="text-red-500 text-sm mt-2">
                {loginError}
                <button
                  type="button"
                  className="ml-2 text-primary hover:underline"
                  onClick={() => setShowError(false)}
                >
                  Dismiss
                </button>
              </div>
            )}

            <div className="flex justify-center">
              <Button type="submit" className="w-full">
                <LogIn className="h-5 w-5 mr-2" />
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;