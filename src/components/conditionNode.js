import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 70 };

function ConditionNode({data}) {

    const onChange = useCallback((evt) => {
        data.label = evt.target.value;
        console.log(data);
      }, [])

  return (
    <div className="condition-node">
      <Handle type="target" position={Position.Left} />
      <div>
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} style={handleStyle}/>
    </div>
  );
}

export default ConditionNode;