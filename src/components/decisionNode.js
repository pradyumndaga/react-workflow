import { Handle, Position } from 'react-flow-renderer';

function DecisionNode({ data }) {

    return (
        <div className="decision-node">
            <Handle type="target" position={Position.Top} />
            {data.label}
            <Handle type="source" position={Position.Right} id="b" />
            <Handle type="source" position={Position.Bottom} id="c" />
        </div>
    );
}

export default DecisionNode;