import { z } from 'zod';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Paper, Stack, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { useMutation } from '@tanstack/react-query';

import { Routes } from '@/enums';

import { ResetPasswordSchema } from '../schemas';
import { AuthService } from '../services';

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

export const ResetPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useParams();

  const form = useForm<ResetPasswordFormData>({
    validate: zodResolver(ResetPasswordSchema),
    initialValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (values: ResetPasswordFormData) =>
      AuthService.resetPassword({ token: token as string, password: values.password }),
    onSuccess: () => {
      notifications.show({
        title: t('auth.reset_password.success_title'),
        message: t('auth.reset_password.success_message'),
        color: 'green',
      });
      navigate(Routes.LOGIN);
    },
    onError: () => {
      notifications.show({
        title: t('auth.reset_password.error_title'),
        message: t('auth.reset_password.error_message'),
        color: 'red',
      });
    },
  });

  React.useEffect(() => {
    if (!token) {
      navigate(Routes.LOGIN);
    }
  }, [token, navigate]);

  const handleSubmit = form.onSubmit((values) => {
    resetPassword(values);
  });

  if (!token) {
    return null;
  }

  return (
    <Paper shadow="md" radius="md" p="xl" withBorder w={600}>
      <Title order={2} ta="center" mt="md" mb={50}>
        {t('auth.reset_password.title')}
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label={t('auth.reset_password.password_label')}
            placeholder={t('auth.reset_password.password_placeholder')}
            type="password"
            {...form.getInputProps('password')}
          />

          <TextInput
            label={t('auth.reset_password.confirm_password_label')}
            placeholder={t('auth.reset_password.confirm_password_placeholder')}
            type="password"
            {...form.getInputProps('confirmPassword')}
          />

          <Button type="submit" fullWidth mt="xl" loading={isPending}>
            {t('auth.reset_password.submit_button')}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
