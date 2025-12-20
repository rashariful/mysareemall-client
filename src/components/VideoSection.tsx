"use client";

import { useEffect, useRef } from "react";
import { useGtmEvents } from "@/hooks/useGtmEvents";

const PRODUCT_NAME = "৫টি থ্রি-পিস সেট";
const PRODUCT_ID = "fixed-5pcs";
const UNIT_PRICE = 280; // per set

const VideoSection = () => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const { trackContentView } = useGtmEvents();

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // ✅ Fire content view event
            trackContentView({
              id: "fixed-5pcs",
              title: "৫টি থ্রি-পিস সেট",
              price: 280,
            });

            // ✅ Play video when visible
            videoRef.current?.contentWindow?.postMessage(
              JSON.stringify({
                event: "command",
                func: "playVideo",
              }),
              "*"
            );

            observer.disconnect(); // একবার fire হলে remove
          }
        });
      },
      { threshold: 0.5 } // 50% visible
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-primary/10 via-accent/5 to-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
            আমাদের প্রোডাক্ট <span className="text-primary">দেখুন</span>
          </h2>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-glow bg-muted ring-2 ring-accent/30">
            <iframe
              ref={videoRef}
              src="https://www.youtube.com/embed/GiJ41dLfPtk?enablejsapi=1&controls=1&mute=1&hl=bn"
                            // src="https://www.youtube.com/embed/-oFl4XpmytI?enablejsapi=1&controls=1&mute=0&hl=bn"

              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Product Video"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
