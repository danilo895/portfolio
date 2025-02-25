export interface Project {
    id: number;
    title: string;
    description: string;
    descriptionLong: string;
    implementationDetails: string;
    duration: string;
    used_tech: string[];
    image: string;
    animatedLineImage: string;
    techIcons: string[];
    repoLink: string;
    liveDemo: string;
    nextProjectId: number;
}