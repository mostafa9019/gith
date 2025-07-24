"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpFormData, OtpSchema } from "@/signup/zod";
import { formatTime } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../../components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { OtpPayload, OtpVerificationPayload } from "@/signup/interfaces";
import { ErrorResponse, ServerResponse } from "@/interfaces";
import { sendOtpCode, verifyOtpCode } from "../services";
import { useNavigate } from "react-router-dom";

interface OtpDialogProps {
  payload: OtpPayload;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function OtpDialog({ payload, open, setOpen }: OtpDialogProps) {
  const navigate = useNavigate();
  const [time, setTime] = useState(90);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string>("");
  const OtpLength = 6;
  const otpMutation = useMutation<
    ServerResponse,
    ErrorResponse,
    OtpVerificationPayload
  >({
    mutationFn: (payload) => {
      return verifyOtpCode(payload);
    },
    onError: (error) => {
      setError(error.errorDescription);
    },
    onSuccess: (response) => {
      if (response.sucess && response.statusCode === 200) {
        navigate(`/seller-signup/${payload.transactionId}`);
        setOpen(false);
      } else {
        setError(response.message || "An unknown error occurred.");
      }
    },
  });


  const signUpMutation = useMutation<ServerResponse, ErrorResponse, OtpPayload>(
    {
      mutationFn: (payload) => {
        return sendOtpCode(payload);
      },
      onSuccess: () => {
        setTime(90);
        setIsRunning(true);
        setError("");
      },
      onError: (error) => {
        setError(error.errorDescription);
      },
    }
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<OtpFormData>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      OTP: "",
    },
  });

  const handleVerifyOtp = handleSubmit((data) => {
    otpMutation.mutate({
      transactionId: payload.transactionId,
      otpCode: data.OTP,
      email: payload.email,
    });
    setValue("OTP", "");
  });

  const handleResendOtp = () => {
    signUpMutation.mutate({
      phone: payload.phone,
      email: payload.email,
      refIdSource: payload.refIdSource,
      transactionId: payload.transactionId,
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  useEffect(() => {
    if (isValid) {
      handleVerifyOtp();
    }
  }, [isValid]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="flex justify-center">
          <MessageCircleMore
            className="w-20 h-20 text-primary transition-colors duration-200 hover:text-primary/80 "
            strokeWidth={1.5}
          />
        </div>

        <div className="text-center space-y-4">
          <span className="text-md font-medium ">
            Reseigner le code reçu par Email
          </span>
          <div className="flex justify-center">
            <Controller
              name="OTP"
              control={control}
              render={({ field }) => (
                <InputOTP
                  autoFocus
                  maxLength={OtpLength}
                  className="gap-2"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                >
                  <div className="flex space-x-6">
                    {[...Array(OtpLength)].map((_, index) => (
                      <InputOTPGroup>
                        <InputOTPSlot index={index} />
                      </InputOTPGroup>
                    ))}
                  </div>
                </InputOTP>
              )}
            />
          </div>
          {time !== 0 && (
            <div className="text-center flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-600">
                Renvoyer le code par Email dans:{" "}
              </span>
              <span className="font-semibold text-sm">{formatTime(time)}</span>
            </div>
          )}
          <div className="space-y-4 flex flex-col">
            {time === 0 && (
              <span
                className="text-sm text-gray-600 hover:text-primary transition-colors duration-200 hover:underline hover:cursor-pointer text-center"
                onClick={handleResendOtp}
              >
                Renvoyer le code par Email
              </span>
            )}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
