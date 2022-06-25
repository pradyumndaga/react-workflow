import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

function LeadNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="lead-node">
            {data.label}
            <Handle type="source" position={Position.Bottom} id="c" />
            <Handle type="source" position={Position.Right} id="b" />
        </div>
    );
}

export default LeadNode;