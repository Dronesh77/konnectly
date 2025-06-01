import { Badge } from "@/components/ui/badge";

const shopAds = [
  {
    name: "Sweet Crumbs Bakery",
    description: "Fresh Bread & Pastries Daily!",
    location: "Main Street",
    verified: true,
  },
  {
    name: "Rajesh Electricians",
    description: "Quick, reliable electrical service for your home or business.",
    location: "Sector 12",
    verified: true,
  },
  {
    name: "Meena's Tailors",
    description: "Custom tailoring & alterations. Fast, affordable, trusted.",
    location: "Bazaar Road",
    verified: true,
  },
  {
    name: "TechFix Mobile Repairs",
    description: "Broken Phone? Authentic parts, expert service.",
    location: "Market Square",
    verified: true,
  },
  {
    name: "GreenMart Grocery",
    description: "Daily essentials at discounted prices!",
    location: "Green Park",
    verified: true,
  },
];

export default function ShopsPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Shops Listed on Konnectly</h1>
      <div className="grid gap-6">
        {shopAds.map((ad, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 border flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg text-gray-800">{ad.name}</span>
              {ad.verified && <Badge variant="secondary">Verified</Badge>}
            </div>
            <span className="text-gray-600 text-sm">{ad.description}</span>
            <span className="text-xs text-gray-500">{ad.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 