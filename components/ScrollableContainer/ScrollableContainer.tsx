import './ScrollableContainer.css';

type ScrollableContainerProps = {
    children: React.ReactNode;
};

export default function ScrollableContainer({
    children,
}: ScrollableContainerProps) {
    return (
        <div className="scrollable-container">
            {children}
        </div>
    );
}