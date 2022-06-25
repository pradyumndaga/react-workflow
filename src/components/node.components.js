
import { useCallback } from 'react';
import React, { useState, Fragment } from 'react';
import ReactFlow, {
    addEdge,
    useNodesState,
    useEdgesState,
} from 'react-flow-renderer';
import DecisionNode from './decisionNode';
import LeadNode from './leadNode';
import ActionNode from './actionNode';
import ConditionNode from './conditionNode';

const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
}

const initialElements = [
    {
        id: '1',
        type: 'leadNode',
        data: {
            label: <h3>WHEN</h3>,
        },
        position: {
            x: 0,
            y: 0,
        }
    },
    {
        id: '2',
        type: 'output',
        style: {
            width: '50%',
            height: '10%',
        },
        data: {
            label: <div>This rule will be executed <b>when</b> a lead is <b>created</b> or is <b>edited</b> to meet the condition (if any).</div>,
        },
        targetPosition: 'left',
        position: {
            x: 300,
            y: 0,
        }
    }
]

const nodeType = { leadNode: LeadNode, decisionNode: DecisionNode, actionNode: ActionNode, conditionNode: ConditionNode };

const initialEdges = [];

const Node = () => {
    const [elements, setElements] = useNodesState(initialElements);
    const [dCount, setCount] = useState(0);
    const [edges, setEdges] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState(null);

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            console.log(JSON.stringify(flow));
            var request = new XMLHttpRequest();
            request.open('POST', '/my-worklist', true);
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            request.send(JSON.stringify(flow));
        }
    }, [rfInstance]);

    const AddNode = () => {
        setElements(e => e.concat([{
            id: (e.length + 1).toString(),
            type: 'decisionNode',
            data: {
                label: <h3>Condition ${dCount}</h3>,
            },
            position: {
                x: 0,
                y: e[e.length - 1].position.y + 150,
            },
        },
        {
            id: (e.length + 2).toString(),
            type: 'conditionNode',
            style: {
                width: '50%',
            },
            targetPosition: 'left',
            data: {
                label: <div>${dCount} Country is Japan</div>,
            },
            position: {
                x: 300,
                y: e[e.length - 1].position.y + 167,
            }
        },
        {
            id: (e.length + 3).toString(),
            type: 'actionNode',
            targetPosition: 'top',
            position: {
                x: 300,
                y: e[e.length - 1].position.y + 225,
            }
        },
        {
            id: (e.length + 4).toString(),
            style: {
                border: 'dashed',
                color: 'blue',
            },
            type: 'output',
            targetPosition: 'left',
            data: {
                label: <div>Scheduled Actions</div>,
            },
            position: {
                x: 500,
                y: e[e.length - 1].position.y + 225,
            },
        },
        ]),

        )
    }
    const IncrementCount = () => {
        setCount(dCount + 1);
    }

    const AddEdge = () => {
        setEdges(e => e.concat([{
            id: (e.length + 1).toString(),
            source: (elements.length < 3 ? 1 : elements.length - 3).toString(),
            target: (elements.length < 3 ? 3 : elements.length + 1).toString(),
            sourceHandle: 'c',
        }, {
            id: (e.length + 2).toString(),
            source: (e.length > 2 ? elements.length - 3 : 1).toString(),
            target: (e.length > 2 ? elements.length - 2 : 2).toString(),
            sourceHandle: 'b',
        }, {
            id: (e.length + 3).toString(),
            source: (e.length > 2 ? elements.length - 2 : 1).toString(),
            target: (e.length > 2 ? elements.length - 1 : 2).toString(),
            sourceHandle: 'b',
        },
        {
            id: (e.length + 4).toString(),
            source: (e.length > 2 ? elements.length - 1 : 1).toString(),
            target: (e.length > 2 ? elements.length : 2).toString(),
            sourceHandle: 'b',
        }]),
            IncrementCount(),
        )
    };
    return (
        <Fragment>
            <ReactFlow
                nodes={elements}
                edges={edges}
                onNodesChange={AddEdge}
                onLoad={onLoad}
                style={{ width: '100%', height: '80vh' }}
                nodeTypes={nodeType}
                onInit={setRfInstance}
            />
            <button onClick={(evt) => AddNode()}>Add a decision node</button>
            <button onClick={(evt) => onSave()}>Save</button>

        </Fragment>
    )
}

export default Node;