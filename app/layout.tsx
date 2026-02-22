import "./globals.css";

export const metadata = {
    title: "Alborán Villa",
    description: "Private Mediterranean residence in Gili Air.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-[#F8F4F0] text-[#2f2f2f] antialiased">
                {children}
            </body>
        </html>
    );
}