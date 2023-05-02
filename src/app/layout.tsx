import PromptInput from "@/components/PromptInput";
import "../styles/globals.css";
import Header from "@/components/Header";
import ClientProvider from "@/components/ClientProvider";

export const metadata = {
  title: "AI Image Generator",
  description: "An image generator using various AI tools including Chat GPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {/* Header */}
          <Header />

          {/* Prompt Input */}
          <PromptInput></PromptInput>

          {/* Main Content */}

          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
