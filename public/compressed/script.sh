#!/bin/bash

# Clean up old files
rm -f /Users/gobinath/study/Butter-mv/public/compressed/part_*.mp4

INPUT="/Users/gobinath/study/Butter-mv/public/movies/spider-man-brand-new-day.mkv"
OUTPUT="/Users/gobinath/study/Butter-mv/public/compressed"

mkdir -p "$OUTPUT"

# Movie duration is ~8183 seconds (2h 16m)
# Split into 30 GitHub-compliant 720p HD parts (~15 MB per part)
PART=273

for i in $(seq 0 29); do
    START=$((i * PART))
    echo "Encoding Part $i (Start: ${START}s)..."
    ffmpeg -y -ss "$START" -i "$INPUT" -t "$PART" -c:v libx264 -s 1280x720 -crf 30 -preset ultrafast -c:a aac -b:a 64k "$OUTPUT/part_$i.mp4"
done

echo "All 30 GitHub-compliant parts successfully created!"