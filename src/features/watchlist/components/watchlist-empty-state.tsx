import { StateCard } from "@/components/ui/state-card";

type WatchlistEmptyStateProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  onPressCta?: () => void;
};

export function WatchlistEmptyState({
  title,
  description,
  ctaLabel,
  onPressCta,
}: WatchlistEmptyStateProps) {
  return (
    <StateCard
      title={title}
      description={description}
      ctaLabel={ctaLabel}
      onPressCta={onPressCta}
    />
  );
}
