"use client";

import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
} from "./ui/terminal/terminal";

export function TerminalDemo() {
  return (
    <Terminal className="w-full max-w-2xl bg-black/90">
      <TypingAnimation>&gt; connect --wallet metamask</TypingAnimation>
      <AnimatedSpan delay={1500} className="text-green-500">
        <span>✔ MetaMask detected</span>
      </AnimatedSpan>
      <AnimatedSpan delay={2000} className="text-green-500">
        <span>✔ Wallet connected: 0x7...4d3e</span>
      </AnimatedSpan>
      <AnimatedSpan delay={2500} className="text-yellow-500">
        <span>⚠ Age verification required</span>
      </AnimatedSpan>
      <TypingAnimation delay={3000}>
        &gt; verify --age 18+ --region JHB
      </TypingAnimation>
      <AnimatedSpan delay={4000} className="text-green-500">
        <span>✔ Age verification successful</span>
      </AnimatedSpan>
      <TypingAnimation delay={4500}>
        &gt; browse --category flowers
      </TypingAnimation>
      <AnimatedSpan delay={5000} className="text-blue-500">
        <span>ℹ Available products:</span>
        <span className="pl-2 block">- Indoor (Premium) | 7g | $80</span>
        <span className="pl-2 block">- Greenhouse | 7g | $75</span>
        <span className="pl-2 block">- Indoor | 7g | $70</span>
      </AnimatedSpan>
      <TypingAnimation delay={6000}>
        &gt; add --product "Indoor" --amount 7g
      </TypingAnimation>
      <AnimatedSpan delay={6500} className="text-green-500">
        <span>✔ Added to cart: Indoor (7g)</span>
      </AnimatedSpan>
      <TypingAnimation delay={7000}>&gt; cart --view</TypingAnimation>
      <AnimatedSpan delay={7500} className="text-blue-500">
        <span>Cart contents:</span>
        <span className="pl-2 block">1. Indoor (Premium) - 7g</span>
        <span className="pl-2 block">Total: 0.04 ETH ($80.00)</span>
      </AnimatedSpan>
      <TypingAnimation delay={8000}>&gt; checkout --method eth</TypingAnimation>
      <AnimatedSpan delay={8500} className="text-yellow-500">
        <span>⚠ Confirm transaction in MetaMask</span>
      </AnimatedSpan>
      <AnimatedSpan delay={9000} className="text-green-500">
        <span>✔ Transaction confirmed</span>
        <span className="pl-2 block">TX Hash: 0x3...8f2a</span>
      </AnimatedSpan>
      <TypingAnimation delay={9500} className="text-green-400">
        Success! Your order has been processed.
      </TypingAnimation>
      <TypingAnimation delay={10000} className="text-muted-foreground">
        Estimated delivery: 2-3 business days
      </TypingAnimation>
    </Terminal>
  );
}
