import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";

import { useSignup } from "../hooks/useSignup";
import { signupSchema } from "../schemas/authSchema";

function SignupForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const referralCode = searchParams.get("referralCode");

  const { mutate: signup, isPending } = useSignup();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    signup({ ...data, referralCode });
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="mt-4 text-[1.4rem] font-medium sm:text-3xl">
              Create your account
            </h1>
          </div>

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <InputGroup className="rounded-full px-2 py-5.5 shadow-none sm:shadow-xs">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="elon musk"
                  />
                  <InputGroupAddon>
                    <UserIcon className="size-4.5" />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <InputGroup className="rounded-full px-2 py-5.5 shadow-none sm:shadow-xs">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="m@example.com"
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <InputGroup className="rounded-full px-2 py-5.5 shadow-none sm:shadow-xs">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••"
                    type={showPassword ? "text" : "password"}
                    className="placeholder:text-muted-foreground/50"
                  />
                  <InputGroupAddon>
                    <LockIcon />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <Button
              size="lg"
              disabled={isPending}
              type="submit"
              className="rounded-full bg-gradient-to-r from-[#00b35c] via-[#00b35c91] to-[#00b35c] [background-size:200%_auto] py-5.5 hover:bg-[99%_center]"
            >
              {isPending && <Spinner />} Signup
            </Button>
          </Field>

          <FieldSeparator> Already have an account? </FieldSeparator>

          <Button
            type="button"
            size="lg"
            variant="secondary"
            disabled={isPending}
            onClick={() =>
              navigate(
                referralCode
                  ? `/auth/login?referralCode=${referralCode}`
                  : "/auth/login",
              )
            }
            className="rounded-full border py-5.5"
          >
            Login
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default SignupForm;
