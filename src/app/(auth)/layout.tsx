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
                        <h1 className="text-2xl font-headline font-semibold text-primary transition-colors duration-300 group-hover:text-primary/80">
                            NexaHome
                        </h1>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
