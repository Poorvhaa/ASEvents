'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/src/hooks/useTranslation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSchema, nameField } from '@/lib/validations/schemas'
import { ErrorMessage } from '@/components/ui/error-message'
import { z } from 'zod'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [apiError, setApiError] = useState<string | null>(null)

  const isSignUp = mode === 'sign-up'

  // Dynamically require name only during sign-up
  const formSchema = useMemo(() => {
    return isSignUp
      ? authSchema.extend({ name: nameField })
      : authSchema
  }, [isSignUp])

  type AuthFormValues = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: AuthFormValues) => {
    setApiError(null)

    const { error } = isSignUp
      ? await authClient.signUp.email({ email: data.email, password: data.password, name: data.name || '' })
      : await authClient.signIn.email({ email: data.email, password: data.password })

    if (error) {
      setApiError(error.message ?? t('auth.errorFallback'))
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <main className="min-h-svh bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-sm p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {isSignUp ? t('auth.titleSignUp') : t('auth.titleSignIn')}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isSignUp ? t('auth.descSignUp') : t('auth.descSignIn')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          {isSignUp && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">{t('auth.name')}</Label>
              <Input
                id="name"
                {...register('name')}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
              <ErrorMessage id="name-error" message={errors.name?.message} />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
            />
            <ErrorMessage id="email-error" message={errors.email?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
            <ErrorMessage id="password-error" message={errors.password?.message} />
          </div>

          {apiError && (
            <p className="text-sm text-destructive font-medium" role="alert">
              {apiError}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t('auth.submitting')}
              </>
            ) : (
              isSignUp ? t('auth.createAccount') : t('auth.signIn')
            )}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          {isSignUp ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}{' '}
          <Link
            href={isSignUp ? '/sign-in' : '/sign-up'}
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            {isSignUp ? t('auth.signInLink') : t('auth.signUpLink')}
          </Link>
        </p>
      </Card>
    </main>
  )
}
