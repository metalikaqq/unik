"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";
import { CFP_TRACKS, cfpSchema, type CfpValues } from "@/lib/cfp-schema";
import { submitCfpMock } from "@/lib/cfp-submit";

type SubmitState = "idle" | "submitting" | "success" | "error";

const TRACK_VALUES = ["", ...CFP_TRACKS] as const;

export function CfpForm() {
  const t = useTranslations("home.cfp");

  const nameId = useId();
  const emailId = useId();
  const titleId = useId();
  const abstractId = useId();
  const trackId = useId();
  const errorBannerId = useId();

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const successHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CfpValues>({
    resolver: zodResolver(cfpSchema),
    mode: "onBlur",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      email: "",
      title: "",
      abstract: "",
      // Field is required, but the empty default ensures the placeholder
      // option renders first. The zod schema rejects "" with errors.track.required.
      track: "" as unknown as CfpValues["track"],
    },
  });

  useEffect(() => {
    if (submitState === "success") {
      successHeadingRef.current?.focus();
    }
  }, [submitState]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState("submitting");
    const result = await submitCfpMock(values);
    setSubmitState(result.ok ? "success" : "error");
  });

  const handleAnother = () => {
    reset();
    setSubmitState("idle");
    // After the form re-mounts, drop focus into the first input
    // so a keyboard user can immediately keep submitting.
    requestAnimationFrame(() => {
      const first = formRef.current?.querySelector<HTMLInputElement>("input, select, textarea");
      first?.focus();
    });
  };

  if (submitState === "success") {
    return (
      <div className="flex flex-col gap-[var(--space-6)]">
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="font-display text-2xl uppercase tracking-tight outline-none"
        >
          {t("success.title")}
        </h3>
        <p className="max-w-2xl text-base leading-relaxed text-fg/85">{t("success.body")}</p>
        <div>
          <Button type="button" variant="secondary" onClick={handleAnother}>
            {t("success.another")}
          </Button>
        </div>
      </div>
    );
  }

  const errorBannerVisible = submitState === "error";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby={errorBannerVisible ? errorBannerId : undefined}
      className="flex flex-col gap-[var(--space-6)]"
    >
      {errorBannerVisible && (
        <p
          id={errorBannerId}
          role="alert"
          className="border-l-2 border-accent bg-accent/10 px-4 py-3 font-mono text-sm text-fg"
        >
          {t("error.banner")}
        </p>
      )}

      <Field
        id={nameId}
        label={t("fields.name.label")}
        placeholder={t("fields.name.placeholder")}
        error={errors.name?.message}
        translateError={t}
        required
        register={register("name")}
      />

      <Field
        id={emailId}
        type="email"
        label={t("fields.email.label")}
        placeholder={t("fields.email.placeholder")}
        autoComplete="email"
        error={errors.email?.message}
        translateError={t}
        required
        register={register("email")}
      />

      <Field
        id={titleId}
        label={t("fields.title.label")}
        placeholder={t("fields.title.placeholder")}
        error={errors.title?.message}
        translateError={t}
        required
        register={register("title")}
      />

      <TextAreaField
        id={abstractId}
        label={t("fields.abstract.label")}
        placeholder={t("fields.abstract.placeholder")}
        error={errors.abstract?.message}
        translateError={t}
        required
        register={register("abstract")}
      />

      <SelectField
        id={trackId}
        label={t("fields.track.label")}
        placeholder={t("fields.track.placeholder")}
        error={errors.track?.message}
        translateError={t}
        required
        register={register("track")}
        options={TRACK_VALUES.filter((v): v is (typeof CFP_TRACKS)[number] => v !== "").map(
          (value) => ({
            value,
            label: t(`fields.track.options.${value}`),
          })
        )}
      />

      <Rule className="my-[var(--space-2)]" />

      <div>
        <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
      </div>
    </form>
  );
}

const INPUT_CLASS =
  "w-full border border-fg/20 bg-bg px-3 py-2 font-mono text-sm text-fg placeholder:text-muted focus:border-fg focus:outline-solid focus:outline-2 focus:outline-offset-2 focus:outline-accent";

const ERROR_CLASS = "font-mono text-xs text-accent";

type Translate = (key: string) => string;

type FieldRegisterReturn = ReturnType<ReturnType<typeof useForm<CfpValues>>["register"]>;

type FieldBaseProps = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  translateError: Translate;
  register: FieldRegisterReturn;
};

type FieldProps = FieldBaseProps & {
  type?: "text" | "email";
  autoComplete?: string;
};

function Field({
  id,
  label,
  placeholder,
  required,
  error,
  translateError,
  register,
  type = "text",
  autoComplete,
}: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={INPUT_CLASS}
        {...register}
      />
      {error && (
        <p id={errorId} className={ERROR_CLASS}>
          {translateError(error)}
        </p>
      )}
    </div>
  );
}

type TextAreaFieldProps = FieldBaseProps;

function TextAreaField({
  id,
  label,
  placeholder,
  required,
  error,
  translateError,
  register,
}: TextAreaFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        rows={6}
        placeholder={placeholder}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${INPUT_CLASS} resize-y`}
        {...register}
      />
      {error && (
        <p id={errorId} className={ERROR_CLASS}>
          {translateError(error)}
        </p>
      )}
    </div>
  );
}

type SelectFieldProps = FieldBaseProps & {
  options: Array<{ value: string; label: string }>;
};

function SelectField({
  id,
  label,
  placeholder,
  required,
  error,
  translateError,
  register,
  options,
}: SelectFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <select
        id={id}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={INPUT_CLASS}
        defaultValue=""
        {...register}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className={ERROR_CLASS}>
          {translateError(error)}
        </p>
      )}
    </div>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-xs uppercase tracking-wider text-fg/85"
    >
      {children}
      {required && (
        <span className="ml-1 text-accent" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
