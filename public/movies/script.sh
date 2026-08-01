#!/bin/bash

# Clean up any failed large files first to free disk space
rm -f /Users/gobinath/study/Butter-mv/public/compressed/part_*.mp4

INPUT="/Users/gobinath/study/Butter-mv/public/movies/spider-man-brand-new-day.mkv"
OUTPUT="/Users/gobinath/study/Butter-mv/public/compressed"

mkdir -p "$OUTPUT"

# Movie duration is ~8183 seconds (2h 16m)
# Split into 30 small web-compressed parts (~15 MB each)
PART=273

for i in $(seq 0 29); do
    START=$((i * PART))
    echo "Encoding Part $i (Start: ${START}s)..."
    ffmpeg -y -ss "$START" -i "$INPUT" -t "$PART" -c:v libx264 -crf 32 -preset ultrafast -c:a aac -b:a 64k "$OUTPUT/part_$i.mp4"
done

echo "All 30 parts successfully created!"