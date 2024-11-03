/* example: { "readRequestType": "module", "id": 23 } */
/**
 * @swagger
 * /read:
 *   get:
 *     summary: Read data based on request type
 *     description: Retrieve courses, lessons, or modules based on the provided request type and ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               readRequestType:
 *                 type: string
 *                 enum: [courses, lessons, modules]
 *                 description: The type of data to read.
 *               id:
 *                 type: integer
 *                 description: The ID of the course, lesson, or module to read.
 *             example:
 *               readRequestType: "modules"
 *               id: 23
 *     responses:
 *       200:
 *         description: Successfully retrieved the requested data.
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
 *                   example: "Module with ID: 23 has been found"
 *                 content:
 *                   type: object
 *                   description: The requested data.
 *       404:
 *         description: The requested data was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Module with ID: 23 has not been found"
 *                 content:
 *                   type: object
 *                   description: Empty object.
 *       401:
 *         description: Invalid read request type.
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
 *                   example: "Invalid read request type"
 *                 content:
 *                   type: object
 *                   description: Empty object.
 *       420:
 *         description: Invalid read request type.
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
 *                   example: "Invalid read request type"
 *                 content:
 *                   type: object
 *                   description: Available request types.
 */

import * as customData from './dataCustomTypes';
// c(R)ud

interface resultType {
    status: number,
    message: string,
    content: any
}

import fs from 'fs';

function readCourse(courseId?: number): resultType {
    let id: number = courseId ? courseId : -1;
    let rawdata: string = fs.readFileSync("./data/courses.json", 'utf-8');
    let data: customData.courses = JSON.parse(rawdata);

    if (id !== -1 && data[id]) {
        return {
            status: 200,
            message: `Course with ID: ${id} has been found`,
            content: data[id]
        }
    }
    else if (id !== -1 && !data[id]) {
        return {
            status: 404,
            message: `Course with ID: ${id} has not been found`,
            content: {}
        };
    }
    else {
        return {
            status: 401,
            message: `Invalid read request type`,
            content: {}
        };
    }
}

function readLesson(lessonId?: number): resultType {
    let id: number = lessonId ? lessonId : -1;
    let rawdata: string = fs.readFileSync("./data/lessons.json", 'utf-8');
    let data: customData.lessons = JSON.parse(rawdata);

    if (id !== -1 && data[id]) {
        return {
            status: 200,
            message: `Lesson with ID: ${id} has been found`,
            content: data[id]
        }
    }
    else if (id !== -1 && !data[id]) {
        return {
            status: 404,
            message: `Lesson with ID: ${id} has not been found`,
            content: {}
        };
    }
    else {
        return {
            status: 401,
            message: `Invalid read request type`,
            content: {}
        };
    }
}

function readModule(moduleId?: number): resultType {
    let id: number = moduleId ? moduleId : -1;
    let rawdata: string = fs.readFileSync("./data/modules.json", 'utf-8');
    let data: customData.modules = JSON.parse(rawdata);

    if (id !== -1 && data[id]) {
        return {
            status: 200,
            message: `Module with ID: ${id} has been found`,
            content: data[id]
        }
    }
    else if (id !== -1 && !data[id]) {
        return {
            status: 404,
            message: `Module with ID: ${id} has not been found`,
            content: {}
        };
    }
    else {
        return {
            status: 401,
            message: `Invalid read request type`,
            content: {}
        };
    }
}


function read(request: customData.readRequest): resultType {
    let result: {status: number, message: string, content: any} = {
        status: 420,
        message: `Invalid read request type`,
        content: {}
    };

    if (request.readRequestType === "courses") {
        result = readCourse(request.id);
    }

    else if (request.readRequestType === "lessons") {
        result = readLesson(request.id);
    }

    else if (request.readRequestType === "modules") {
        result = readModule(request.id);
    }
    else {
        result = {
            status: 420,
            message: `Invalid read request type`,
            content: { requestTypes: ["courses", "lessons", "modules"] }
        };
    }

    return result;
}

module.exports = read;