interface ExploreMenuTabProps {
    menu: string; 
    onSelect: (menu: string) => void;
}

export const ExploreMenuTab = ({menu, onSelect}: ExploreMenuTabProps) => {
    return (
        <div onClick={() => onSelect(menu)}>
            <p>{menu}</p>
        </div>
    );
};

export default ExploreMenuTab;