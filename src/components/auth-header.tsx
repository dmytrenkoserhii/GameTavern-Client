import { Center, Group, TextInput, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AuthHeader: React.FC = () => {
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
          <Link
            to="/games"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {t("header.games-link")}
          </Link>
          <TextInput placeholder={t("header.search")} />
        </Group>
      </Group>
    </Center>
  );
};
