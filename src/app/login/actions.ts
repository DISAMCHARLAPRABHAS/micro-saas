'use server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function login(values: z.infer<typeof schema>) {
    try {
        const validatedValues = schema.parse(values);
        await signInWithEmailAndPassword(auth, validatedValues.email, validatedValues.password);
        return { success: true };
    } catch (error: any) {
        let errorMessage = 'An unexpected error occurred.';
        if (error.code) {
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    errorMessage = 'Invalid email or password.';
                    break;
                default:
                    errorMessage = `An error occurred: ${error.message}`;
            }
        } else if (error instanceof z.ZodError) {
            errorMessage = error.errors.map((e) => e.message).join(' ');
        }
        return { error: errorMessage };
    }
}
