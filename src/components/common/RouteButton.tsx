import { Location } from "@/types";
import { navigateLocate } from "@/utils/route";
import { MoveRight } from "lucide-react";

interface RouteButtonProps {
  location: Location;
}

const RouteButton = ({ location }: RouteButtonProps) => {
    return (
        <div 
            className="flex flex-row items-center gap-1 hover:scale-105 cursor-pointer"
            onClick={() => navigateLocate(location)}
        >
            Directions <MoveRight size={12}/>
        </div>
    )
};

export default RouteButton;