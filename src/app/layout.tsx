import "./globals.css";

import Link from "next/link";
import Head from "next/head";
import type { Metadata } from "next";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { Button } from "@/components/ui/button";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  fallback: ["system-ui", "sans-serif"],
  preload: true
});

export const metadata: Metadata = {
  title: "TTAI Email - Simple Temporary Email Service",
  description: "A beautiful, simple and secure temporary email service"
};

const extensionSanitizerScript = `
(() => {
  const ATTRS_TO_REMOVE = [
    "bis_skin_checked",
    "bis_register",
    "__processed_c35a75f1-3491-456f-9231-b867017544c8__"
  ];
  const TEXT_ATTR = "data-expected-text";

  const sanitizeNode = (node) => {
    if (!node) return;

    if (node.nodeType === Node.ELEMENT_NODE) {
      ATTRS_TO_REMOVE.forEach((attribute) => {
        if (node.hasAttribute(attribute)) {
          node.removeAttribute(attribute);
        }
      });

      const expectedText = node.getAttribute(TEXT_ATTR);
      if (expectedText !== null && node.textContent !== expectedText) {
        node.textContent = expectedText;
      }

      Array.from(node.childNodes).forEach(sanitizeNode);
      return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement;
      if (!parent) {
        return;
      }

      const expectedText = parent.getAttribute(TEXT_ATTR);
      if (expectedText !== null && parent.textContent !== expectedText) {
        parent.textContent = expectedText;
      }
    }
  };

  const root = document.documentElement;
  sanitizeNode(root);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        const target = mutation.target;
        if (ATTRS_TO_REMOVE.includes(mutation.attributeName)) {
          target.removeAttribute(mutation.attributeName);
          const expectedText = target.getAttribute(TEXT_ATTR);
          if (expectedText !== null && target.textContent !== expectedText) {
            target.textContent = expectedText;
          }
        }
      }

      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((addedNode) => {
          sanitizeNode(addedNode);
        });
      }
    });
  });

  observer.observe(root, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ATTRS_TO_REMOVE
  });

  window.addEventListener("beforeunload", () => observer.disconnect());
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script id="extension-sanitizer" strategy="beforeInteractive">
        {extensionSanitizerScript}
      </Script>
      <body className={`${font.className} bg-slate-50 text-slate-800 antialiased`}>
        <NextTopLoader showSpinner={false} color="#6366f1" height={3} />

        <div className="min-h-screen flex flex-col">
          <header className="backdrop-blur-sm bg-white/80 border-b border-slate-100 sticky top-0 z-40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" title="Home">
                <div
                  data-expected-text="LTT"
                  className="size-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold"
                >
                  LTT
                </div>
                <span className="font-medium text-lg text-slate-800">TTAI Email</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <Link href="/api" title="API Documentation">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    API
                  </Button>
                </Link>
                <a 
                  href="https://t.me/Lethanhtai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Telegram"
                >
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    Telegram
                  </Button>
                </a>
              </div>
            </div>
          </header>
          
          <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
            {children}
          </main>
          
          <footer className="border-t border-slate-100 py-8 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    data-expected-text="LTT"
                    className="size-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs"
                  >
                    LTT
                  </div>
                  <span className="text-slate-600">TTAI Email</span>
                </div>
                
                <div className="text-center md:text-right">
                  <p className="text-sm text-slate-500">
                    Author <a href="https://t.me/Lethanhtai" className="text-indigo-600 hover:underline">Lethanhtai</a>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    © {new Date().getFullYear()} TTAI Email - All rights reserved
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
