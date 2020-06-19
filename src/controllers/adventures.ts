import Sequelize, { Op } from 'sequelize';
import { Request, Response } from 'express';

import Adventure from '../models/adventure';
import { AdventureData } from './page-data';
import { error404 } from './errors';
import Tag from '../models/tags';

// Каждый контроллер (controller) обычно экспортирует
// несколько функций-действий (actions)
export async function getAdventures(limit?: number, offset?: number): Promise<Adventure[]> {
    return (await Adventure.findAll({
        attributes: ['id', 'name', 'img', 'description', 'sceneId'],
        where: {
            sceneId: {
                [Op.not]: null
            }
        },
        limit,
        offset,
        include: [
            {
                model: Tag,
                attributes: ['engName', 'ruName']
            }
        ]
    }));
}

export async function getListOfAdventures(req: Request, res: Response): Promise<void> {
    const adventures = await getAdventures(5);

    if (!adventures) {
        return error404(req, res);
    }

    // Объединяем данные специфичные для контроллера с общими данными
    const data: AdventureData = {
        ...req.locals,
        adventures
    };

    res.render('index', data);
}

export async function getStaticBasePath(req: Request, res: Response): Promise<void> {
    const { staticBasePath } = req.locals;

    res.send( {
        staticBasePath
    });
}

export async function getJsonOfAdventures(req: Request, res: Response): Promise<void> {
    let numberLimit ;
    let numberOffset;

    if (req.query.limit !== undefined) {
        numberLimit = Number(req.query.limit);
    }

    if (req.query.offset !== undefined) {
        numberOffset = Number(req.query.offset);
    }

    const adventures = await getAdventures(numberLimit, numberOffset);

    res.send(adventures);
}

export async function getListOfAdventuresByTag(reqTag: string): Promise<Adventure[]>{
    const adventures = (await Adventure.findAll({
        attributes: ['id', 'name', 'img', 'description', 'sceneId'],
        where: {
            sceneId: {
                [Op.not]: null
            }
        },
        order: Sequelize.col('id'),
        include: [
            {
                model: Tag,
                attributes: ['engName'],
                where: {
                    engName: reqTag
                }
            }
        ]
    })).map((adventure) => adventure.id);

    return (await Adventure.findAll({
        where: {
            id: {
                [Op.in]: adventures
            }
        },
        include: [
            {
                model: Tag,
                attributes: ['ruName', 'engName']
            }
        ]
    }));
}

export async function getAdventureByTag(req: Request, res: Response): Promise<void> {
    const reqTag = req.params.tag;
    const filteredAdventures = await getListOfAdventuresByTag(reqTag);

    if (!filteredAdventures) {
        return error404(req, res);
    }

    const ruReqTag = filteredAdventures[0].tags.find(tag => tag.engName === reqTag)?.ruName;

    // Объединяем данные специфичные для контроллера с общими данными
    const data: AdventureData = {
        ...req.locals,
        adventures: filteredAdventures,
        reqTag: ruReqTag
    };

    res.render('tags', data);
}

export async function getJsonOfAdventuresByTag(req: Request, res: Response): Promise<void> {
    const adventuresByTag = await getListOfAdventuresByTag(String(req.query.tag));

    res.send(adventuresByTag);
}
