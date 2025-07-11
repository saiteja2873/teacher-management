import Sidebar from './sideBar'

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
