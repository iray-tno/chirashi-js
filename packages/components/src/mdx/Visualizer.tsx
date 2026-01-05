import React from 'react';

export interface VisualizerProps {
  type: 'bubble-sort' | 'quick-sort' | 'merge-sort' | 'binary-tree';
  data?: number[];
  speed?: number;
}

/**
 * Algorithm Visualizer Component (Placeholder)
 *
 * To be implemented in future phases with actual visualization logic.
 *
 * @example
 * ```tsx
 * <Visualizer type="bubble-sort" data={[5, 2, 8, 1, 9]} speed={500} />
 * ```
 */
export const Visualizer: React.FC<VisualizerProps> = ({
  type,
  data,
  speed,
}) => {
  return (
    <div
      style={{
        padding: '1rem',
        border: '1px dashed #ccc',
        borderRadius: '4px',
      }}
    >
      <p>
        <strong>Visualizer Placeholder</strong>
      </p>
      <p>Type: {type}</p>
      {data && <p>Data: [{data.join(', ')}]</p>}
      {speed && <p>Speed: {speed}ms</p>}
      <p>
        <em>Visualization will be implemented in future phases.</em>
      </p>
    </div>
  );
};
