// BaseNode.js
// ---------------------------------------------------------------------
// Config-driven node abstraction. Every node in the pipeline is defined
// by a declarative config object and rendered by this single generic
// component, so new node types are ~20 lines of config instead of a
// copy-pasted component.
//
// Config schema:
//   {
//     label:        'LLM',                       // header title
//     icon:         <IconComponent>,              // header icon (SVG component)
//     accent:       'llm',                       // CSS class suffix -> accent color
//     width/height: number,                      // static size (used unless dynamicSize)
//     description:  'string',                    // optional body text
//     fields: [{ name, label, type: 'text'|'textarea'|'select', options, default, placeholder, rows }],
//     handles: [{ type: 'target'|'source', position: 'left'|'right'|'top'|'bottom', id, label, chip? }],
//     getDynamicHandles: (values) => [...],      // optional, e.g. {{variables}} in Text node
//     dynamicSize: (values) => ({width, height}) // optional, auto-resizing
//     render: ({ id, data, values, setValue })   // optional custom body content
//   }
// ---------------------------------------------------------------------

import { useState, useMemo, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const POSITIONS = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const Field = ({ field, value, onChange }) => {
  switch (field.type) {
    case 'select':
      return (
        <select className="vs-field-control" value={value} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    case 'textarea':
      return (
        <textarea
          className="vs-field-control"
          rows={field.rows ?? 2}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    default:
      return (
        <input
          className="vs-field-control"
          type="text"
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};

export const BaseNode = ({ id, data, config }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const pruneEdges = useStore((s) => s.pruneEdges);

  const [values, setValues] = useState(() => {
    const init = {};
    for (const field of config.fields || []) {
      const def =
        typeof field.default === 'function' ? field.default(id, data) : field.default ?? '';
      init[field.name] = data?.[field.name] ?? def;
    }
    return init;
  });

  const lastDataRef = useRef(data);

  useEffect(() => {
    if (lastDataRef.current === data) return;
    lastDataRef.current = data;
    setValues((prev) => {
      let next = prev;
      for (const field of config.fields || []) {
        const incoming = data?.[field.name];
        if (incoming !== undefined && incoming !== next[field.name]) {
          if (next === prev) next = { ...prev };
          next[field.name] = incoming;
        }
      }
      return next;
    });
  }, [data, config]);

  const setValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    updateNodeField(id, name, value);
  };

  const dynamicHandles = useMemo(
    () => config.getDynamicHandles?.(values) ?? [],
    [config, values]
  );

  const handles = useMemo(() => {
    const all = [...(config.handles || []), ...dynamicHandles];
    const bySide = { left: [], right: [], top: [], bottom: [] };
    all.forEach((h) => bySide[h.position || 'left'].push(h));
    Object.keys(bySide).forEach((side) => {
      const count = bySide[side].length;
      bySide[side].forEach((h, i) => {
        h._offset = `${((i + 1) / (count + 1)) * 100}%`;
      });
    });
    return all;
  }, [config, dynamicHandles]);

  const handleIds = useMemo(() => handles.map((h) => h.id), [handles]);
  const prevHandleIdsRef = useRef(null);

  useEffect(() => {
    const prev = prevHandleIdsRef.current;
    if (
      prev &&
      (prev.length !== handleIds.length || prev.some((id, i) => id !== handleIds[i]))
    ) {
      pruneEdges(id, handleIds);
    }
    prevHandleIdsRef.current = handleIds;
  }, [handleIds, id, pruneEdges]);

  const size = useMemo(() => {
    if (config.dynamicSize) return config.dynamicSize(values);
    return { width: config.width ?? 220, height: config.height ?? 90 };
  }, [config, values]);

  return (
    <div
      className={`vs-node vs-node-${config.accent ?? 'default'}`}
      style={{ width: size.width, height: size.height }}
    >
      <div className="vs-node-header">
        <span className="vs-node-icon">
          {typeof config.icon === 'function' ? <config.icon /> : config.icon}
        </span>
        <span className="vs-node-title">{config.label}</span>
        <span className="vs-node-type">{config.type}</span>
      </div>

      <div className="vs-node-body">
        {config.render ? config.render({ id, data, values, setValue }) : null}
        {config.description ? <p className="vs-node-desc">{config.description}</p> : null}
        {(config.fields || []).map((field) => (
          <label
            className={`vs-field${field.type === 'textarea' ? ' vs-field-textarea' : ''}`}
            key={field.name}
          >
            <span className="vs-field-label">{field.label}</span>
            <Field field={field} value={values[field.name] ?? ''} onChange={(v) => setValue(field.name, v)} />
          </label>
        ))}
      </div>

      {handles.map((handle) => (
        <Handle
          key={`${id}-${handle.id}`}
          type={handle.type}
          position={POSITIONS[handle.position] ?? Position.Left}
          id={`${id}-${handle.id}`}
          title={handle.label}
          style={handle.position === 'top' || handle.position === 'bottom' ? { left: handle._offset } : { top: handle._offset }}
        />
      ))}

      {handles
        .filter((h) => h.chip !== false)
        .map((h) => (
          <span
            key={`chip-${h.id}`}
            className={`vs-handle-chip vs-chip-${h.position ?? 'left'}`}
            style={
              h.position === 'top' || h.position === 'bottom'
                ? { left: h._offset }
                : { top: h._offset }
            }
          >
            {h.label}
          </span>
        ))}
    </div>
  );
};
