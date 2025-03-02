export interface Project {
    id: number;
    title: string;
    description: string;
    implementationDetails: string;
    duration: string;
    used_tech: string[];
    image?: string;
    animatedLineImage: string;
    techIcons: string[];
    repoLink: string;
    liveDemo: string;
}
