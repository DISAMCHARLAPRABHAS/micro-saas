import { AppLogo } from '@/components/app-logo';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <div className="w-full max-w-sm">
                <div className="mb-6 flex justify-center">
                    <div className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105">
                        <AppLogo />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
