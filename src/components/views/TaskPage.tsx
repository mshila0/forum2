import React from 'react';
import { useParams } from 'react-router-dom';

function TaskPage() {
    const {id} = useParams();
    return <>
        <h3>Task</h3>
        ID = {id}
    </>;
}

export default TaskPage;