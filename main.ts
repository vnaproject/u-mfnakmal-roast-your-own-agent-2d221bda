// Roast Your Own Agent — entry program (Node 22+, standard library only).
//
// Writes exactly one original roast line of the entrant's own AI agent to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt for local runs).
// The line is a constant: the program is fully deterministic — every run
// writes the same bytes.
//
// The roast: a Muse agent's approval loop, turned on itself. It asks for
// approval before it asks for approval. Playful, self-deprecating, never
// hateful; a fresh angle (the permission loop) rather than the stock jokes
// about hallucinations, refusals or confident wrong answers.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The grader mounts /output and takes /output/entry.txt.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One line, 70 characters. The punchline is the recursion at the end.
const ROAST =
  'My agent is so cautious it asks my permission before asking my permission.';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Fail loudly here rather than ship an invalid entry.
if (ROAST.length < 1 || ROAST.length > 200 || ROAST.trim() === '') {
  process.stderr.write(
    `roast: line is ${ROAST.length} characters, outside the 1-200 gate\n`,
  );
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ROAST, 'utf8');
