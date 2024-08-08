export const MainTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-nowrap py-2 text-xl font-semibold leading-6 tracking-wider">
      {children}
    </h2>
  )
}
export const MainDescription = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <p className="py-1 text-sm leading-5 tracking-wide">{children}</p>
}
