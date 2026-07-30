import { DEFAULT_PROJECTS } from './projects';

const STORAGE_KEY = 'dcc-projects-v1';

function readExtras() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeExtras(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

/** Built-in showcase projects + anything saved from Admin (browser localStorage). */
export function getProjects() {
  const extras = readExtras();
  return [...extras, ...DEFAULT_PROJECTS].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

export function addProject(input) {
  const techStack = Array.isArray(input.techStack)
    ? input.techStack
    : String(input.techStack || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

  const project = {
    _id: `local-${Date.now()}`,
    title: input.title?.trim() || 'Untitled Project',
    description: input.description?.trim() || '',
    techStack,
    liveUrl: input.liveUrl?.trim() || '',
    githubUrl: input.githubUrl?.trim() || '',
    imageUrl: input.imageUrl?.trim() || '',
    createdAt: new Date().toISOString(),
  };

  const extras = readExtras();
  writeExtras([project, ...extras]);
  return project;
}

export function resetExtraProjects() {
  localStorage.removeItem(STORAGE_KEY);
}
