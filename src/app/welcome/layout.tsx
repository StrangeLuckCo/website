export default function WelcomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-hidden h-screen w-full bg-black">{children}</div>
  );
}
