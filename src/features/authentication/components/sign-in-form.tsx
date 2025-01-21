import { z } from 'zod';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKeys } from '@/enums';
import { Routes } from '@/enums/routes.enum';

import { SignInFormSchema } from '../schemas';
import { AuthService } from '../services';

type SignInFormData = z.infer<typeof SignInFormSchema>;

export const SignInForm: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: signIn } = useMutation({
    mutationFn: (signInData: SignInFormData) => AuthService.signIn(signInData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] });
    },
    onError: (error: Error) => {
      notifications.show({
        title: t('auth.signin.error_title'),
        message: t('auth.signin.error_message'),
        color: 'red',
      });
      // eslint-disable-next-line no-console
      console.log(`Error: ${error}`);
    },
  });

  const form = useForm<SignInFormData>({
    validate: zodResolver(SignInFormSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    signIn(values);
  });

  return (
    <Paper shadow="md" radius="md" p="xl" withBorder w={600}>
      <Title order={2} ta="center" mt="md" mb={50}>
        {t('auth.signin.welcome')}
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label={t('auth.signin.email_label')}
            placeholder={t('auth.signin.email_placeholder')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label={t('auth.signin.password_label')}
            placeholder={t('auth.signin.password_placeholder')}
            {...form.getInputProps('password')}
          />

          <Group justify="flex-end">
            <Anchor component={Link} to={Routes.FORGOT_PASSWORD} type="button" size="sm">
              {t('auth.signin.forgot_password')}
            </Anchor>
          </Group>

          <Button type="submit" fullWidth mt="xl">
            {t('auth.signin.submit')}
          </Button>
        </Stack>
      </form>

      <Divider label={t('auth.signin.divider')} labelPosition="center" my="lg" />

      <Button variant="outline" fullWidth>
        <FcGoogle size={20} style={{ marginRight: '8px' }} />
        {t('auth.signin.google')}
      </Button>

      <Group justify="center" mt="md">
        <Anchor component={Link} to={Routes.REGISTER} type="button" size="sm">
          {t('auth.signin.register_prompt')}
        </Anchor>
      </Group>
    </Paper>
  );
};
