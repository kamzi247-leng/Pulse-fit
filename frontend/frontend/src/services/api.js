const API_URL = import.meta.env.VITE_API_URL;


export async function apiRequest(
    endpoint,
    options = {}
) {

    const token = localStorage.getItem("access_token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers,
        }
    );

    if (response.status === 401) {

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    const data = await response.json().catch(
        () => null
    );

    if (!response.ok) {

        throw new Error(
            data?.detail ||
            "Something went wrong."
        );
    }

    return data;
}


export async function login(
    username,
    password
) {

    const response = await fetch(
        `${API_URL}/auth/token/`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                username,
                password,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            "Invalid username or password."
        );
    }

    localStorage.setItem(
        "access_token",
        data.access
    );

    localStorage.setItem(
        "refresh_token",
        data.refresh
    );

    return data;
}


export function logout() {

    localStorage.removeItem(
        "access_token"
    );

    localStorage.removeItem(
        "refresh_token"
    );
}


export async function register(
    username,
    email,
    password
) {

    return apiRequest(
        "/auth/register/",
        {
            method: "POST",

            body: JSON.stringify({
                username,
                email,
                password,
            }),
        }
    );
}


export async function getServices() {

    return apiRequest(
        "/services/"
    );
}


export async function getAppointments() {

    return apiRequest(
        "/appointments/"
    );
}


export async function createAppointment(
    appointment
) {

    return apiRequest(
        "/appointments/",
        {
            method: "POST",

            body: JSON.stringify(
                appointment
            ),
        }
    );
}


export async function cancelAppointment(
    id
) {

    return apiRequest(
        `/appointments/${id}/`,
        {
            method: "DELETE",
        }
    );
}


export async function getMe() {

    return apiRequest(
        "/auth/me/"
    );
}