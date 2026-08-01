// Format runtime in minutes to '2h 15m'
export function formatRuntime(minutes) {
  if (!minutes) return 'N/A';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
}

// Format number of votes to K/M string (e.g. 245000 -> 245K)
export function formatVotes(votes) {
  if (!votes) return '0';
  if (typeof votes === 'string') return votes;
  if (votes >= 1000000) return (votes / 1000000).toFixed(1) + 'M';
  if (votes >= 1000) return (votes / 1000).toFixed(1) + 'K';
  return votes.toString();
}

// Format IMDb rating with one decimal point
export function formatRating(rating) {
  return typeof rating === 'number' ? rating.toFixed(1) : rating || 'N/A';
}

// Format speed (e.g. bytes/sec to MB/s)
export function formatSpeed(mbps) {
  return `${mbps.toFixed(1)} MB/s`;
}
