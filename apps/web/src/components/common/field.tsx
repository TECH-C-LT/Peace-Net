export const Field = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full flex-col gap-2">{children}</div>
}

export const FieldError = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-sm text-red-600">{children}</div>
}
