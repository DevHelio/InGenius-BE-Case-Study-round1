/**
 * @swagger
 * components:
 *   schemas:
 *     Result:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: HTTP status code of the operation.
 *         message:
 *           type: string
 *           description: Message describing the result of the operation.
 *     DeleteRequest:
 *       type: object
 *       properties:
 *         deleteRequestType:
 *           type: string
 *           enum: [modules, lessons, courses]
 *           description: The type of item to delete.
 *         id:
 *           type: integer
 *           description: The ID of the item to delete.
 */

/**
 * Deletes a module by ID.
 * @param id - The ID of the module to delete.
 * @returns An object containing the status and message of the operation.
 */

/**
 * Deletes a lesson by ID.
 * @param id - The ID of the lesson to delete.
 * @returns An object containing the status and message of the operation.
 */

/**
 * Deletes a course by ID.
 * @param id - The ID of the course to delete.
 * @returns An object containing the status and message of the operation.
 */

/**
 * Handles delete requests for modules, lessons, and courses.
 * @param data - The delete request containing the type and ID of the item to delete.
 * @returns An object containing the status and message of the operation.
 * @swagger
 * /delete:
 *   delete:
 *     summary: Deletes a module, lesson, or course.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteRequest'
 *     responses:
 *       200:
 *         description: The item was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       404:
 *         description: The item was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       420:
 *         description: Invalid delete request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */

// cru(D)
import * as customData from './dataCustomTypes';

import fs from 'fs';

/* example: { "id": 5, "deleteRequestType": "courses" } */




interface result {
    status: number,
    message: string,
}

interface deleteRequest {
    deleteRequestType: "modules" | "lessons" | "courses";
    id: number;
}

function deleteModule(id: number): result {
    let rawdata: string = fs.readFileSync("./data/modules.json", 'utf-8');
        let modules: customData.modules = JSON.parse(rawdata);

        if (modules.hasOwnProperty(id!)) {
            delete modules[id];
            fs.writeFileSync("./data/modules.json", JSON.stringify(modules));
            return {
                status: 200,
                message: `Module with ID: ${id} has been deleted`,
            }
        }
        else {
            return {
                status: 404,
                message: `Module with ID: ${id} has not been found`,
            }
        }
}
function deleteLesson(id: number): result {
    let rawdata: string = fs.readFileSync("./data/lessons.json", 'utf-8');
        let lessons: customData.lessons = JSON.parse(rawdata);

        if (lessons.hasOwnProperty(id)) {
            delete lessons[id];
            fs.writeFileSync("./data/lessons.json", JSON.stringify(lessons));
            return {
                status: 200,
                message: `Lesson with ID: ${id} has been deleted`,
            }
        }
        else {
            return {
                status: 404,
                message: `Lesson with ID: ${id} has not been found`,
            }
        }
}

function deleteCourse(id: number): result {
    let rawdata: string = fs.readFileSync("./data/courses.json", 'utf-8');
        let courses: customData.courses = JSON.parse(rawdata);

        if (courses.hasOwnProperty(id)) {
            delete courses[id];
            fs.writeFileSync("./data/courses.json", JSON.stringify(courses));
            return {
                status: 200,
                message: `Course with ID: ${id} has been deleted`,
            }
        }
        else {
            return {
                status: 404,
                message: `Course with ID: ${id} has not been found`,
            }
        }
}

function cDelete(data: deleteRequest): result {
    let res: result = {
        status: 420,
        message: `Invalid delete request`,
    }

    if (!data.id) {
        return res;
    }
    else if (data.deleteRequestType === "modules") {
        res = deleteModule(data.id);
    }
    else if (data.deleteRequestType === "lessons") {
        res = deleteLesson(data.id);
    }
    else if (data.deleteRequestType === "courses") {
        res = deleteCourse(data.id);
    }
    
    return res
}

module.exports = cDelete;