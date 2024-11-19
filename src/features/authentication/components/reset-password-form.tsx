import { z } from 'zod';

import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Paper, Stack, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { ResetPasswordSchema } from '../schemas';

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

export const ResetPasswordForm: React.FC = () => {
  const { t } = useTranslation();

  const form = useForm<ResetPasswordFormData>({
    validate: zodResolver(ResetPasswordSchema),
    initialValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    // eslint-disable-next-line no-console
    console.log(values);
  });

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

          <Button type="submit" fullWidth mt="xl">
            {t('auth.reset_password.submit_button')}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
