import { AuthLayout, UnauthLayout } from "@/layouts";
import { Home } from "@/pages";
import { RouteObject } from "react-router-dom";
import { NotFoundPage } from "../components";

export const CLIENT_ROUTES: RouteObject[] = [
  {
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "games",
        element: <div>Games</div>,
      },
      {
        path: "game/:id",
        element: <div>Game</div>,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
      {
        path: "lists",
        element: <div>Lists</div>,
      },
      {
        path: "list/:id",
        element: <div>List</div>,
      },
      {
        path: "create-list",
        element: <div>Create List</div>,
      },
      {
        path: "confirm-email",
        element: <div>Confirm Email</div>,
      },
      {
        path: "forgot-password",
        element: <div>Forgot Password</div>,
      },
    ],
  },
  {
    element: <UnauthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <div>Login</div>,
      },
      {
        path: "register",
        element: <div>Register</div>,
      },
    ],
  },
];
