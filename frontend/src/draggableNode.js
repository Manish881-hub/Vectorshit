// draggableNode.js

export const DraggableNode = ({ type, label, icon, description }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`vs-palette-item vs-palette-${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
        <span className="vs-palette-icon">{icon}</span>
        <span className="vs-palette-text">
          <span className="vs-palette-label">{label}</span>
          <span className="vs-palette-desc">{description}</span>
        </span>
      </div>
    );
  };
