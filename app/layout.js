import Header from "./_components/Header";
import "@/app/_styles/globals.css";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Rubik } from "next/font/google";
import Error from "./error";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  title: "The Grand Aura",
};

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const revalidate=0;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} bg-primary-950 min-h-screen flex flex-col antialiased`}
      >
        <Header />
        <ErrorBoundary fallback={<Error />}>
          <div className="flex-1 px-8 py-12">
            <main className="mx-auto max-w-7xl text-primary-200">
              <ReservationProvider>{children}</ReservationProvider>
            </main>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
