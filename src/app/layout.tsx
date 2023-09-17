import { SettingsModel } from "@/components";
import Providers from "@/contexts/Providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme='dark'>
      <head />
      <body className="bg-base-300 lg:px-5">
        <Providers>
          {children}
          <SettingsModel />
        </Providers>
      </body>
    </html>
  );
}
