"use client";

// Force dynamic rendering to avoid prerendering issues
export const dynamic = "force-dynamic";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <style>{`
        @keyframes bounce-funny {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          10% {
            transform: translateY(-20px) rotate(-5deg) scale(1.1);
          }
          20% {
            transform: translateY(0) rotate(5deg) scale(1);
          }
          30% {
            transform: translateY(-15px) rotate(-3deg) scale(1.05);
          }
          40% {
            transform: translateY(0) rotate(3deg) scale(1);
          }
          50% {
            transform: translateY(-10px) rotate(-2deg) scale(1.02);
          }
          60% {
            transform: translateY(0) rotate(2deg) scale(1);
          }
          70% {
            transform: translateY(-5px) rotate(-1deg) scale(1.01);
          }
          80% {
            transform: translateY(0) rotate(1deg) scale(1);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) rotate(-2deg); }
          20%, 40%, 60%, 80% { transform: translateX(10px) rotate(2deg); }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(-10px) rotate(-5deg);
          }
        }

        @keyframes rainbow {
          0% { color: #ff0000; }
          16.66% { color: #ff7f00; }
          33.33% { color: #ffff00; }
          50% { color: #00ff00; }
          66.66% { color: #0000ff; }
          83.33% { color: #4b0082; }
          100% { color: #9400d3; }
        }

        @keyframes spin-funny {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.2); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes pulse-glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(0, 122, 255, 0.5),
                         0 0 20px rgba(0, 122, 255, 0.3),
                         0 0 30px rgba(0, 122, 255, 0.2);
          }
          50% {
            text-shadow: 0 0 20px rgba(0, 122, 255, 0.8),
                         0 0 30px rgba(0, 122, 255, 0.6),
                         0 0 40px rgba(0, 122, 255, 0.4);
          }
        }

        .funny-404 {
          animation: bounce-funny 2s ease-in-out infinite,
                     rainbow 3s linear infinite,
                     pulse-glow 2s ease-in-out infinite;
          display: inline-block;
          cursor: pointer;
          transition: transform 0.1s;
        }

        .funny-404:hover {
          animation: shake 0.5s ease-in-out infinite,
                     rainbow 1s linear infinite,
                     pulse-glow 0.5s ease-in-out infinite;
        }

        .floating-emoji {
          position: absolute;
          font-size: 2rem;
          animation: float 3s ease-in-out infinite;
          pointer-events: none;
          opacity: 0.7;
        }

        .emoji-1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .emoji-2 {
          top: 20%;
          right: 15%;
          animation-delay: 1s;
        }

        .emoji-3 {
          bottom: 30%;
          left: 20%;
          animation-delay: 2s;
        }

        .emoji-4 {
          bottom: 20%;
          right: 10%;
          animation-delay: 1.5s;
        }

        .emoji-5 {
          top: 50%;
          left: 5%;
          animation-delay: 0.5s;
        }

        .emoji-6 {
          top: 60%;
          right: 5%;
          animation-delay: 2.5s;
        }

        .shaking-text {
          animation: shake 0.5s ease-in-out infinite;
          display: inline-block;
        }

        .button-bounce {
          transition: transform 0.2s;
        }

        .button-bounce:hover {
          animation: bounce-funny 0.6s ease-in-out;
        }
      `}</style>

      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Floating emojis */}
        <div className="floating-emoji emoji-1">🤷</div>
        <div className="floating-emoji emoji-2">😅</div>
        <div className="floating-emoji emoji-3">🔍</div>
        <div className="floating-emoji emoji-4">💫</div>
        <div className="floating-emoji emoji-5">🌌</div>
        <div className="floating-emoji emoji-6">✨</div>

        <div className="text-center space-y-6 max-w-md relative z-10">
          <h1 className="funny-404 text-6xl font-bold text-foreground">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-foreground shaking-text">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
            <br />
            <span className="text-sm">(Maybe it went on vacation? 🏖️)</span>
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button
              asChild
              className="rounded-2xl bg-[#007AFF] text-white hover:bg-[#0056CC] button-bounce"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl button-bounce"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

