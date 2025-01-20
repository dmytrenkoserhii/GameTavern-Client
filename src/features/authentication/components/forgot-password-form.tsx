import { z } from 'zod';

import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { useMutation } from '@tanstack/react-query';

import { ForgotPasswordSchema } from '../schemas';
import { AuthService } from '../services';

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export const ForgotPasswordForm: React.FC = () => {
  const { t } = useTranslation();

  const form = useForm<ForgotPasswordFormData>({
    validate: zodResolver(ForgotPasswordSchema),
    initialValues: {
      email: '',
    },
  });

  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: AuthService.forgotPassword,
    onSuccess: () => {
      notifications.show({
        title: t('auth.forgot_password.success_title'),
        message: t('auth.forgot_password.success_message'),
        color: 'green',
      });
      form.reset();
    },
    onError: () => {
      notifications.show({
        title: t('auth.forgot_password.error_title'),
        message: t('auth.forgot_password.error_message'),
        color: 'red',
      });
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    forgotPassword(values);
  });

  return (
    <Paper shadow="md" radius="md" p="xl" withBorder w={600}>
      <Title order={2} ta="center" mt="md" mb={50}>
        {t('auth.forgot_password.title')}
      </Title>

      <Text c="dimmed" size="sm" ta="center" mb="xl">
        {t('auth.forgot_password.description')}
      </Text>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label={t('auth.forgot_password.email_label')}
            placeholder={t('auth.forgot_password.email_placeholder')}
            {...form.getInputProps('email')}
          />

          <Button type="submit" fullWidth mt="xl" loading={isPending}>
            {t('auth.forgot_password.submit_button')}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
