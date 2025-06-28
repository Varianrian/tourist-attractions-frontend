import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Box } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import NavBar from "@/components/NavBar";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    // Redirect to login if not authenticated
    const token = Cookies.get('token');
    if (!token) {
      throw redirect({ to: '/admin' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box>
      <NavBar />
      <Box pt="64px"> {/* Add top padding to account for fixed navbar */}
        <Outlet />
      </Box>
    </Box>
  );
}
