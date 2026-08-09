// submit.js

import { useState } from 'react';
import { useStore } from './store';

const BACKEND_URL = 'http://localhost:8000/pipelines/parse';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [status, setStatus] = useState('idle');

  const handleSubmit = async () => {
    if (!nodes.length) {
      alert('Your pipeline is empty. Drag some nodes onto the canvas first.');
      return;
    }

    setStatus('loading');
    try {
      const pipeline = JSON.stringify({ nodes, edges });
      const formData = new FormData();
      formData.append('pipeline', pipeline);

      const response = await fetch(BACKEND_URL, { method: 'POST', body: formData });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const { num_nodes, num_edges, is_dag } = await response.json();
      setStatus('success');
      alert(
        `Pipeline analysis complete\n\n` +
          `• Nodes: ${num_nodes}\n` +
          `• Edges: ${num_edges}\n` +
          `• Directed acyclic graph (DAG): ${is_dag ? 'Yes ✅' : 'No ❌'}\n\n` +
          `Your pipeline ${is_dag ? 'is' : 'is NOT'} a valid DAG, so it ${
            is_dag ? 'can' : 'cannot'
          } be executed topologically.`
      );
    } catch (error) {
      setStatus('error');
      alert(`Could not reach the backend at ${BACKEND_URL}.\n\n${error.message}`);
    }
  };

  const statusText = {
    idle: null,
    loading: 'Submitting pipeline…',
    success: 'Pipeline analyzed ✓',
    error: 'Backend unreachable ✗',
  }[status];

  return (
    <div className="vs-footer">
      <span className={`vs-status vs-status-${status}`}>{statusText ?? ''}</span>
      <button
        type="submit"
        className="vs-submit-btn"
        onClick={handleSubmit}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Submitting…' : 'Submit'}
      </button>
    </div>
  );
}
