import { TestDashboard } from "@/components/education/test-dashboard";
import { availableTests } from "@/lib/dashboard-data";
export default function TestPage() {
    return <TestDashboard tests={availableTests}/>;
}
