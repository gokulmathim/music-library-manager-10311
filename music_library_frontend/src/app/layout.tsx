import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { AuthProvider } from "@/context/AuthContext";

// Required: Font loaders must be assigned to a const at module scope
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Used for metadata in <head>
export const metadata: Metadata = {
  title: "Music Library",
  description: "Modern music library app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // TopBar search handler left as no-op for now
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-back text-foreground`}>
        <AuthProvider>
          <div className="flex h-screen bg-back">
            <Sidebar />
            <main className="flex flex-col flex-1 h-screen overflow-auto">
              <TopBar
                onSearch={() => {
                  // No-op
                }}
              />
              <div className="p-6 flex-1 overflow-y-auto">
                {children}
              </div>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
