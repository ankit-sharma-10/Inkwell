import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");
    setIsSubmitting(true);
    try {
      const session = await authService.createAccount(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[60vh]">
      <div className="w-full max-w-md glass-card p-8 sm:p-10 animate-fade-in-scale">
        <div className="mb-6 flex justify-center">
          <Logo width="120px" />
        </div>

        <h2 className="text-center text-2xl font-bold text-neutral-100 mb-1">
          Create your account
        </h2>
        <p className="text-center text-sm text-neutral-300/60 mb-8">
          Join Inkwell and start sharing your ideas
        </p>

        {error && (
          <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-danger-500/10 border border-danger-500/20">
            <svg
              className="w-4 h-4 text-danger-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-sm text-danger-500">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Your full name"
              type="text"
              {...register("userName", {
                required: true,
              })}
            />

            <Input
              label="Email"
              placeholder="you@example.com"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                      value,
                    ) || "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password"
              placeholder="Min 8 characters"
              type="password"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])\S{8,64}$/.test(
                      value,
                    ) ||
                    "Password must be 8–64 characters long and include uppercase, lowercase, number, and special character.",
                },
              })}
            />

            <Button
              type="submit"
              className="w-full mt-2"
              isLoading={isSubmitting}
            >
              Create Account
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-300/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-accent-400 hover:text-accent-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
