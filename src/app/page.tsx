import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <ThemeToggler />
      <h1>Kire motin</h1>
      <Button>Pok</Button>
    </div>
  );
}
