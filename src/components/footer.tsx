import React from "react";
import dayjs from "dayjs";
import { Box, Divider, Group, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = dayjs().format("YYYY");

  return (
    <Box py="xs">
      <Divider py={4} />
      <Group justify="center">
        <Text>{t("footer.createdBy", { year: currentYear })}</Text>
      </Group>
    </Box>
  );
};
