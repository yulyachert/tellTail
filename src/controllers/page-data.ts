import Adventure from '../models/adventure';
import Scene from '../models/scene';

interface PageData {
    meta: {
        charset: string;
        description: string;
    };
    title: string;
    staticBasePath: string;
}

export interface SceneData extends PageData {
    scene: Scene;
    id: number;
    gettingAchievement: string;
    restart: string;
}

export interface AdventureData extends PageData {
    adventures: Adventure[];
    reqTag?: string;
}
