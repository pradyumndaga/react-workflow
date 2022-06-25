import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { top: 20 };
function ActionNode() {

  return (
    <div className="action-node">
      <Handle type="target" position={Position.Top} />
      <h4>Instant Actions</h4>
      <pre><b>Email Notifications</b>
      <br></br>
      Welcome Email</pre>
      <hr></hr>
      <div className="action-button">+ Action</div>
      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  );
}

export default ActionNode;