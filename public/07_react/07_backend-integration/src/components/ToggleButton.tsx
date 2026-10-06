type ToggleButtonProps = {
  active: boolean;
  activeText: string;
  inactiveText: string;
  onToggle: () => void;
  disabled?: boolean;
  className?: string;
};

export default function ToggleButton({
  active, activeText, inactiveText, onToggle, disabled = false, className = "",
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      className={`${className} ${active ? "" : "primary"}`}
      onClick={onToggle}
    >
      {active ? activeText : inactiveText}
    </button>
  );
}