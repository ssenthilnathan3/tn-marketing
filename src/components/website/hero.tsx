import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"

const marketingTerms = [
  "SEO", "PPC", "Content", "Social Media", "Email",
  "Analytics", "CRO", "Branding", "SEM", "Affiliate",
  "Influencer", "Video", "Mobile", "AI", "Automation"
]

interface BadgePosition {
  x: number
  y: number
  size: number
  opacity: number
}

export const Hero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["amazing", "new", "wonderful", "beautiful", "smart"], []);

  const badgePositions = useMemo(() => generateBadgePositions(marketingTerms.length), [])

  function generateBadgePositions(count: number): BadgePosition[] {
    const positions: BadgePosition[] = []
    const badgeSize = 100 // Base size for calculation
    const padding = 20

    for (let i = 0; i < count; i++) {
      let newPosition: BadgePosition
      let overlap: boolean

      do {
        newPosition = {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 10 + Math.floor(Math.random() * 10), // Random size between 14 and 23
          opacity: 0.1 + Math.random() * 0.3 // Random opacity between 0.1 and 0.4
        }

        overlap = positions.some(pos => 
          Math.abs(pos.x - newPosition.x) < (badgeSize + padding) / window.innerWidth * 100 &&
          Math.abs(pos.y - newPosition.y) < (badgeSize + padding) / window.innerHeight * 100
        )
      } while (overlap)

      positions.push(newPosition)
    }

    return positions
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 h-full w-full bg-dark bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      ></div>

      {marketingTerms.map((term, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{
            left: `${badgePositions[index].x}%`,
            top: `${badgePositions[index].y}%`,
            fontSize: `${badgePositions[index].size}px`,
            opacity: badgePositions[index].opacity,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        >
          <span className="bg-white bg-opacity-20 rounded-full px-3 py-1 font-medium">
            {term}
          </span>
        </div>
      ))}

      <div className="container relative z-10 mx-auto">
        <div className="flex gap-8 pt-20 lg:pt-20 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">This is something</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
