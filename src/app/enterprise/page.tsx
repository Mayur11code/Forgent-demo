import { Metadata } from "next";
import { EnterprisePortal } from "@/components/enterprise/enterprise-portal";

export const metadata: Metadata = {
  title: "Enterprise Workflow Hub — Forgent",
  description:
    "Multi-agent DAG pipeline builder, 3-stage synthetic test flight engine, and departmental spend audit ledger.",
};

export default function EnterprisePage() {
  return <EnterprisePortal />;
}
