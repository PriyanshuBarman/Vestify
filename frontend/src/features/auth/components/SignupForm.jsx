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
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useSignup } from "../hooks/useSignup";

function SignupForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const referralCode = searchParams.get("referralCode");
  const { mutate: signup, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.info("Password must be at least 6 characters long");
      return;
    }
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
            <h1 className="mt-4 text-[1.4rem] font-medium sm:text-3xl">
              Create your account
            </h1>
          </div>

          <Field className="gap-2">
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <InputGroup className="rounded-full px-2 py-5.5 shadow-none sm:shadow-xs">
              <InputGroupInput
                name="name"
                type="text"
                placeholder="elon musk"
                required
                maxLength={20}
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
                maxLength={50}
                value={formData.email}
                onChange={handleChange}
              />
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field
            data-invalid={
              formData.password.length > 0 && formData.password.length < 6
            }
            className="gap-2"
          >
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup className="rounded-full px-2 py-5.5 shadow-none sm:shadow-xs">
              <InputGroupInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                required
                minLength={6}
                maxLength={20}
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
            {formData.password.length > 0 && formData.password.length < 6 && (
              <FieldError>
                Password must be at least 6 characters long
              </FieldError>
            )}
          </Field>

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
