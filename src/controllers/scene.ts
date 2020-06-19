import { Request, Response } from 'express';

import Achievement from '../models/achievment';
import Activity from '../models/activity';
import Adventure from '../models/adventure';
import { error404 } from './errors';
import Scene from '../models/scene';
import { SceneData } from './page-data';

// Каждый контроллер (controller) обычно экспортирует
// несколько функций-действий (actions)
export async function getSceneById(req: Request, res: Response): Promise<void> {

    const scene = await Scene.findByPk(Number(req.params.id), {
        attributes: ['img', 'description', 'angleId', 'adventureId'],
        include: [
            {
                model: Activity,
                attributes: ['nextSceneId', 'name']
            },
            {
                model: Achievement,
                attributes: ['img', 'name']
            }
        ]
    });

    if (!scene) {
        return error404(req, res);
    }

    const adventure = await Adventure.findByPk(scene.adventureId, {
        attributes: ['sceneId']
    });

    if (!adventure) {
        return error404(req, res);
    }

    // Объединяем данные специфичные для контроллера с общими данными
    const data: SceneData = {
        ...req.locals,
        scene,
        id: adventure.sceneId,
        gettingAchievement: 'Достижение получено',
        restart: 'Начать заново'
    };

    res.render('scene', data);
}
