import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside className="sticky top-0 h-screen w-64 bg-gray-100 text-gray-800 p-4">
      <div className="flex items-center mb-4 space-x-1">
        {/* Profile image here */}
        <h1 className="text-lg font-medium">Acme</h1>
      </div>

      <nav className="space-y-2">
        <SidebarItem label="Home" href="/" />
        <SidebarItem label="Category" href="/category" />
        <SidebarItem label="Posts" href="/posts" />
        <SidebarItem label="Author" href="/author" />
      </nav>
    </aside>
  );
};

export default Sidebar;
