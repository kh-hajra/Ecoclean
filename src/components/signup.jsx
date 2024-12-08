import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, UserPlus, ArrowLeft } from "lucide-react";
import Button from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import logo from "../assets/images/logo.svg";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register, // Register inputs to hook-form
    handleSubmit,
    errors, // Hook-form errors
    onSubmit,
    signUpError,
    showError,
    setShowError,
    isValid,
    successMessage,
  } = useSignup();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col">
      <header className="bg-background shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1 items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-4"
                aria-label="Go back"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <Link to="/" className="flex items-center">
                <img
                  className="h-8 w-auto sm:h-10"
                  src={logo}
                  alt="EcoClean Logo"
                />
                <span className="ml-2 text-xl font-bold text-primary">EcoClean</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link
                to="/login"
                className="whitespace-nowrap text-base font-medium text-muted-foreground hover:text-primary"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg">
          <div>
            <img className="h-8 w-auto sm:h-10" src={logo} alt="EcoClean Logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
              Create your account
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="full-name">Full name</Label>
                <div className="mt-1 relative">
                  <User className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="full-name"
                    {...register("name")}
                    required
                    className="pl-10"
                    placeholder="Full name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="email-address">Email address</Label>
                <div className="mt-1 relative">
                  <Mail className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email-address"
                    {...register("email")}
                    required
                    className="pl-10"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1 relative">
                  <Lock className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </div>
            {signUpError && showError && (
              <p className="text-red-600 text-sm mt-1">{signUpError}</p>
            )}
            {successMessage && (
              <p className="text-green-600 text-sm mt-1">{successMessage}</p>
            )}
            <div>
              <Button
                type="submit"
                disabled={!isValid}
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
