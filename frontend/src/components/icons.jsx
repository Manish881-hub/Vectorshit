// icons.jsx
// Inline SVG icon set (stroke style, currentColor) used by the node
// palette and node headers.

const Icon = ({ children, className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    {children}
  </svg>
);

export const IconInput = () => (
  <Icon>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M4 21h16" />
  </Icon>
);

export const IconOutput = () => (
  <Icon>
    <path d="M12 15V3" />
    <path d="m7 8 5-5 5 5" />
    <path d="M4 21h16" />
  </Icon>
);

export const IconLLM = () => (
  <Icon>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    <path d="M19 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
  </Icon>
);

export const IconText = () => (
  <Icon>
    <path d="M4 6h16" />
    <path d="M4 12h10" />
    <path d="M4 18h13" />
  </Icon>
);

export const IconTransformer = () => (
  <Icon>
    <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
  </Icon>
);

export const IconMemory = () => (
  <Icon>
    <ellipse cx="12" cy="5" rx="7" ry="3" />
    <path d="M5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
    <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
  </Icon>
);

export const IconCode = () => (
  <Icon>
    <path d="m8 8-4 4 4 4" />
    <path d="m16 8 4 4-4 4" />
  </Icon>
);

export const IconTool = () => (
  <Icon>
    <path d="M4 21v-7" />
    <path d="M4 10V3" />
    <path d="M12 21v-9" />
    <path d="M12 8V3" />
    <path d="M20 21v-5" />
    <path d="M20 12V3" />
    <path d="M2 14h4" />
    <path d="M10 8h4" />
    <path d="M18 16h4" />
  </Icon>
);

export const IconImage = () => (
  <Icon>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="m5 19 5-6 3.5 4 3.5-4 4 5" />
  </Icon>
);

export const IconBrand = () => (
  <Icon className="vs-brand-mark">
    <path d="M12 3l7.5 5.5-7.5 5.5-7.5-5.5z" />
    <path d="M4.5 13.5 12 19l7.5-5.5" />
  </Icon>
);
