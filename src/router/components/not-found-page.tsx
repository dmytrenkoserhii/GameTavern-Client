import { Box, Button, Center, Title } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Center h="100vh">
      <Box>
        <Title order={1}>{t("router.not-found")}</Title>
        <Button component={Link} to="/" fullWidth variant="light" color="cyan">
          {t("router.home-page")}
        </Button>
      </Box>
    </Center>
  );
};
