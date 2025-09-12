'use server';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function signup(values: z.infer<typeof schema>) {
    try {
        const validatedValues = schema.parse(values);
        await createUserWithEmailAndPassword(auth, validatedValues.email, validatedValues.password);
        return { success: true };
    } catch (error: any) {
        let errorMessage = 'An unexpected error occurred. Please try again.';
        if (error instanceof z.ZodError) {
            errorMessage = error.errors.map((e) => e.message).join(' ');
        } else if (error.code) {
             switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'This email is already registered. Please log in instead.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'The password is too weak. It must be at least 6 characters long.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'The email address is not valid.';
                    break;
                default:
                    errorMessage = `An authentication error occurred: ${error.message}`;
            }
        }
        return { error: errorMessage };
    }
}
