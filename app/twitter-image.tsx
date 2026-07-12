// The Twitter card image is identical to the Open Graph one — re-export it
// so the design only lives in one place. No `runtime` here: segment config
// can't be combined with re-exports (Next's static analysis rejects it), and
// ImageResponse works fine on the default Node runtime.
export { default, alt, size, contentType } from "./opengraph-image";
