/* example: { "id": 2, "type": "lesson", "title": "Update cr(U)d worked!", "content": { "topics": [ "HTML tags", "Document structure", "Semantic HTML" ], "content": { "type": "text", "data": "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser." } } } */
/**
 * @swagger
 * /update:
 *   put:
 *     summary: Update a lesson, module, or course
 *     description: Update the details of a lesson, module, or course based on the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { "id": 2, "type": "lesson", "title": "Update cr(U)d worked!", "content": { "topics": [ "HTML tags", "Document structure", "Semantic HTML" ], "content": { "type": "text", "data": "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser." } } }
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Lesson with id 2 successful
 *       401:
 *         description: Update failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Update failed, no lesson with id 2
 *       498:
 *         description: No ID recognized for type request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 498
 *                 message:
 *                   type: string
 *                   example: No ID recognize for type request undefined, type not provided
 *       420:
 *         description: Invalid update request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 420
 *                 message:
 *                   type: string
 *                   example: Invalid update request
 */

// cr(U)d
import * as customData from './dataCustomTypes';

import fs from 'fs';

interface result {
    status: number,
    message: string,
}

function checkLessonId(id: number[]): boolean {
    let rawdata: string = fs.readFileSync("./data/lessons.json", 'utf-8');
    let data: customData.lessons = JSON.parse(rawdata);
    
    if (id.every((lessonId) => Object.keys(data).some((key: string) => parseInt(key) === lessonId))) {
        return true;
    }
    return false;
}

function updateLesson(lesson: customData.lesson): result {
    let rawdata: string = fs.readFileSync("./data/lessons.json", "utf-8");
    let data: customData.lessons = JSON.parse(rawdata);

    if (data.hasOwnProperty(lesson.id!)) {
        let id = lesson.id!;
        let oldLesson = data[id]!;
        oldLesson.title = lesson.title;
        oldLesson.description = lesson.description;
        oldLesson.topics = lesson.topics;
        oldLesson.content = lesson.content;

        data[id] = oldLesson;
        fs.writeFileSync("./data/lessons.json", JSON.stringify(data));

        return {
            status: 200,
            message: `Lesson with id ${lesson.id} succesful`
        }
    }
    else {
        return {
            status: 401,
            message: `Update failed, no lesson with id ${lesson.id}`
        }
    }
}

function checkModuleId(id: number[]): boolean {
    let rawdata: string = fs.readFileSync("./data/modules.json", 'utf-8');
    let data: customData.lessons = JSON.parse(rawdata);
    
    if (id.every((moduleId) => Object.keys(data).some((key: string) => parseInt(key) === moduleId))) {
        return true;
    }
    return false;
}

function updateModule(module: customData.module): result {
    let rawdata: string = fs.readFileSync("./data/modules.json", "utf-8");
    let data: customData.modules = JSON.parse(rawdata);

    if (data.hasOwnProperty(module.id!) && checkLessonId(module.moduleLessons.map((l) => l.lessonId))) {
        let oldModule = data[module.id!]!;
        oldModule.title = module.title;
        oldModule.moduleLessons = module.moduleLessons;

        data[module.id!] = oldModule;

        return {
            status: 200,
            message: `Module with id ${module.id} succesful`
        }
    }
    else {
        return {
            status: 401,
            message: `Update failed, module with id ${module.id} either does not exist or has invalid lesson id`
        }
    }
}

function updateCourse(course: customData.course): result {
    let rawdata: string = fs.readFileSync("./data/courses.json", "utf-8");
    let data: customData.courses = JSON.parse(rawdata);

    if (data.hasOwnProperty(course.id!) && checkModuleId(course.modules.map((module) => module.id))) {
        let oldCourse = data[course.id!]!;
        oldCourse.title = course.title;
        oldCourse.description = course.description;
        oldCourse.modules = course.modules;

        data[course.id!] = oldCourse;
        fs.writeFileSync("./data/courses.json", JSON.stringify(data));

        return {
            status: 200,
            message: `Course with id ${course.id} succesful`
        }
    }
    else {
        return {
            status: 401,
            message: `Update failed, course with id ${course.id} either does not exist or has invalid module id`
        }
    }
}

function update(data: customData.lesson | customData.module | customData.course ): result {
    let res: result = {
        status: 420,
        message: `Invalid update request`
    }
    if (!data.id) {
        data.type = data.type ? data.type : "undefined, type not provided";

        return {
            status: 498,
            message: `No ID recognize for type request ${data.type}`,
        };
    }
    else if (data.type === "course") {
        res = updateCourse(data as customData.course);
    }
    else if (data.type === "module") {
        res = updateModule(data as customData.module);
    }
    else if (data.type === "lesson") {
        res = updateLesson(data as customData.lesson);
    }

    return res;
}

module.exports = update;