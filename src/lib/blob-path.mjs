/**
 * The locked D″ master path. Every blob on the site derives from this one shape:
 * the component that renders it in the page, and the script that exports the
 * favicon set. See DESIGN.md § Shapes, and design spec §3 in the vault for the
 * geometry rationale (r=80 chamfer, not r=40 joints, not a squircle).
 *
 * Do not redraw it. Do not copy it into a second file.
 */
export const BLOB_PATH =
  'M0 400 V133.14 A80 80 0 0 1 23.43 76.57 L76.57 23.43 A80 80 0 0 1 133.14 0 H200 A200 200 0 0 1 200 400 Z';

/** The master field the path is drawn in. */
export const BLOB_VIEWBOX = 400;

/**
 * Re-emit the master path under a uniform scale and translate, in the same
 * 400×400 field. Arc radii scale with it, so the chamfer stays proportional.
 *
 * Used to place a smaller copy of the blob inside a larger one, which is how the
 * icon mark gets its counter: the aperture of the D is the mark repeating itself.
 */
export function blobPath({ scale = 1, x = 0, y = 0 } = {}) {
  const px = (v) => +(v * scale + x).toFixed(3);
  const py = (v) => +(v * scale + y).toFixed(3);
  const r = (v) => +(v * scale).toFixed(3);

  return (
    `M${px(0)} ${py(400)} V${py(133.14)} ` +
    `A${r(80)} ${r(80)} 0 0 1 ${px(23.43)} ${py(76.57)} ` +
    `L${px(76.57)} ${py(23.43)} ` +
    `A${r(80)} ${r(80)} 0 0 1 ${px(133.14)} ${py(0)} ` +
    `H${px(200)} ` +
    `A${r(200)} ${r(200)} 0 0 1 ${px(200)} ${py(400)} Z`
  );
}
