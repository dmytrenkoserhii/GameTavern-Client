import { AuthLayout, UnauthLayout } from "@/layouts";
import { Home } from "@/pages";
import { RouteObject } from "react-router-dom";

export const CLIENT_ROUTES: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [],
  },
  {
    element: <UnauthLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];
