import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '八方转运｜日中跨境集运',
  description: '专业、安全、便捷的日中跨境包裹集运服务。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
