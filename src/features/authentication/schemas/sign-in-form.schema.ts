import { z } from 'zod';

export const SignInFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = /[A-Z]/.test(password);
    const containsLowercase = /[a-z]/.test(password);
    const containsNumber = /\d/.test(password);
    const containsSpecialChar = /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(password);
    if (!containsUppercase) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Password must contain at least one uppercase letter!',
      });
    }

    if (!containsLowercase) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Password must contain at least one lowercase letter!',
      });
    }

    if (!containsNumber) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Password must contain at least one number!',
      });
    }

    if (!containsSpecialChar) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Password must contain at least one special character!',
      });
    }
  });
