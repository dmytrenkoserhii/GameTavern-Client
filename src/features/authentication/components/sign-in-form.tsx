import React from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Stack,
  Anchor,
  Paper,
  Title,
  Divider,
} from '@mantine/core';
import { FcGoogle } from 'react-icons/fc';
import { SignInFormSchema } from '../schemas';
import { useTranslation } from 'react-i18next';
import { Routes } from '@/enums/routes.enum';
import { Link } from 'react-router-dom';

type SignInFormData = z.infer<typeof SignInFormSchema>;

export const SignInForm: React.FC = () => {
  const { t } = useTranslation();

  const form = useForm<SignInFormData>({
    validate: zodResolver(SignInFormSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Paper shadow="md" radius="md" p="xl" withBorder w={600}>
      <Title order={2} ta="center" mt="md" mb={50}>
        {t('auth.signin.welcome')}
      </Title>

      <form>
        <Stack gap="md">
          <TextInput
            required
            label={t('auth.signin.email_label')}
            placeholder={t('auth.signin.email_placeholder')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            required
            label={t('auth.signin.password_label')}
            placeholder={t('auth.signin.password_placeholder')}
            {...form.getInputProps('password')}
          />

          <Group justify="flex-end">
            <Anchor
              component={Link}
              to={Routes.FORGOT_PASSWORD}
              type="button"
              size="sm"
            >
              {t('auth.signin.forgot_password')}
            </Anchor>
          </Group>

          <Button type="submit" fullWidth mt="xl">
            {t('auth.signin.submit')}
          </Button>
        </Stack>
      </form>

      <Divider
        label={t('auth.signin.divider')}
        labelPosition="center"
        my="lg"
      />

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
