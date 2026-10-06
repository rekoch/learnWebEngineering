import ToggleButton from "./ToggleButton";

type LikeSectionProps = {
  liked: boolean;
  count: number;
  onToggle: () => void;
  disabled?: boolean;
};

export default function LikeSection({ liked, count, onToggle, disabled }: LikeSectionProps) {
  return (
    <section className="mt-xl mb-xxl text-center" aria-label="Beitrag liken">
      <ToggleButton
        active={liked}
        activeText="Dieser Beitrag gefällt mir nicht mehr"
        inactiveText="Dieser Beitrag gefällt mir!"
        onToggle={onToggle}
        disabled={disabled}
        className="mb-s font-small align-items-center text-center"
      />
      <p className="mt-0 mb-m font-small" aria-live="polite">
        <span>{count}</span> Personen gefällt dieser Beitrag
      </p>
    </section>
  );
}