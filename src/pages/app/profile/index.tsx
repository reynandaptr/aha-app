import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RootState } from '@/globalStates/_prototype';
import { setAuthData } from '@/globalStates/auth';
import { ResetPasswordRequestBody, UpdateUserProfileRequestBody, useAuthValidateToken, useResetPassword, useUpdateUserProfile } from '@/hooks/query/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordRequestSchema, UpdateUserProfileRequestSchema } from '@reynandaptr/aha-types/dist/types';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export default function Profile() {
  const dispatch = useDispatch();
  const { authData } = useSelector(
    (state: RootState) => ({
      authData: state.auth.auth,
    }),
    shallowEqual,
  );
  const {
    register: registerUpdateProfileForm,
    handleSubmit: handleSubmitUpdateProfileForm,
    formState: { isDirty: isUpdateProfileFormDirty },
  } = useForm<UpdateUserProfileRequestBody>({
    resolver: zodResolver(UpdateUserProfileRequestSchema.shape.body),
  });

  const {
    register: registerResetPasswordForm,
    handleSubmit: handleSubmitResetPasswordForm,
    formState: { isDirty: isResetPasswordFormDirty, errors: resetPasswordFormErrors },
  } = useForm<ResetPasswordRequestBody>({
    resolver: zodResolver(ResetPasswordRequestSchema.shape.body),
  });

  const { mutate: doUpdateUserProfile, isLoading: isUpdateUserProfileLoading } = useUpdateUserProfile()
  const { mutate: doResetPassword, isLoading: isResetPasswordLoading } = useResetPassword()

  const { refetch: doAuthValidateToken } = useAuthValidateToken({
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  }, {
    onSuccess(data) {
      dispatch(setAuthData(data.data.data))
    },
    onError() {
      dispatch(setAuthData(undefined));
    }
  });

  const onSubmitUpdateProfileForm: SubmitHandler<UpdateUserProfileRequestBody> = (data) => {
    doUpdateUserProfile(data, {
      onSuccess: () => {
        toast.success('Profile updated')
        doAuthValidateToken()
      },
      onError: (error) => {
        toast.error(error.response?.data.message || error.message)
      }
    })
  };

  const onSubmitResetPasswordForm: SubmitHandler<ResetPasswordRequestBody> = (data) => {
    doResetPassword(data, {
      onSuccess: () => {
        toast.success('Password reset')
      },
      onError: (error) => {
        toast.error(error.response?.data.message || error.message)
      }
    })
  }
  return (
    <>
      <div className='w-1/2 m-auto'>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">
            Manage your profile.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8">
          <div className="flex-1 lg:max-w-2xl">
            <form className="grid gap-4" onSubmit={handleSubmitUpdateProfileForm(onSubmitUpdateProfileForm)}>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" defaultValue={authData?.name || ''} {...registerUpdateProfileForm('name')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email - <span className='text-gray-500'>{authData?.provider === 'GOOGLE' ? 'Verified by Google' : 'Verified by Email Verification'}</span></Label>
                <Input id="email" type="email" defaultValue={authData?.email} disabled />
              </div>
              <Button className="w-full" type="submit" disabled={!isUpdateProfileFormDirty || isUpdateUserProfileLoading}>Save</Button>
            </form>
          </div>
        </div>
        {authData?.provider === 'USER_DEFINED_PASSWORD' && (
          <>
            <div className="space-y-0.5 mt-8">
              <h2 className="text-2xl font-bold tracking-tight">Security</h2>
              <p className="text-muted-foreground">
                Manage your security.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8">
              <div className="flex-1 lg:max-w-2xl">
                <form className="grid gap-4" onSubmit={handleSubmitResetPasswordForm(onSubmitResetPasswordForm)}>
                  <div className="grid gap-2">
                    <Label htmlFor="old_password">Old Password</Label>
                    <Input id="old_password" type="password" {...registerResetPasswordForm('old_password')} />
                    {resetPasswordFormErrors.old_password && (
                      <p className="text-xs italic text-red-500 mt-2">
                        {resetPasswordFormErrors.old_password?.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new_password">New Password</Label>
                    <Input id="new_password" type="password" {...registerResetPasswordForm('new_password')} />
                    {resetPasswordFormErrors.new_password && (
                      <p className="text-xs italic text-red-500 mt-2">
                        {resetPasswordFormErrors.new_password?.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="renew_password">Re-New Password</Label>
                    <Input id="renew_password" type="password" {...registerResetPasswordForm('renew_password')} />
                    {resetPasswordFormErrors.renew_password && (
                      <p className="text-xs italic text-red-500 mt-2">
                        {resetPasswordFormErrors.renew_password?.message}
                      </p>
                    )}
                  </div>
                  <Button className="w-full" type="submit" disabled={!isResetPasswordFormDirty || isResetPasswordLoading}>Reset Password</Button>
                </form>
              </div>
            </div>
          </>)}
      </div>
    </>
  )
}

Profile.UseClientSideLayout = true
