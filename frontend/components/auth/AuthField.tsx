import { authInputClassName, authLabelClassName } from "@/components/auth/AuthShell"

type AuthFieldProps = {
  id: string
  label: string
  name: string
  type: "email" | "password" | "text"
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  required?: boolean
  invalid?: boolean
  errorDescribedBy?: string
}

export default function AuthField({
  id,
  label,
  name,
  type,
  value,
  onChange,
  autoComplete,
  required = false,
  invalid = false,
  errorDescribedBy,
}: AuthFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={authLabelClassName}>
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        aria-describedby={errorDescribedBy}
        className={authInputClassName}
      />
    </div>
  )
}
