// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeRegistry } from './nodes';
import { IconBrand } from './components/icons';

export const PipelineToolbar = () => {
    return (
        <div className="vs-toolbar">
            <div className="vs-toolbar-head">
                <div className="vs-brand">
                    <IconBrand />
                    <span className="vs-brand-name">VectorShift</span>
                </div>
                <span className="vs-brand-sub">Pipeline Builder</span>
            </div>
            <div className="vs-palette">
                {nodeRegistry.map(({ type, label, icon, description }) => (
                    <DraggableNode
                        key={type}
                        type={type}
                        label={label}
                        icon={icon}
                        description={description}
                    />
                ))}
            </div>
        </div>
    );
};
