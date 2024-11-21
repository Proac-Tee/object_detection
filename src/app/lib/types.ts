import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "Full name must be at least 2 characters long.",
    })
    .max(100, {
      message: "Full name must be at most 100 characters long.",
    }),
  emailAddress: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long.",
    })
    .max(50, {
      message: "Password must be at most 50 characters long.",
    }),
  confirmPassword: z
    .string()
    .min(6, {
      message: "Confirm Password must be at least 6 characters long.",
    })
    .max(50, {
      message: "Confirm Password must be at most 50 characters long.",
    }),
});

export const signInSchema = z.object({
  loginEmailAddress: z.string().email({
    message: "Please enter a valid email.",
  }),
  loginPassword: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long.",
    })
    .max(50, {
      message: "Password must be at most 50 characters long.",
    }),
});
