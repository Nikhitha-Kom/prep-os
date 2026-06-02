function StatusPill({ status }: { status: string }) {
  const colors: Record<string, { bg: string; fg: string }> = {
    applied: { bg: "#2D3748", fg: "#CBD5E1" },
    screen: { bg: "#1E3A5F", fg: "#93C5FD" },
    tech: { bg: "#4A2F0B", fg: "#FBBF24" },
    onsite: { bg: "#3B1F5E", fg: "#C4B5FD" },
    offer: { bg: "#14532D", fg: "#86EFAC" },
    rejected: { bg: "#5A1F1F", fg: "#FCA5A5" },
  };
  const c = colors[status] || colors.applied;
  return (
    <span
      style={{
        background: c.bg,
        color: c.fg,
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 14,
      }}
    >
      {status}
    </span>
  );
}

export default StatusPill;
