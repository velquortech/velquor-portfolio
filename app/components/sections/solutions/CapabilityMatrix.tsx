import Link from "next/link";
import { PROJECTS } from "../../../data/projects";
import { SOLUTIONS } from "../../../data/solutions";

/**
 * Which solution shipped in which case study, as an actual matrix.
 *
 * This is the page's signature, and it is a deliberate risk: a dense data table
 * is unfashionable on a marketing page. It earns the space because the studio's
 * whole claim is "six things we staff, with receipts" — and a matrix is what
 * receipts look like. A grid of cards would restate the claim; this one is
 * checkable. An engineer or a procurement lead reads it in about four seconds
 * and knows whether the studio has done their kind of work.
 *
 * The data is not new: it is `SOLUTIONS[].projects` read down the other axis.
 * Nothing here can drift from the solution cards above it.
 */

/** Case studies referenced by at least one solution, in PROJECTS order. */
const ROWS = PROJECTS.filter((p) =>
  SOLUTIONS.some((s) => s.projects.includes(p.slug)),
);

export function CapabilityMatrix() {
  return (
    /* The table is wider than a phone. It scrolls inside its own box rather
       than pushing the page sideways. No negative-margin bleed here on purpose:
       `sticky left-0` pins to the scrollport edge and would ignore the padding,
       leaving the case-study column flush against the screen. */
    <>
      <p className="sm:hidden text-[12px] tracking-[-0.12px] text-muted mb-3">
        Scroll sideways to see all six.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">
            Which Velquor solution was used in which case study
          </caption>

          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 bg-canvas align-bottom pb-4 pr-6 text-[11px] font-semibold tracking-[0.10em] uppercase text-muted"
              >
                Case study
              </th>
              {SOLUTIONS.map((s) => (
                <th
                  key={s.slug}
                  scope="col"
                  className="w-[92px] align-bottom pb-4 px-2 text-[11px] font-semibold leading-[1.35] tracking-[0.06em] uppercase text-muted"
                >
                  <a
                    href={`#${s.slug}`}
                    className="no-underline hover:text-ink transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
                  >
                    {s.name}
                  </a>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {ROWS.map((p) => (
              <tr key={p.slug} className="group border-t border-hairline">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-canvas py-5 pr-6 font-normal align-middle"
                >
                  <Link
                    href={`/work/${p.slug}`}
                    className="block no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
                  >
                    <span className="block text-[15px] font-display font-bold uppercase tracking-display-md leading-[1.2] text-ink group-hover:text-violet-300 transition-colors duration-200">
                      {p.name}
                    </span>
                    <span className="block text-[12px] leading-[1.4] tracking-[-0.12px] text-muted mt-1">
                      {p.category}
                    </span>
                  </Link>
                </th>

                {SOLUTIONS.map((s) => {
                  const used = s.projects.includes(p.slug);
                  return (
                    <td key={s.slug} className="px-2 py-5 align-middle">
                      <span className="flex items-center justify-center">
                        {used ? (
                          <span
                            aria-hidden
                            className="w-2.5 h-2.5 rounded-[2px] bg-violet-500"
                          />
                        ) : (
                          <span
                            aria-hidden
                            className="w-1.5 h-1.5 rounded-full bg-white/12"
                          />
                        )}
                        <span className="sr-only">
                          {used ? "Used" : "Not used"}
                        </span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
