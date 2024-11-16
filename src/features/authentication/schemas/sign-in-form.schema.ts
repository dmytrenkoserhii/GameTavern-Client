import { z } from 'zod';

export const SignInFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    remember: z.boolean().optional(),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = /[A-Z]/.test(password);
    const containsLowercase = /[a-z]/.test(password);
    const containsNumber = /\d/.test(password);
    const containsSpecialChar = /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(
      password
    );
    if (
      !containsUppercase ||
      !containsLowercase ||
      !containsNumber ||
      !containsSpecialChar
    ) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Password does not meet complexity requirements',
      });
    }
  });