
/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new lesson, course, or module
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *          example: {"type": "lesson","title": "Introduction to Web Development","description": "Learn about HTML tags and document structure","topics": ["HTML tags","Document structure","Semantic HTML"],"content": [{"type": "text","data": "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser."},{"type": "video","data": "https://example.com/intro-to-html-video"}]}
 *     responses:
 *       200:
 *         description: Successfully created the resource
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Wrote {title} to {resource}.json"
 *       400:
 *         description: Request incomplete, missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Request incomplete // Please provide all the details"
 *       420:
 *         description: Course or module ID does not match any existing IDs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 420
 *                 message:
 *                   type: string
 *                   example: "Course modules ID does not match any Modules ID"
 *       499:
 *         description: Wrong request, missing type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 499
 *                 message:
 *                   type: string
 *                   example: "Wrong request // Please provide a type choose between; 'lesson', 'course' or 'module'"
 */

import * as customData from './dataCustomTypes';

// (C)rud
import fs from 'fs';


function isMissingField(c: any): boolean {
    //console.log(Object.keys(c).some((key: string) => (key !== "id" && create.hasOwnProperty(key) && (create as any)[key] === undefined || (c as any)[key] === "")));
    return Object.keys(c).some((key: string) => (key !== "id" && create.hasOwnProperty(key) && (create as any)[key] === undefined || (c as any)[key] === ""))
}

function checkLessonId(id: number[]): boolean {
    let rawdata: string = fs.readFileSync("./data/lessons.json", 'utf-8');
    let data: customData.lessons = JSON.parse(rawdata);
    
    if (id.every((lessonId) => Object.keys(data).some((key: string) => parseInt(key) === lessonId))) {
        return true;
    }
    return false;
}

function checkModuleId(id: number[]): boolean {
    let rawdata: string = fs.readFileSync("./data/modules.json", 'utf-8');
    let data: customData.lessons = JSON.parse(rawdata);
    
    if (id.every((moduleId) => Object.keys(data).some((key: string) => parseInt(key) === moduleId))) {
        return true;
    }
    return false;
}

function createCourse(c: customData.course): {status: number, message: string} {
    if (!checkModuleId(c.modules.map((module) => module.id))) {
        return {
            status: 420,
            message: `Course modules ID does not match any Modules ID`,
          };
    }

    let rawdata: string = fs.readFileSync("./data/courses.json", 'utf-8');
    let data: customData.courses = JSON.parse(rawdata);

    let highestId = Object.keys(data).reduce((maxId, id) => Math.max(maxId, parseInt(id)), 0);

    let newCourse: customData.course = {
        title: c.title,
        description: c.description,
        modules: c.modules,
    }

    data[highestId+1] = newCourse;
    
    fs.writeFileSync("./data/courses.json", JSON.stringify(data));
    console.log(`New course created with ID: ${newCourse.id}`);

    return {
      status: 200,
      message: `Wrote ${newCourse.title} to courses.json`,
    };
  
}

function createLesson(c: customData.lesson): {status: number, message: string} {
    let rawdata: string = fs.readFileSync("./data/lessons.json", 'utf-8');
    let data: customData.lessons = JSON.parse(rawdata);

    let highestId = Object.keys(data).reduce((maxId, id) => Math.max(maxId, parseInt(id)), 0);

    let newLesson: customData.lesson = {
        title: c.title,
        description: c.description,
        topics: c.topics,
        content: c.content,
    }

    data[highestId+1] = newLesson;
    
    fs.writeFileSync("./data/lessons.json", JSON.stringify(data));
    console.log(`New lesson created with ID: ${newLesson.id}`);

    return {
      status: 200,
      message: `Wrote ${newLesson.title} to lessons.json`,
    };
}

function createModule(c: customData.module): {status: number, message: string} {
    if (!checkLessonId(c.moduleLessons.map((module) => module.lessonId))) {
        return {
            status: 420,
            message: `Module lesson ID does not match any Lessons ID`,
          };
    }

    let rawdata: string = fs.readFileSync("./data/modules.json", 'utf-8');
    let data: customData.modules = JSON.parse(rawdata);

    let highestId = Object.keys(data).reduce((maxId, id) => Math.max(maxId, parseInt(id)), 0);

    let newModule: customData.module = {
        title: c.title,
        moduleLessons: c.moduleLessons,
    }

    data[highestId+1] = newModule;
    
    fs.writeFileSync("./data/modules.json", JSON.stringify(data));
    console.log(`New module created with ID: ${newModule.id}`);

    return {
      status: 200,
      message: `Wrote ${newModule.title} to modules.json`,
    };
}

function create(create: customData.lesson | customData.course | customData.module): {status: number, message: string} {
    let status: {status: number, message: string} = {status: 0, message: ""};
    // In case a field is missing
    if (isMissingField(create)) {
      return {
          status: 400,
          message: "Request incomplete // Please provide all the details",
        };
    }
    else if (create.type === undefined) {
        return {
            status: 499,
            message: "Wrong request // Please provide a type choose between; 'lesson', 'course' or 'module'",
          };
    }

    else if (create.type === "lesson") {
      status = createLesson(create as customData.lesson);
    }
    
    else if (create.type === "course") {
        status = createCourse(create as customData.course);
    }

    else if (create.type === "module") {
        status = createModule(create as customData.module);
    }

    return status
}

module.exports = create;