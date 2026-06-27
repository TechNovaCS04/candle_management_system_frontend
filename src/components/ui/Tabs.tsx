interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 bg-wax-100 rounded-lg p-1 w-fit mb-5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-cream-50 text-bronze-900 shadow-sm"
              : "text-bronze-500 hover:text-bronze-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
