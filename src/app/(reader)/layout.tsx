export default function ReaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="tv-reader-main bg-black">{children}</div>;
}
