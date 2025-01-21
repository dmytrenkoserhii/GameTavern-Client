import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Center, Container, Loader, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { useMutation } from '@tanstack/react-query';

import { Routes } from '@/enums';
import { UsersService } from '@/features/user';

const EmailConfirmation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const confirmEmail = useMutation({
    mutationFn: (token: string) => UsersService.confirmUserEmail({ token }),
    onSuccess: () => {
      notifications.show({
        title: t('auth.email_confirmation.success_title'),
        message: t('auth.email_confirmation.success_message'),
        color: 'green',
      });
      setTimeout(() => navigate(Routes.HOME), 2000);
    },
    onError: () => {
      notifications.show({
        title: t('auth.email_confirmation.error_title'),
        message: t('auth.email_confirmation.error_message'),
        color: 'red',
      });
    },
  });

  const resendConfirmation = useMutation({
    mutationFn: UsersService.resendConfirmationEmail,
    onSuccess: () => {
      notifications.show({
        title: t('auth.email_confirmation.resend_success_title'),
        message: t('auth.email_confirmation.resend_success_message'),
        color: 'green',
      });
    },
  });

  useEffect(() => {
    if (token) {
      confirmEmail.mutate(token);
    }
  }, [token]);

  if (token) {
    return (
      <Container size="xs">
        <Center h="100vh">
          <Stack align="center" gap="md">
            <Title order={2}>{t('auth.email_confirmation.confirming_title')}</Title>
            <Text ta="center">{t('auth.email_confirmation.confirming_message')}</Text>
            <Loader />
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xs">
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Title order={2}>{t('auth.email_confirmation.check_email_title')}</Title>
          <Text ta="center">
            {t('auth.email_confirmation.check_email_description', {
              email: email || t('auth.email_confirmation.your_email'),
            })}
          </Text>
          <Button
            onClick={() => resendConfirmation.mutate()}
            loading={resendConfirmation.isPending}
          >
            {t('auth.email_confirmation.resend_button')}
          </Button>
        </Stack>
      </Center>
    </Container>
  );
};

export default EmailConfirmation;
