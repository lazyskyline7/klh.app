import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

type GitHubContentsResponse = {
  type: string;
  encoding?: string;
  content?: string;
  path?: string;
  sha?: string;
  message?: string;
};

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function coerceSchemaPath(jsonc: string): string {
  // Keep editor schema support working in this repo.
  return jsonc.replace(/("\$schema"\s*:\s*)"[^"]*"/, '$1"./data.schema.json"');
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch (err) {
    if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
}

async function main(): Promise<void> {
  const repo = getEnv('CONTENT_REPO'); // e.g. "owner/klh-content"
  const ref = getEnv('CONTENT_REF') ?? 'main';
  const filePath = getEnv('CONTENT_RESUME_PATH') ?? 'resume/data.jsonc';
  const outPath = 'src/data.jsonc';
  const token = getEnv('CONTENT_GITHUB_TOKEN');

  if (!repo) {
    const hasLocal = await fileExists(outPath);
    if (hasLocal) {
      console.info('[fetch:data] CONTENT_REPO not set; using local data.');
      return;
    }

    throw new Error(
      `[fetch:data] CONTENT_REPO not set and ${outPath} does not exist.\n` +
        'Set CONTENT_REPO/CONTENT_GITHUB_TOKEN and run `bun run fetch:data`.'
    );
  }

  if (!token) {
    throw new Error(
      '[fetch:data] Missing CONTENT_GITHUB_TOKEN. Required for private repos.'
    );
  }

  const url = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(filePath)}?ref=${encodeURIComponent(ref)}`;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'klh-app-build-fetch',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const bodyText = await res.text();
  if (!res.ok) {
    throw new Error(
      `[fetch:data] GitHub API request failed (${res.status} ${res.statusText}): ${bodyText}`
    );
  }

  const json = JSON.parse(bodyText) as GitHubContentsResponse;
  if (json.type !== 'file' || json.encoding !== 'base64' || !json.content) {
    throw new Error(
      `[fetch:data] Unexpected GitHub contents response for ${repo}/${filePath} @ ${ref}.`
    );
  }

  const decoded = Buffer.from(json.content, 'base64').toString('utf8');
  const finalJsonc = coerceSchemaPath(decoded);

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, finalJsonc, 'utf8');

  console.info(
    `[fetch:data] Wrote ${outPath} from ${repo}/${filePath} @ ${ref}.`
  );
}

await main();
