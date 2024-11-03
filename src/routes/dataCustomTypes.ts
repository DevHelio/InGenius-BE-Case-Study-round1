export interface readRequest {
    readRequestType: "modules" | "lessons" | "courses";
    id: number;
}

export interface moduleLessons {
    lessonId: number;
    title: string;
}

export interface module {
    id?: number;
    type?: string;
    title: string;
    moduleLessons: moduleLessons[];   
}

export interface modules {
    [id: number]: module;
}

export interface lessonContent {
  type: string;
  data: string;
}
export interface lesson {
    id?: number;
    type?: string;
    title: string;
    description: string;
    topics: string[];
    content: lessonContent[];
}
export interface lessons {
    [id: number]: lesson;
}
export interface courseModules {
    id: number;
    title: string;
}
export interface course {
    id?: number;
    type?: string;
    title: string;
    description: string;
    modules: courseModules[];
}
export interface courses {
    [id: number]: course;
}

