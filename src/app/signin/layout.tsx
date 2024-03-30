export default async function ({ children }: { children: any }) {
  return <div className={"min-h-screen flex flex-col"}>{children}</div>;
}
