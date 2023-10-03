import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RootState } from '@/globalStates/_prototype';
import { setAuthData } from '@/globalStates/auth';
import { UpdateUserProfileRequestBody, useAuthValidateToken, useUpdateUserProfile } from '@/hooks/query/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserProfileRequestSchema } from '@reynandaptr/aha-types/dist/types';
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
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<UpdateUserProfileRequestBody>({
    resolver: zodResolver(UpdateUserProfileRequestSchema.shape.body),
  });

  const { mutate: doUpdateUserProfile, isLoading: isUpdateUserProfileLoading } = useUpdateUserProfile()

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

  const onSubmit: SubmitHandler<UpdateUserProfileRequestBody> = (data) => {
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
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" defaultValue={authData?.name || ''} {...register('name')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email - <span className='text-gray-500'>{authData?.provider === 'GOOGLE' ? 'Verified by Google' : 'Verified by Email Verification'}</span></Label>
                <Input id="email" type="email" defaultValue={authData?.email} disabled />
              </div>
              <Button className="w-full" type="submit" disabled={!isDirty || isUpdateUserProfileLoading}>Save</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

Profile.UseClientSideLayout = true
