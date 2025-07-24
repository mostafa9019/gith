import logo from "@/assets/marjanemall-logo.png";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "@/components/ActionButton";
import { useForm } from "react-hook-form";
import { LoginFormData, LoginSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/FormInput";
import { useMutation } from "@tanstack/react-query";
import { AuthResponse, ErrorResponse } from "@/interfaces";
import { authenticateUser } from "@/services";
import { useAuthStore } from "@/stores/useAuthStore";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { authData, authenticate } = useAuthStore();
  const [error, setError] = React.useState<string>("");
  const checkIfUserIsAuthenticated = () => {
    if (authData?.accessToken) {
      navigate("/operator/dashboard", { replace: true });
    }
  };

  const authenticationMutation = useMutation<
    AuthResponse,
    ErrorResponse,
    { email: string; password: string }
  >({
    mutationFn: (payload) => {
      return authenticateUser({
        username: payload.email,
        password: payload.password,
      });
    },
    onError: (_error) => {},
    onSuccess: (data) => {
      if (data.success && data.authResult) {
        authenticate(data.authResult);
        navigate("/operator/dashboard");
      } else {
        setError(data.msg);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  });

  const handleLogin = handleSubmit(
    (data) => {
      authenticationMutation.mutate(data);
    },
    (error) => {
      console.log(error);
    }
  );

  useEffect(() => {
    checkIfUserIsAuthenticated();
  }, []);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-primary to-[#7DCBC8] flex-col">
      <div className="flex w-full min-w-md max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
        <div className="w-full gap-4 flex flex-col">
          <img src={logo} alt="Logo" className="h-10 w-auto mx-auto" />
          <div className="flex flex-col gap-2">
            <FormField
              label="Email"
              id="email"
              placeholder="Email"
              register={{ ...register("email") }}
              error={errors.email}
              className="sm:w-full"
            />
            <FormField
              label="Mot de passe"
              id="password"
              placeholder="Mot de passe"
              type="password"
              showPasswordToggle
              register={{ ...register("password") }}
              error={errors.password}
              className="sm:w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <ActionButton
              loading={authenticationMutation.isPending}
              disabled={authenticationMutation.isPending || !isValid}
              action={handleLogin}
              label="Se connecter"
            />
          </div>
          {authenticationMutation.isError && (
            <p className="text-red-500 text-sm text-center">
              {authenticationMutation.error?.error}
            </p>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
