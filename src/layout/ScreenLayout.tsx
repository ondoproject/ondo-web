import { cn } from "@/utils";
import { Header } from "../components/common";

interface ScreenLayoutProps {
  children: React.ReactNode;
}

const ScreenLayout = ({ children }: ScreenLayoutProps) => {
  return (
    <div className={cn(
          "max-w-[430px] mx-auto h-[calc(var(--vh)*100)] min-h-screen",
          "bg-[var(--bg-primary)] relative",
    )}>
        <Header />
        
        {children}
    </div>
  );
};

export default ScreenLayout;