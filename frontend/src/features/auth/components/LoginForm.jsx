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
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: login, isPending } = useLogin();
  const { googleLogin, isLoading } = useGoogleAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="mt-4 text-xl font-medium sm:text-2xl">
              Login to your account
            </h1>
            <FieldDescription>
              Don&apos;t have an account?{" "}
              <Link to="/auth/signup" className="font-medium sm:font-semibold">
                Sign up
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
              Login with Google
            </Button>
          </Field>

          <FieldSeparator>Or</FieldSeparator>

          <Field>
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
          <Field>
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
              {(isPending || isLoading) && <Spinner />} Login
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

export default LoginForm;
