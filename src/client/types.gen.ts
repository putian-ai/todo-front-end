// This file is auto-generated by @hey-api/openapi-ts

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type Importance = 0 | 1 | 2 | 3;

export type PaginateModel_Todo_ = {
    page: number;
    per_page: number;
    total_items: number;
    items: Array<Todo>;
};

export type Tag = {
    id: number;
    name: string;
    color: string;
};

export type TagDto = {
    user_id: number;
    todo_id: number;
    name: string;
    color: string;
};

export type Todo = {
    id: number;
    item: string;
    create_time: string;
    plan_time: string | null;
    content: string | null;
    importance: Importance;
    user: User;
    tags: Array<Tag> | null;
};

export type TodoDto = {
    item: string;
    plan_time: string;
    user_id: number;
    content: string;
    importance: Importance;
};

export type UpdateTodoDto = {
    item: string;
    plan_time: string;
    content: string;
    importance: Importance;
};

export type User = {
    id: number;
    user_name: string;
};

export type UserDto = {
    user_name: string;
    pwd: string;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type CreateUserCreateUsersPostData = {
    requestBody: UserDto;
};

export type CreateUserCreateUsersPostResponse = User;

export type CreateTagCreateTagPostData = {
    requestBody: TagDto;
};

export type CreateTagCreateTagPostResponse = Tag;

export type CreateTodoCreateTodosPostData = {
    requestBody: TodoDto;
};

export type CreateTodoCreateTodosPostResponse = Todo;

export type ReadTodosGetTodosGetData = {
    page: number;
    perPage: number;
};

export type ReadTodosGetTodosGetResponse = PaginateModel_Todo_;

export type DeleteTodosDeleteTodosTodoIdDeleteData = {
    todoId: number;
};

export type DeleteTodosDeleteTodosTodoIdDeleteResponse = unknown;

export type DeleteTagsDeleteTagTagIdDeleteData = {
    tagId: number;
};

export type DeleteTagsDeleteTagTagIdDeleteResponse = unknown;

export type UpdateTodosUpdateTodosTodoIdPostData = {
    requestBody: UpdateTodoDto;
    todoId: number;
};

export type UpdateTodosUpdateTodosTodoIdPostResponse = Todo;

export type GetUserByTodoGetUserByTodoTodoIdGetData = {
    todoId: number;
};

export type GetUserByTodoGetUserByTodoTodoIdGetResponse = User;

export type ReadTodosByUserGetTodosByUserUserIdGetData = {
    page: number;
    perPage: number;
    userId: number;
};

export type ReadTodosByUserGetTodosByUserUserIdGetResponse = PaginateModel_Todo_;

export type GetTodosByItemNameGetTodosByItemNameItemNameGetData = {
    itemName: string;
    page: number;
    perPage: number;
};

export type GetTodosByItemNameGetTodosByItemNameItemNameGetResponse = PaginateModel_Todo_;

export type GetTodosByImportanceGetTodosByItemImportanceItemImportanceGetData = {
    itemImportance: Importance;
    page: number;
    perPage: number;
};

export type GetTodosByImportanceGetTodosByItemImportanceItemImportanceGetResponse = PaginateModel_Todo_;

export type GetTodoByTodoIdGetTodoByTodoIdTodoIdGetData = {
    todoId: number;
};

export type GetTodoByTodoIdGetTodoByTodoIdTodoIdGetResponse = Todo;

export type GetTodoByPlanTimeGetTodosByPlanTimePlanTimeStrGetData = {
    page: number;
    perPage: number;
    planTimeStr: string;
};

export type GetTodoByPlanTimeGetTodosByPlanTimePlanTimeStrGetResponse = PaginateModel_Todo_;

export type $OpenApiTs = {
    '/create_users/': {
        post: {
            req: CreateUserCreateUsersPostData;
            res: {
                /**
                 * Successful Response
                 */
                200: User;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/create_tag/': {
        post: {
            req: CreateTagCreateTagPostData;
            res: {
                /**
                 * Successful Response
                 */
                200: Tag;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/create_todos/': {
        post: {
            req: CreateTodoCreateTodosPostData;
            res: {
                /**
                 * Successful Response
                 */
                200: Todo;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/get_todos/': {
        get: {
            req: ReadTodosGetTodosGetData;
            res: {
                /**
                 * Successful Response
                 */
                200: PaginateModel_Todo_;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/delete_todos/{todo_id}': {
        delete: {
            req: DeleteTodosDeleteTodosTodoIdDeleteData;
            res: {
                /**
                 * Successful Response
                 */
                200: unknown;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/delete_tag/{tag_id}': {
        delete: {
            req: DeleteTagsDeleteTagTagIdDeleteData;
            res: {
                /**
                 * Successful Response
                 */
                200: unknown;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/update_todos/{todo_id}': {
        post: {
            req: UpdateTodosUpdateTodosTodoIdPostData;
            res: {
                /**
                 * Successful Response
                 */
                200: Todo;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/get_user_by_todo/{todo_id}': {
        get: {
            req: GetUserByTodoGetUserByTodoTodoIdGetData;
            res: {
                /**
                 * Successful Response
                 */
                200: User;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/get_todos_by_user/{user_id}': {
        get: {
            req: ReadTodosByUserGetTodosByUserUserIdGetData;
            res: {
                /**
                 * Successful Response
                 */
                200: PaginateModel_Todo_;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/get_todos_by_item_name/{item_name}': {
        get: {
            req: GetTodosByItemNameGetTodosByItemNameItemNameGetData;
            res: {
                /**
                 * Successful Response
                 */
                200: PaginateModel_Todo_;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/get_todos_by_item_importance/{item_importance}': {
        get: {
            req: GetTodosByImportanceGetTodosByItemImportanceItemImportanceGetData;
            res: {
                /**
                 * Successful Response
                 */
                200: PaginateModel_Todo_;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/get_todo_by_todo_id/{todo_id}': {
        get: {
            req: GetTodoByTodoIdGetTodoByTodoIdTodoIdGetData;
            res: {
                /**
                 * Successful Response
                 */
                200: Todo;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/get_todos_by_plan_time/{plan_time_str}': {
        get: {
            req: GetTodoByPlanTimeGetTodosByPlanTimePlanTimeStrGetData;
            res: {
                /**
                 * Successful Response
                 */
                200: PaginateModel_Todo_;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
};