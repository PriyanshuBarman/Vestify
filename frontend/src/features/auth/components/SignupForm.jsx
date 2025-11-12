import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
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
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useSignup } from "../hooks/useSignup";

function SignupForm() {
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const referralCode = searchParams.get("referralCode");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { mutate: signup, isPending } = useSignup();
  const { googleLogin, isLoading } = useGoogleAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ ...formData, referralCode });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="mt-4 text-xl font-medium sm:text-2xl">
              Create your account
            </h1>
            <FieldDescription>
              Already have an account?{" "}
              <Link to="/auth/login" className="font-medium sm:font-semibold">
                Login
              </Link>
            </FieldDescription>
          </div>

          <Field>
            <Button
              size="lg"
              onClick={googleLogin}
              disabled={isPending || isLoading}
              type="button"
              variant="outline"
              className="w-full rounded-full py-5.5 shadow-none sm:shadow-xs"
            >
              <GoogleIcon />
              Signup with Google
            </Button>
          </Field>

          <FieldSeparator>Or</FieldSeparator>

          <Field className="gap-2">
            <FieldLabel htmlFor="name">Name</FieldLabel>

            <InputGroup className="rounded-full px-2 py-5.5 shadow-none sm:shadow-xs">
              <InputGroupInput
                name="name"
                type="text"
                placeholder="elon musk"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <InputGroupAddon>
                <UserIcon className="size-4.5" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <InputGroup className="rounded-full px-2 py-5.5 shadow-none sm:shadow-xs">
              <InputGroupInput
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup className="rounded-full px-2 py-5.5 shadow-none sm:shadow-xs">
              <InputGroupInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="•••••••••"
                required
                value={formData.password}
                onChange={handleChange}
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
          </Field>
          <Field>
            <Button
              size="lg"
              disabled={isPending || isLoading}
              type="submit"
              className="rounded-full bg-gradient-to-r from-[#00b35c] to-[#00b35c91] py-5.5"
            >
              {(isPending || isLoading) && <Spinner />} Signup
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="text-2xs px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}

export default SignupForm;
