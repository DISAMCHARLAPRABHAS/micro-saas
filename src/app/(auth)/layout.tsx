import { AppLogo } from "@/components/app-logo";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <div className="w-full max-w-sm">
                <div className="mb-6 flex justify-center">
                    <div className="flex items-center gap-2">
                        <AppLogo />
                        <h1 className="text-2xl font-headline font-semibold text-primary">
                            NexaHome
                        </h1>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
