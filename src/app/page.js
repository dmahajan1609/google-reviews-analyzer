"use client"

import { useState } from "react"
import axios from "axios"
import AddressInput from "@/components/AddressInput"
import BusinessItem from "@/components/BusinessItem"
import AnalyseBusinessReview from "@/components/AnalyseBusinessReview"

export default function Home() {
  const [address, setAddress] = useState(null)
  const [restaurantName, setRestaurantName] = useState("")
  const [loading, setLoading] = useState(false)
  const [businesses, setBusinesses] = useState([])
  const [analyseBusiness, setAnalyseBusiness] = useState(null)

  const getBusinesses = async () => {
    if (!address || !restaurantName) return
    const ll = `@${address.lat},${address.lon},12z`

    setLoading(true)
    try {
      const { data } = await axios
        .get(`/businesses?q=${restaurantName}&ll=${ll}`)

      if (data.place_results) {
        setBusinesses([data.place_results])
      } else {
        setBusinesses(data.local_results)
      }
    } catch {
      //
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="rounded-full shadow-lg table mx-auto px-4 py-1 mt-2">
        <h1 className="text-xs">Be the Top Investor Center</h1>
      </div>

      <div className="mt-8 px-4">
        <div className="flex items-center gap-2">
          <AddressInput onChange={(value) => setAddress(value)} />
          <input type="text" className="flex-1 rounded shadow text-base py-2 px-3 w-full" placeholder="Business Name" onInput={(e) => setRestaurantName(e.target.value)} value={restaurantName} />
          <button onClick={getBusinesses} disabled={loading} className="rounded shadow bg-blue-600 text-white p-2">{loading ? "Loading..." : "Search"}</button>
        </div>

        <div className="flex flex-col gap-4 py-8">
          {businesses.map(b => <BusinessItem key={b.place_id} onSeekingAnalyse={() => setAnalyseBusiness(b)} {...b} />)}
        </div>
      </div>

      <AnalyseBusinessReview 
        title={analyseBusiness?.title} 
        dataId={analyseBusiness?.data_id} 
        onDismiss={() => setAnalyseBusiness(null)} 
      />
    </main>
  )
}
