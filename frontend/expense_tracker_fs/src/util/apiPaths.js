export const BASE_URL = "http://localhost:3000";

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/user/login",
        SIGNUP: "/api/v1/user/signup",
        GET_USER_INFO: "/api/v1/user/profile",
    },

    DASHBOARD: {
        GET_DATA: '/api/v1/dashboard',
    },

    INCOME: {
        ADD_INCOME: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/all",
        DELETE_INCOME: "/api/v1/income/delete/:id",
        DOWNLOAD_INCOME_EXCEL: "/api/v1/income/downloadexcel",
    },

    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_ALL_EXPENSE: "/api/v1/expense/all",
        DELETE_EXPENSE: "/api/v1/expense/delete/:id",
        DOWNLOAD_EXPENSE_EXCEL: "/api/v1/expense/downloadexcel",
    },

    IMAGE: {
        UPLOAD_IMAGE: '/api/v1/user/uploads',
    },
};