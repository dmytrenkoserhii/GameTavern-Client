import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Stack } from "@mantine/core";
import { Footer, Header } from "@/components";

export const UnauthLayout: React.FC = () => {
  return (
    <Stack h="100dvh" w="100%" justify="space-between">
      <Header />

      <Container
        component="main"
        maw="80rem"
        w="100%"
        px={0}
        m="0 auto"
        flex="1"
      >
        <Outlet />
      </Container>

      <Footer />
    </Stack>
  );
};
