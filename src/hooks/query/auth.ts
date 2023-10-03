import { QueryOptions, ReactQueryCallback, useCustomMutation, useCustomQuery } from "@/utils/query";

import { EmailVerificationRequestSchema, LoginRequestSchema, SignUpRequestSchema, ValidateUserResponse } from '@reynandaptr/aha-types/dist/types';
import { z } from 'zod';

export type LoginRequestBody = z.infer<
  typeof LoginRequestSchema.shape.body
>;

export type SignUpRequestBody = z.infer<
  typeof SignUpRequestSchema.shape.body
>;

export type EmailVerificationRequestBody = z.infer<
  typeof EmailVerificationRequestSchema.shape.body
>;

export const useAuthValidateToken = (
  options?: QueryOptions,
  callback?: ReactQueryCallback<ValidateUserResponse>,
) => {
  return useCustomQuery<ValidateUserResponse>(
    ['v1', 'auth', 'validate-token'],
    {
      url: '/v1/auth/validate-token',
    },
    options,
    callback,
  );
};

export const useAuthLogout = (
  options?: QueryOptions,
  callback?: ReactQueryCallback,
) => {
  return useCustomQuery(
    ['v1', 'auth', 'logout'],
    {
      url: '/v1/auth/logout',
      method: 'POST',
    },
    options,
    callback,
  );
};

export const useAuthLogin = (
  options?: QueryOptions,
) => {
  return useCustomMutation<LoginRequestBody>(
    {
      url: '/v1/auth/login',
      method: 'POST',
    },
    options,
  );
};

export const useAuthSignUp = (
  options?: QueryOptions,
) => {
  return useCustomMutation<SignUpRequestBody>(
    {
      url: '/v1/auth/sign-up',
      method: 'POST',
    },
    options,
  );
};

export const useAuthEmailVerification = (
  options?: QueryOptions,
) => {
  return useCustomMutation<EmailVerificationRequestBody>(
    {
      url: '/v1/auth/email-verification',
      method: 'POST',
    },
    options,
  );
};

export const useAuthResendEmailVerification = (
  options?: QueryOptions,
) => {
  return useCustomMutation(
    {
      url: '/v1/auth/resend-email-verification',
      method: 'POST',
    },
    options,
  );
};
