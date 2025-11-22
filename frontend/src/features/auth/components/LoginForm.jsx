import { Button } from "@/components/ui/button";
import {
  Field,
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
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: login, isPending } = useLogin();

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
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="mb-4 text-[1.4rem] font-medium sm:text-3xl">
              Login to your account
            </h1>
          </div>

          <Field>
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

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup className="rounded-full px-2 py-5.5 shadow-none sm:shadow-xs">
              <InputGroupInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                required
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
          </Field>

          <Field>
            <Button
              size="lg"
              disabled={isPending}
              type="submit"
              className="rounded-full bg-gradient-to-r from-[#00b35c] via-[#00b35c91] to-[#00b35c] [background-size:200%_auto] py-5.5 hover:bg-[99%_center]"
            >
              {isPending && <Spinner />} Login
            </Button>
          </Field>

          <FieldSeparator>Don't have an account?</FieldSeparator>

          <Button
            type="button"
            size="lg"
            variant="secondary"
            disabled={isPending}
            onClick={() => navigate("/auth/signup")}
            className="rounded-full border py-5.5"
          >
            Signup
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default LoginForm;
