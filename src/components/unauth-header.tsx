import { Button, Center, Group, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const UnauthHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Center>
      <Group justify="space-between" p="md" w="80rem" wrap="nowrap">
        <Group>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Title order={1}>{t("header.logo")}</Title>
          </Link>
        </Group>

        <Group>
          <Button>{t("general.sign-in")}</Button>
        </Group>
      </Group>
    </Center>
  );
};
