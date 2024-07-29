// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { CreateUserCreateUsersPostData, CreateUserCreateUsersPostResponse, CreateTodoCreateTodosPostData, CreateTodoCreateTodosPostResponse, ReadTodosGetTodosGetData, ReadTodosGetTodosGetResponse, DeleteTodosDeleteTodosTodoIdDeleteData, DeleteTodosDeleteTodosTodoIdDeleteResponse, UpdateTodosUpdateTodosTodoIdPostData, UpdateTodosUpdateTodosTodoIdPostResponse, GetUserByTodoGetUserByTodoTodoIdGetData, GetUserByTodoGetUserByTodoTodoIdGetResponse, ReadTodosByUserGetTodosByUserUserIdGetData, ReadTodosByUserGetTodosByUserUserIdGetResponse, GetTodosByItemNameGetTodosByItemNameItemNameGetData, GetTodosByItemNameGetTodosByItemNameItemNameGetResponse, GetTodosByImportanceGetTodosByItemImportanceItemImportanceGetData, GetTodosByImportanceGetTodosByItemImportanceItemImportanceGetResponse, GetTodoByPlanTimeGetTodosByPlanTimePlanTimeStrGetData, GetTodoByPlanTimeGetTodosByPlanTimePlanTimeStrGetResponse } from './types.gen';

/**
 * Create User
 * @param data The data for the request.
 * @param data.requestBody
 * @returns User Successful Response
 * @throws ApiError
 */
export const createUserCreateUsersPost = (data: CreateUserCreateUsersPostData): CancelablePromise<CreateUserCreateUsersPostResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/create_users/',
    body: data.requestBody,
    mediaType: 'application/json',
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Create Todo
 * @param data The data for the request.
 * @param data.requestBody
 * @returns Todo Successful Response
 * @throws ApiError
 */
export const createTodoCreateTodosPost = (data: CreateTodoCreateTodosPostData): CancelablePromise<CreateTodoCreateTodosPostResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/create_todos/',
    body: data.requestBody,
    mediaType: 'application/json',
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Read Todos
 * @param data The data for the request.
 * @param data.page
 * @param data.perPage
 * @returns PaginateModel_Todo_ Successful Response
 * @throws ApiError
 */
export const readTodosGetTodosGet = (data: ReadTodosGetTodosGetData): CancelablePromise<ReadTodosGetTodosGetResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/get_todos/',
    query: {
        page: data.page,
        per_page: data.perPage
    },
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Delete Todos
 * @param data The data for the request.
 * @param data.todoId
 * @returns unknown Successful Response
 * @throws ApiError
 */
export const deleteTodosDeleteTodosTodoIdDelete = (data: DeleteTodosDeleteTodosTodoIdDeleteData): CancelablePromise<DeleteTodosDeleteTodosTodoIdDeleteResponse> => { return __request(OpenAPI, {
    method: 'DELETE',
    url: '/delete_todos/{todo_id}',
    path: {
        todo_id: data.todoId
    },
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Update Todos
 * @param data The data for the request.
 * @param data.todoId
 * @param data.requestBody
 * @returns Todo Successful Response
 * @throws ApiError
 */
export const updateTodosUpdateTodosTodoIdPost = (data: UpdateTodosUpdateTodosTodoIdPostData): CancelablePromise<UpdateTodosUpdateTodosTodoIdPostResponse> => { return __request(OpenAPI, {
    method: 'POST',
    url: '/update_todos/{todo_id}',
    path: {
        todo_id: data.todoId
    },
    body: data.requestBody,
    mediaType: 'application/json',
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Get User By Todo
 * @param data The data for the request.
 * @param data.todoId
 * @returns User Successful Response
 * @throws ApiError
 */
export const getUserByTodoGetUserByTodoTodoIdGet = (data: GetUserByTodoGetUserByTodoTodoIdGetData): CancelablePromise<GetUserByTodoGetUserByTodoTodoIdGetResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/get_user_by_todo/{todo_id}',
    path: {
        todo_id: data.todoId
    },
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Read Todos By User
 * @param data The data for the request.
 * @param data.userId
 * @param data.page
 * @param data.perPage
 * @returns PaginateModel_Todo_ Successful Response
 * @throws ApiError
 */
export const readTodosByUserGetTodosByUserUserIdGet = (data: ReadTodosByUserGetTodosByUserUserIdGetData): CancelablePromise<ReadTodosByUserGetTodosByUserUserIdGetResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/get_todos_by_user/{user_id}',
    path: {
        user_id: data.userId
    },
    query: {
        page: data.page,
        per_page: data.perPage
    },
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Get Todos By Item Name
 * Get todos by the item name
 * @param data The data for the request.
 * @param data.itemName
 * @param data.page
 * @param data.perPage
 * @returns PaginateModel_Todo_ Successful Response
 * @throws ApiError
 */
export const getTodosByItemNameGetTodosByItemNameItemNameGet = (data: GetTodosByItemNameGetTodosByItemNameItemNameGetData): CancelablePromise<GetTodosByItemNameGetTodosByItemNameItemNameGetResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/get_todos_by_item_name/{item_name}',
    path: {
        item_name: data.itemName
    },
    query: {
        page: data.page,
        per_page: data.perPage
    },
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Get Todos By Importance
 * Get todos by the item importance
 * @param data The data for the request.
 * @param data.itemImportance
 * @param data.page
 * @param data.perPage
 * @returns PaginateModel_Todo_ Successful Response
 * @throws ApiError
 */
export const getTodosByImportanceGetTodosByItemImportanceItemImportanceGet = (data: GetTodosByImportanceGetTodosByItemImportanceItemImportanceGetData): CancelablePromise<GetTodosByImportanceGetTodosByItemImportanceItemImportanceGetResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/get_todos_by_item_importance/{item_importance}',
    path: {
        item_importance: data.itemImportance
    },
    query: {
        page: data.page,
        per_page: data.perPage
    },
    errors: {
        422: 'Validation Error'
    }
}); };

/**
 * Get Todo By Plan Time
 * Get todos by the plan time
 * @param data The data for the request.
 * @param data.planTimeStr
 * @param data.page
 * @param data.perPage
 * @returns PaginateModel_Todo_ Successful Response
 * @throws ApiError
 */
export const getTodoByPlanTimeGetTodosByPlanTimePlanTimeStrGet = (data: GetTodoByPlanTimeGetTodosByPlanTimePlanTimeStrGetData): CancelablePromise<GetTodoByPlanTimeGetTodosByPlanTimePlanTimeStrGetResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/get_todos_by_plan_time/{plan_time_str}',
    path: {
        plan_time_str: data.planTimeStr
    },
    query: {
        page: data.page,
        per_page: data.perPage
    },
    errors: {
        422: 'Validation Error'
    }
}); };