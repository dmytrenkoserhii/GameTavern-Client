import { z } from 'zod';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { useMutation } from '@tanstack/react-query';

import { SignUpFormSchema } from '../schemas';
import { AuthService } from '../services';
import { SignUpRequestData } from '../types';

type SignUpFormData = z.infer<typeof SignUpFormSchema>;

export const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const form = useForm<SignUpFormData>({
    validate: zodResolver(SignUpFormSchema),
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: true,
    },
  });

  const { mutate: signUp } = useMutation({
    mutationFn: (signUpData: SignUpRequestData) => AuthService.signUp(signUpData),
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.log(`Error: ${error}`);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values = form.values;

    const signUpData = {
      email: values.email,
      password: values.password,
      username: values.username,
    };

    signUp(signUpData);
  };

  return (
    <Paper shadow="md" radius="md" p="xl" withBorder w={600}>
      <Title order={2} ta="center" mt="md" mb={50}>
        {t('auth.signup.register_button')}
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label={t('auth.signup.username_label')}
            placeholder={t('auth.signup.username_placeholder')}
            {...form.getInputProps('username')}
          />

          <TextInput
            label={t('auth.signup.email_label')}
            placeholder={t('auth.signup.email_placeholder')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label={t('auth.signup.password_label')}
            placeholder={t('auth.signup.password_placeholder')}
            {...form.getInputProps('password')}
          />

          <PasswordInput
            label={t('auth.signup.confirm_password_label')}
            placeholder={t('auth.signup.confirm_password_placeholder')}
            {...form.getInputProps('passwordConfirmation')}
          />

          <Checkbox
            label={t('auth.signup.terms_label')}
            {...form.getInputProps('terms', { type: 'checkbox' })}
          />

          <Button type="submit" fullWidth mt="xl">
            {t('auth.signup.register_button')}
          </Button>
        </Stack>
      </form>

      <Divider label={t('auth.signin.divider')} labelPosition="center" my="lg" />

      <Button variant="outline" fullWidth>
        <FcGoogle size={20} style={{ marginRight: '8px' }} />
        {t('auth.signup.google_button')}
      </Button>

      <Group justify="center" mt="md">
        <Anchor component={Link} to="/auth/login" size="sm">
          {t('auth.signup.login_link')}
        </Anchor>
      </Group>

      <Group justify="center" mt="xs">
        <Anchor component="button" size="sm">
          {t('auth.signup.confirmation_instructions_link')}
        </Anchor>
      </Group>
    </Paper>
  );
};
