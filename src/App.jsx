import { Analytics } from "@vercel/analytics/react"
import BristolTransportDashboard from "./bristol-transport-dashboard.jsx"

export default function App() {
  return (
    <>
      <BristolTransportDashboard />
      <Analytics />
    </>
  )
}