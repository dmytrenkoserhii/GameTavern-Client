import {
  ActionIcon,
  Anchor,
  Button,
  Center,
  Group,
  Menu,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RiUserLine } from "react-icons/ri";
import React from "react";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const [showAuthContent] = React.useState(true);

  return (
    <Center>
      <Group justify="space-between" p="md" w="80rem" wrap="nowrap">
        <Group>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Title order={1}>TAVERN</Title>
          </Link>
        </Group>

        {showAuthContent ? (
          <Group>
            <Anchor component={Link} to="/games" underline="never" c="inherit">
              {t("header.games-link")}
            </Anchor>
            <TextInput placeholder={t("header.search")} />
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="subtle" size="lg">
                  <RiUserLine size={22} />{" "}
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item component={Link} to="/profile">
                  {t("header.profile")}
                </Menu.Item>
                <Menu.Item color="red">{t("header.logout")}</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        ) : (
          <Group>
            <Button>{t("general.sign-in")}</Button>
          </Group>
        )}
      </Group>
    </Center>
  );
};
