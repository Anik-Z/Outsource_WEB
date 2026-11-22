
import { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  Boxes,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Command,
  CreditCard,
  LayoutDashboard,
  LogOut,
  PackageSearch,
  Plug,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Zap,
  Menu,
  X,
  Plus,
  RefreshCw,
  Database,
  SearchCheck,
  Check,
  XCircle,
} from "lucide-react";

import { apiRequest, type Session } from "./lib/api";

type View =
  | "overview"
  | "products"
  | "suppliers"
  | "inventory"
  | "orders"
  | "agents"
  | "approvals"
  | "integrations"
  | "settings";

const navItems: {
  id: View;
  label: string;
  icon: typeof LayoutDashboard;
  section: string;
}[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    section: "WORKSPACE",
  },
  {
    id: "products",
    label: "Product discovery",
    icon: PackageSearch,
    section: "WORKSPACE",
  },
  {
    id: "suppliers",
    label: "Supplier intelligence",
    icon: Boxes,
    section: "WORKSPACE",
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Activity,
    section: "WORKSPACE",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    section: "OPERATIONS",
  },
  {
    id: "approvals",
    label: "Approval center",
    icon: ShieldCheck,
    section: "OPERATIONS",
  },
  {
    id: "agents",
    label: "AI agents",
    icon: Sparkles,
    section: "OPERATIONS",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Plug,
    section: "MANAGE",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    section: "MANAGE",
  },
];

//Types

type ProductRow= {
    id: string;
    title:string;
    sku?:string|null;
    brand?:string|null;
    gtin?:string|null;
    category?:string|null;
    targetPrice?:string|number|null;
    _count?:{
        matches:number;
    };
};

type SupplierRow={
    id:string;
    code:string;
    name:string;
    country?:string|null;
    status:string;
    isDemo:boolean;
    _count?:{
        offers: number;
    };
};

type MatchRow={
    id:string;
    confidence:number;
    matchType:string;
    status: "SUGGESTED"|"APPROVED"|"REJECTED";
    explanation?:string|null;

    product: {
        id:string;
        title:string;
        sku?:string|null;

    };
    supplierOffer: {
        title:string;
        pricr:string|number;
        currency:string;
        stockQty:number;
        availability:string;

        supplier: {
            name:string;
        };
    };


}