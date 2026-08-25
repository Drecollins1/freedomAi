import Image from "next/image";
import { testimonials } from "@/lib/content";

/**
 * The screenshots arrive at whatever size the sender's phone produced
 * (496×1080 through 998×1080), so a fixed-height grid would either crop them
 * or leave dead space around the narrow ones.
 *
 * CSS columns let each image keep its own aspect ratio and simply flow into
 * the shortest column — no cropping, no gaps, and no JavaScript.
 */
export function TestimonialWall() {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:balance]">
      {testimonials.gallery.map((shot, i) => (
        <figure
          key={shot.src}
          className="border-line bg-panel mb-4 break-inside-avoid overflow-hidden rounded-[14px] border"
        >
          <Image
            src={shot.src}
            alt={`${testimonials.imageAlt} (${i + 1} of ${testimonials.gallery.length})`}
            width={shot.width}
            height={shot.height}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
            className="h-auto w-full"
            priority={i < 2}
          />
        </figure>
      ))}
    </div>
  );
}
