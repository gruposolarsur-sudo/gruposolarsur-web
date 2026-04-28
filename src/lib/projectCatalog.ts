import {
  projectServiceGroups,
  type ProjectServiceKey,
} from "@/data/projectServices";
import type { ProjectStory } from "@/data/projectStories";
import { projectStories } from "@/data/projectStories";

export function getPrimaryProjectServiceKey(
  project: Pick<ProjectStory, "serviceKeys">,
): ProjectServiceKey | undefined {
  return project.serviceKeys?.[0];
}

export function getProjectServiceByKey(key: ProjectServiceKey) {
  return projectServiceGroups.find((service) => service.key === key);
}

export function getProjectServiceBySlug(slug: string) {
  return projectServiceGroups.find((service) => service.slug === slug);
}

export function getProjectHref(
  project: Pick<ProjectStory, "slug" | "serviceKeys">,
): string {
  const primaryServiceKey = getPrimaryProjectServiceKey(project);
  const service = primaryServiceKey
    ? getProjectServiceByKey(primaryServiceKey)
    : undefined;

  if (!service) {
    return `/proyectos#${project.slug}`;
  }

  return `${service.href}#${project.slug}`;
}

export function getProjectsByPrimaryService(key: ProjectServiceKey) {
  return projectStories.filter((project) => getPrimaryProjectServiceKey(project) === key);
}

export function getProjectCategoryGroups() {
  return projectServiceGroups.map((service) => ({
    ...service,
    projects: getProjectsByPrimaryService(service.key),
  }));
}
