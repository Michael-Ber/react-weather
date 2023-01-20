import './tooltip.scss';

const Tooltip = ({title, show, coord: [top, left]}) => {
    const styleObject = {
        position: 'absolute',
        top: top,
        left: left,
        padding: '10px',
        backgroundColor: '#ffffff',
        color: '#000000',
        zIndex: '1000'
    };
    const content = show ? <div style={{styleObject}} className="tooltip">{title}</div> : null;
    return (
        <>
            {content}
        </>
        
    )
};
export default Tooltip;
